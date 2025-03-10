"use client";
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";

interface MarkdownComponentProps {
  onSubmit: (title: string, content: string) => Promise<void>;
}

export default function MarkdownComponent({
  onSubmit,
}: MarkdownComponentProps) {
  const [value, setValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

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
      setMessage("Post created successfully!");
      // Reset form
      setTitle("");
      setValue("");
    } catch (error) {
      setMessage(
        `Error: ${(error as Error).message || "Failed to create post"}`
      );
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto p-4">
      <div className="space-y-2">
        <label htmlFor="title" className="block font-medium">
          Post Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter post title"
        />
      </div>
      <div className="space-y-2">
        <label className="block font-medium">Post Content</label>
        <MDEditor value={value} onChange={handleEditorChange} />
      </div>
      <div className="my-4 p-4 border rounded-md">
        <div className="font-medium mb-2">Preview</div>
        <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
      </div>
      {message && (
        <div
          className={`p-3 rounded-md ${
            message.includes("Error")
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {message}
        </div>
      )}
      <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating Post..." : "Create Post"}
      </Button>
    </div>
  );
}
