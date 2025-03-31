"use client";
// app/create-post/page.tsx
// Server Component (no "use client")

import MarkdownComponent from "@/components/markdown-component";

export default function CreatePostForm() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <MarkdownComponent mode="create" submitLabel="Create Post" />
    </div>
  );
}
