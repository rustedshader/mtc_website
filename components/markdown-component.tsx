// components/markdown-component.tsx
"use client"; // Client Component

import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { createPost, updatePost } from "@/lib/frontendApiFunctions";

interface MarkdownComponentProps {
  initialTitle?: string;
  initialContent?: string;
  initialDescription?: string;
  initialImage?: string;
  initialDate?: string;
  initialLocation?: string;
  initialType?: string;
  postId?: number;
  submitLabel?: string;
  mode?: "create" | "edit";
}

export default function MarkdownComponent({
  initialTitle = "",
  initialContent = "",
  initialDescription = "",
  initialImage = "",
  initialDate = "",
  initialLocation = "",
  initialType = "event",
  postId,
  submitLabel = "Create Post",
  mode = "create",
}: MarkdownComponentProps) {
  const router = useRouter();
  const [value, setValue] = useState<string>(initialContent);
  const [title, setTitle] = useState<string>(initialTitle);
  const [description, setDescription] = useState<string>(initialDescription);
  const [image, setImage] = useState<string>(initialImage);
  const [date, setDate] = useState<string>(initialDate);
  const [location, setLocation] = useState<string>(initialLocation);
  const [type, setType] = useState<string>(initialType);
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

      // Format the date to ISO string if it exists
      const formattedDate = date ? new Date(date).toISOString() : null;

      const postData = {
        title: title.trim(),
        content: value,
        description,
        image,
        date: formattedDate,
        location,
        type,
      };

      if (mode === "edit" && postId) {
        await updatePost(postId, postData);
        setMessage({ type: "success", text: "Post updated successfully!" });
      } else {
        await createPost(postData);
        setMessage({ type: "success", text: "Post created successfully!" });
      }

      // Redirect after successful submission
      router.push("/admin/dashboard/all-posts");
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to save post",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <FileText className="h-5 w-5" /> Markdown Post Editor
          </CardTitle>
          <CardDescription>
            Create and edit your posts with rich markdown formatting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a brief description of your post"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-medium">
              Image URL
            </Label>
            <Input
              type="text"
              id="image"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter the URL of your post image"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium">
              Event Date
            </Label>
            <Input
              type="datetime-local"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location
            </Label>
            <Input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter the event location"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium">
              Type
            </Label>
            <Input
              type="text"
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Enter post type (event/blog)"
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
                <MDEditor.Markdown
                  source={value}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end gap-4 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/dashboard/all-posts")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : submitLabel}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
