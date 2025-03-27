// "use client";
// app/create-post/page.tsx
// Server Component (no "use client")

import MarkdownComponent from "@/components/markdown-component";
import { createPost } from "@/lib/frontendApiFunctions";
import { redirect } from "next/navigation";

export default function CreatePostForm() {
  // Server Action for form submission
  async function handleFormSubmit(formData: FormData) {
    "use server"; // Marks this as a server action

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title?.trim() || !content?.trim()) {
      throw new Error("Title and content are required");
    }

    try {
      const result = await createPost(title, content);
      console.log("Post created:", result);
      redirect("/posts"); // Redirect on success (adjust path)
    } catch (error) {
      throw new Error(`Failed to create post: ${(error as Error).message}`);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form action={handleFormSubmit}>
        {/* Pass no onSubmit prop, rely on form action */}
        <MarkdownComponent />
      </form>
    </div>
  );
}
