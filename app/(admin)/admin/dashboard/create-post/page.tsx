"use client";
import { useState } from "react";
import MarkdownComponent from "@/components/markdown-component";

// TODO Implement Toastify for better notifications and error handling

export default function CreatePost() {
  const [status, setStatus] = useState<{
    success?: string;
    error?: string;
  } | null>(null);

  const handleCreatePost = async (title: string, content: string) => {
    try {
      const url = `/api/posts/create?title=${encodeURIComponent(title)}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mdContent: content }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create post (${response.status})`);
      }

      const data = await response.json();
      setStatus({ success: "Post created successfully!" });

      return data;
    } catch (error) {
      console.error("API call error:", error);
      setStatus({ error: (error as Error).message });
      throw error;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

      {status && (
        <div
          className={`mb-6 p-4 rounded-md ${
            status.error
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {status.error || status.success}
        </div>
      )}

      <MarkdownComponent onSubmit={handleCreatePost} />
    </div>
  );
}
