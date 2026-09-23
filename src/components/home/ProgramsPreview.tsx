import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

const programs = [
  {
    category: "DISASTER RELIEF",
    title: "Flood Relief & Emergency Support",
    description:
      "Providing essential assistance to families and communities affected by flooding and other emergencies.",
    image: "/images/disaster-relief/flood.png",
    href: "/disaster-relief",
  },
  {
    category: "AWARENESS",
    title: "Drug Abuse Awareness",
    description:
      "Educating young people, families, and communities about drug abuse, prevention, risks, and available support.",
    image: "/images/disaster-relief/drugabuse.png",
    href: "/awareness",
  },
  {
    category: "COMMUNITY",
    title: "Community Assistance",
    description:
      "Supporting vulnerable people with essential assistance and responding to community needs where help matters most.",
    image: "/images/disaster-relief/communitysupport.png",
    href: "/programs",
  },
];

export default function ProgramsPreview() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Programs & Projects
            </p>

            <h2 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-[#142019] lg:text-5xl">
              Turning compassion into{" "}
              <span className="text-[#19944f]">meaningful action.</span>
            </h2>
          </div>

          <div className="max-w-lg lg:justify-self-end">
            <p className="mb-5 text-base leading-7 text-[#68766e]">
              From awareness and prevention to disaster response and community
              assistance, our programs are built around the needs of the people
              and communities we serve.
            </p>

            <Link
              href="/programs"
              className="inline-flex items-center gap-2 font-semibold text-[#178f4c] transition-all duration-300 hover:gap-3"
            >
              Explore all programs
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <StaggerItem key={program.title} className="h-full">
              <Link
                href={program.href}
                className="group block h-full overflow-hidden rounded-[28px] border border-[#dfe8e2] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#bcd8c6] hover:shadow-[0_14px_35px_rgba(20,50,35,0.07)]"
              >
                <div className="relative h-[280px] overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="flex min-h-[300px] flex-col p-8">
                  <div className="mb-7 flex items-center justify-between">
                    <span className="rounded-full bg-[#eaf7ef] px-4 py-2 text-xs font-bold tracking-[0.1em] text-[#178f4c]">
                      {program.category}
                    </span>

                    <ArrowRight
                      size={23}
                      className="text-[#9aaaa1] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#178f4c]"
                    />
                  </div>

                  <h3 className="mb-5 text-2xl font-bold leading-tight text-[#142019]">
                    {program.title}
                  </h3>

                  <p className="text-base leading-7 text-[#68766e]">
                    {program.description}
                  </p>

                  <div className="mt-auto flex items-center gap-2 pt-6 text-sm text-[#91a098]">
                    <MapPin size={17} />
                    <span>The Gambia</span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}