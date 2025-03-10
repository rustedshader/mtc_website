import CursorDotPattern from "@/components/ui/dot-pattern";
import { MagicCard } from "@/components/ui/magic-card";
import SparklesText from "@/components/ui/sparkles-text";
import { teamConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";

export default function Team() {
  const teamData = teamConfig.teams;
  return (
    <>
      <CursorDotPattern />
      <section className="container mx-auto min-h-screen w-full relative px-4 py-16 items-center">
        <SparklesText
          className="font-bold text-5xl text-center mb-16"
          text="Meet the Team"
        />
        <div className="space-y-20">
          {teamData.map((team) => (
            <div key={team.type} className="space-y-12">
              <div className="text-4xl font-semibold text-center text-white">
                {team.type}
              </div>
              <div className="flex flex-wrap justify-center gap-10 items-center">
                {team.users.map((user, index) => (
                  <Link
                    href={`${user.linkedin}`}
                    key={`${user.name}_${index}`}
                    target="_blank"
                  >
                    <MagicCard
                      className={`relative flex flex-col items-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-[280px] max-w-[300px] ${
                        team.type === "Faculty Coordinators" ||
                        team.type === "Student Coordinator" ||
                        team.type === "Alumni"
                          ? "h-[300px]"
                          : "h-[350px]"
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-6">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_DB_URL}/team/${user.image}`}
                          alt={user.name}
                          width={200}
                          height={200}
                          className="rounded-full object-cover w-40 h-40"
                        />
                        <h3 className="text-2xl text-center font-semibold text-gray-800 dark:text-gray-200">
                          {user.name}
                        </h3>
                        <div className="text-center">{user.role}</div>
                      </div>
                    </MagicCard>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
