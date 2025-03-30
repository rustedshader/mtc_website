// components/markdown-component.tsx
"use client"; // Client Component

import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AlertCircle, CheckCircle, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface MarkdownComponentProps {
  initialTitle?: string;
  initialContent?: string;
  submitLabel?: string;
  onSubmit?: (data: { title: string; content: string }) => Promise<void>;
}

export default function MarkdownComponent({
  initialTitle = "",
  initialContent = "",
  submitLabel = "Create Post",
  onSubmit,
}: MarkdownComponentProps) {
  const [value, setValue] = useState<string>(initialContent);
  const [title, setTitle] = useState<string>(initialTitle);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<string>("edit");

  const handleEditorChange = (val?: string) => {
    if (val !== undefined) setValue(val);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      if (!title.trim()) {
        throw new Error("Please enter a title for your post");
      }
      if (!value.trim()) {
        throw new Error("Post content cannot be empty");
      }

      if (onSubmit) {
        await onSubmit({ title: title.trim(), content: value });
        setMessage({ type: "success", text: "Post created successfully!" });
      } else {
        // Default API submission
        const response = await fetch("/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            content: value,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to create post");
        }

        setMessage({ type: "success", text: "Post created successfully!" });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to create post",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <FileText className="h-5 w-5" /> Markdown Post Editor
        </CardTitle>
        <CardDescription>
          Create and edit your posts with rich markdown formatting
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Post Title
            </Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter an engaging title for your post"
              className="w-full"
              required
              maxLength={255}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Post Content</Label>
            <Tabs
              defaultValue="edit"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mb-2">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="border rounded-md">
                <MDEditor
                  value={value}
                  onChange={handleEditorChange}
                  height={400}
                  preview="edit"
                  hideToolbar={false}
                />
              </TabsContent>
              <TabsContent
                value="preview"
                className="border rounded-md p-4 min-h-64 prose max-w-none dark:prose-invert"
              >
                <MDEditor.Markdown
                  source={value}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </TabsContent>
            </Tabs>
          </div>

          {message && (
            <Alert
              variant={message.type === "error" ? "destructive" : "default"}
            >
              {message.type === "error" ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {message.type === "error" ? "Error" : "Success"}
              </AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Saving..." : submitLabel}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
