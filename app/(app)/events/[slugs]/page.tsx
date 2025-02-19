import { MDXRemote } from "next-mdx-remote/rsc";
import Particles from "@/components/ui/particles";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { serializeMdFileContent } from "@/lib/fileUtils";
import { CustomMdComponents } from "@/components/md-components";

export type paramsType = Promise<{ slugs: string }>;

export default async function Events(props: { params: paramsType }) {
  const { slugs } = await props.params;
  try {
    const mdData = await serializeMdFileContent(slugs, "events");
    return (
      <>
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
                <div className="text-right">{mdData.frontMatter.date}</div>
                <MDXRemote
                  source={mdData.mdContent}
                  components={CustomMdComponents}
                />
              </div>
            </TracingBeam>
          </div>
        </section>
      </>
    );
  } catch (error: any) {
    return (
      <>
        <div>Oops We Got Error</div>
        <div>{error.message}</div>
      </>
    );
  }
}
