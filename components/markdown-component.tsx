"use client";

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
import { AlertCircle, CheckCircle, FileText, Eye } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface MarkdownComponentProps {
  onSubmit: (title: string, content: string) => Promise<void>;
  initialTitle?: string;
  initialContent?: string;
  submitLabel?: string;
}

export default function MarkdownComponent({
  onSubmit,
  initialTitle = "",
  initialContent = "",
  submitLabel = "Create Post",
}: MarkdownComponentProps) {
  const [value, setValue] = useState<string>(initialContent);
  const [title, setTitle] = useState<string>(initialTitle);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("edit");

  const handleEditorChange = (val?: string) => {
    if (val !== undefined) setValue(val);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setMessage("Please enter a title for your post");
      return;
    }
    if (!value.trim()) {
      setMessage("Post content cannot be empty");
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");
      // Pass the data to the parent component
      await onSubmit(title, value);
      // On success
      setMessage("Post saved successfully!");

      // Reset form if it's a new post (no initial values)
      if (!initialTitle && !initialContent) {
        setTitle("");
        setValue("");
      }
    } catch (error) {
      setMessage(`Error: ${(error as Error).message || "Failed to save post"}`);
      console.error("Submit error:", error);
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
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Post Title
          </Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter an engaging title for your post"
            className="w-full"
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
              <div className="preview-container">
                <MDEditor.Markdown
                  source={value}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {message && (
          <Alert
            variant={message.includes("Error") ? "destructive" : "default"}
          >
            {message.includes("Error") ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {message.includes("Error") ? "Error" : "Success"}
            </AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
