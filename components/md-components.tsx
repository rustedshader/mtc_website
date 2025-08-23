import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";

export const CustomMdComponents = {
  // Headings
  h1: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <h1
      className={cn(
        "scroll-m-20 text-2xl md:text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 md:mb-8 mt-2",
        className
      )}
    >
      {children}
      <Separator className="mt-2 md:mt-4" />
    </h1>
  ),

  h2: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <h2
      className={cn(
        "scroll-m-20 text-xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0 mt-8 md:mt-12 mb-4 md:mb-6",
        className
      )}
    >
      {children}
    </h2>
  ),

  h3: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <h3
      className={cn(
        "scroll-m-20 text-lg md:text-2xl font-semibold tracking-tight mt-6 md:mt-8 mb-3 md:mb-4",
        className
      )}
    >
      {children}
    </h3>
  ),

  // Paragraphs and text
  p: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={cn(
        "leading-7 text-base md:text-lg [&:not(:first-child)]:mt-4 md:[&:not(:first-child)]:mt-6 text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  ),

  // Lists
  ul: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <ul
      className={cn(
        "my-4 md:my-6 ml-4 md:ml-6 list-disc space-y-1.5 md:space-y-2",
        className
      )}
    >
      {children}
    </ul>
  ),

  ol: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <ol
      className={cn(
        "my-4 md:my-6 ml-4 md:ml-6 list-decimal space-y-1.5 md:space-y-2",
        className
      )}
    >
      {children}
    </ol>
  ),

  li: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <li
      className={cn(
        "text-base md:text-lg text-muted-foreground leading-7",
        className
      )}
    >
      {children}
    </li>
  ),

  // Links - kept same as they work well on mobile
  a: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href?: string;
    className?: string;
  }) => (
    <a
      href={href}
      className={cn(
        "font-medium underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-all",
        className
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),

  // Images
  img: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt?: string;
    className?: string;
  }) => (
    <div className="my-4 md:my-8 flex justify-center items-center">
      <Image
        src={`/${src}`}
        alt={alt || ""}
        width={500}
        height={500}
        className={cn("object-cover rounded-md", className)}
        priority
      />
    </div>
  ),

  // Blockquotes
  blockquote: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <blockquote
      className={cn(
        "mt-4 md:mt-6 border-l-4 border-primary pl-4 md:pl-6 italic text-muted-foreground text-sm md:text-base",
        className
      )}
    >
      {children}
    </blockquote>
  ),

  // Code blocks
  pre: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <ScrollArea className="my-4 md:my-6 w-full">
      <pre
        className={cn(
          "rounded-lg bg-muted p-3 md:p-4 overflow-x-auto text-sm md:text-base",
          className
        )}
      >
        {children}
      </pre>
    </ScrollArea>
  ),

  code: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs md:text-sm",
        className
      )}
    >
      {children}
    </code>
  ),

  // Horizontal rule
  hr: ({ className }: { className?: string }) => (
    <Separator className={cn("my-6 md:my-8", className)} />
  ),
};
