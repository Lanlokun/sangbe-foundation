import Link from "next/link";
import {
  ShieldCheck,
  HandHeart,
  House,
  Users,
  ArrowUpRight,
} from "lucide-react";

const focusAreas = [
  {
    title: "Drug Abuse Awareness",
    description:
      "Educating young people and communities about drug abuse, prevention, risks, and pathways toward healthier lives.",
    icon: ShieldCheck,
    href: "/awareness",
  },
  {
    title: "Community Support",
    description:
      "Providing assistance and support to vulnerable people and communities facing difficult circumstances.",
    icon: HandHeart,
    href: "/programs",
  },
  {
    title: "Disaster Relief",
    description:
      "Responding to floods and other emergencies by supporting affected families and communities when they need it most.",
    icon: House,
    href: "/disaster-relief",
  },
  {
    title: "Youth Empowerment",
    description:
      "Helping young people access knowledge, support, and opportunities that encourage healthier and brighter futures.",
    icon: Users,
    href: "/programs",
  },
];

export default function FocusAreas() {
  return (
    <section className="relative bg-white py-24 lg:py-28">
      <div className="container">

        {/* Heading */}
        <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#178a49]">
              What We Do
            </p>

            <h2 className="text-4xl font-bold tracking-[-0.035em] text-[#17201b] sm:text-5xl">
              Together, we can make
              <span className="block text-[#178a49]">a difference.</span>
            </h2>
          </div>

          <p className="max-w-lg text-base leading-7 text-[#66736b]">
            Sangbe Foundation works with individuals and communities to create
            positive change through awareness, assistance, prevention, and
            community support.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area) => {
            const Icon = area.icon;

            return (
              <Link
                key={area.title}
                href={area.href}
                className="group relative overflow-hidden rounded-2xl border border-[#e4ebe6] bg-[#f8fbf9] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#b9dac6] hover:shadow-[0_18px_45px_rgba(18,74,43,0.08)]"
              >
                <div className="mb-8 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f6ec] text-[#178a49] transition group-hover:bg-[#178a49] group-hover:text-white">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="text-[#9aa79f] transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#178a49]"
                  />
                </div>

                <h3 className="text-xl font-bold tracking-[-0.02em] text-[#17201b]">
                  {area.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-[#66736b]">
                  {area.description}
                </p>

                <div className="mt-7 h-[2px] w-8 bg-[#c9ded1] transition-all duration-300 group-hover:w-16 group-hover:bg-[#178a49]" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}