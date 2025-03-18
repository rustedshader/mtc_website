import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Eye, Globe, FileEdit } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "@/lib/frontendApiFunctions";

export default async function ListAllPosts() {
  const postsJson = await getAllPosts();

  async function publishPost(id: string) {
    "use server";
    // Implementation will depend on your API
    await fetch(`http://localhost:3000/api/posts/publish/${id}`, {
      method: "POST",
    });
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Posts</h1>
        <Button asChild>
          <Link href="/admin/dashboard/create-post">New Post</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsJson.map((post) => (
          <Card key={post.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <Badge variant={post.is_published ? "default" : "outline"}>
                  {post.is_published ? "Published" : "Draft"}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {post.content.substring(0, 100)}
                {post.content.length > 100 ? "..." : ""}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between mt-auto pt-4 border-t">
              {!post.is_published ? (
                <form action={publishPost.bind(null, post.id)}>
                  <Button variant="default" size="sm" type="submit">
                    <Globe className="w-4 h-4 mr-2" /> Publish
                  </Button>
                </form>
              ) : (
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/posts/${post.id}`}>
                    <Eye className="w-4 h-4 mr-2" /> View
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {postsJson.length === 0 && (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">
            No posts found. Create your first post!
          </p>
        </Card>
      )}
    </div>
  );
}
