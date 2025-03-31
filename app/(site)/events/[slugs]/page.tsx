import Particles from "@/components/ui/particles";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { CustomMdComponents } from "@/components/md-components";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type paramsType = Promise<{ slugs: string }>;

export default async function Events(props: { params: paramsType }) {
  try {
    const { slugs } = await props.params;
    const postId = parseInt(slugs);

    if (isNaN(postId)) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Invalid post ID</AlertDescription>
          </Alert>
        </div>
      );
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
        published: true,
      },
    });

    if (!post) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Post not found</AlertDescription>
          </Alert>
        </div>
      );
    }

    if (!post.content) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Post content is empty</AlertDescription>
          </Alert>
        </div>
      );
    }

    return (
      <section className="min-h-screen w-full relative">
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color={"#ffffff"}
          refresh
        />
        <div className="max-w-[850px] mx-auto px-4 py-8 relative z-10">
          <TracingBeam className="px-6">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <MDXRemote
                source={post.content}
                components={CustomMdComponents}
              />
            </div>
          </TracingBeam>
        </div>
      </section>
    );
  } catch (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : "Failed to load post"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }
}
