"use client"; // Mark this as a Client Component

import { useState } from "react";
import MarkdownComponent from "@/components/markdown-component";

const CreatePostForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreatePost = async (title: string, content: string) => {
    setLoading(true);
    setError(null);
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
      // Optionally, redirect or show success message here
      return data;
    } catch (error) {
      console.error("API call error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <MarkdownComponent onSubmit={handleCreatePost} />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default CreatePostForm;
