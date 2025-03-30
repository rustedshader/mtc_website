"use client";
// app/create-post/page.tsx
// Server Component (no "use client")

import MarkdownComponent from "@/components/markdown-component";
import { createPost } from "@/lib/frontendApiFunctions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePostForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { title: string; content: string }) => {
    try {
      setError(null);
      const result = await createPost(data.title, data.content);
      console.log("Post created:", result);
      router.push("/admin/dashboard/all-posts"); // Updated redirect path
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create post"
      );
      throw error; // Re-throw to let the component handle the error state
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <MarkdownComponent submitLabel="Create Post" onSubmit={handleSubmit} />
    </div>
  );
}
