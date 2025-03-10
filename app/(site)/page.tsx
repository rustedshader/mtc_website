import { MagicCard } from "@/components/ui/magic-card";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import SparklesText from "@/components/ui/sparkles-text";
import { BorderBeam } from "@/components/ui/border-beam";
import EventsCarousel from "@/components/events-card";
import { getAllSerializedMdFilesInDir } from "@/lib/fileUtils";
import Link from "next/link";
import About from "@/components/about-section";

//TODO What makes MTC Apart
//TODO Add Achievments
// TODO Add Awards
// TODO Add Testimonials
// TODO Add Members
// TODO What set us apart from others
// TODO Add Blogs
// TODO Koi Unique Initiative
// TODO Improve Landing Page

export default async function Home() {
  const events_dir: string = "events"; //TODO Add it to config
  const blogs: BlogPost[] = await getAllSerializedMdFilesInDir(events_dir);

  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center overflow-hidden"
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="relative z-10 text-center">
          <div className="relative w-full h-full">
            <div className="absolute z-10 w-full h-full flex items-center justify-center">
              <div className="flex flex-col text-white font-bold text-4xl sm:text-6xl lg:text-8xl px-4 sm:px-0">
                <div className="mr-[10px]">
                  <span className="text-5xl sm:text-7xl lg:text-9xl">M</span>
                  icrosoft
                </div>
                <div className="ml-[20px]">
                  <span className="text-5xl sm:text-7xl lg:text-9xl">T</span>
                  echnical
                </div>
                <div className="ml-[20px]">
                  <span className="text-5xl sm:text-7xl lg:text-9xl pl-[75px]">
                    C
                  </span>
                  ommunity
                </div>
              </div>
            </div>
          </div>
        </div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source
            src={`${process.env.NEXT_PUBLIC_SUPABASE_DB_URL}/assests/hero_background_video.mp4`}
            type="video/mp4"
          />
        </video>
      </section>

      {/* About Section */}
      <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center px-4 py-12 sm:py-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <section className="container relative z-20 w-full max-w-7xl mx-auto">
          <div className="mx-auto gap-8 flex max-w-[58rem] flex-col space-y-4">
            <About />
          </div>
        </section>
      </div>

      {/* Events Section */}
      <div className="min-h-screen w-full bg-black bg-grid-white/[0.2] relative flex items-center justify-center px-4 py-12 sm:py-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <section className="container relative z-20 w-full max-w-7xl mx-auto">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-8 text-center">
            <SparklesText
              className="text-3xl sm:text-4xl lg:text-5xl text-center"
              text="Past Events"
            />
            {blogs && <EventsCarousel blogs={blogs} />}
          </div>
        </section>
      </div>

      {/* Sponsors Section */}
      <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center px-4 py-12 sm:py-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <section className="container relative z-20 w-full max-w-7xl mx-auto py-8 sm:py-16">
          <div className="mx-auto flex max-w-[72rem] flex-col items-center space-y-12">
            <SparklesText
              className="text-3xl sm:text-4xl lg:text-5xl text-center"
              text="Our Sponsors"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
              {siteConfig.sponsers.map((sponsor, index) => (
                <Link href={sponsor.link} key={`${index}_link`} target="_blank">
                  <MagicCard className="w-full opacity-95 transform transition-transform hover:scale-105 h-full">
                    <div className="p-4 sm:p-6 text-center flex flex-col items-center gap-4">
                      {sponsor.logo && (
                        <div className="relative w-full h-20 sm:h-24 flex items-center justify-center">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_DB_URL}/sponsers/${sponsor.logo}`}
                            alt={`${sponsor.name} logo`}
                            width={160}
                            height={80}
                            className="object-contain opacity-100"
                          />
                        </div>
                      )}
                      <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {sponsor.description}
                      </p>
                    </div>
                    <BorderBeam
                      size={250}
                      duration={12}
                      delay={9}
                      className="rounded-lg"
                    />
                  </MagicCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
