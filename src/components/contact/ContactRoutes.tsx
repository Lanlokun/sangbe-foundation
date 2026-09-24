import Link from "next/link";
import {
  ArrowRight,
  HandHeart,
  HeartHandshake,
  HelpingHand,
  Users,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const routes = [
  {
    icon: HelpingHand,
    title: "Request Help",
    description:
      "Tell us about assistance needed by you, your family, or your community.",
    href: "/request-help",
    action: "Request Support",
  },
  {
    icon: Users,
    title: "Volunteer",
    description:
      "Contribute your time, skills, and energy to support our activities.",
    href: "/volunteer",
    action: "Join Our Team",
  },
  {
    icon: HeartHandshake,
    title: "Partnerships",
    description:
      "Explore opportunities for your organization to work with Sangbe Foundation.",
    href: "/partners",
    action: "Partner With Us",
  },
  {
    icon: HandHeart,
    title: "Donations",
    description:
      "Support our programs and community activities through a contribution.",
    href: "/donate",
    action: "Support Our Work",
  },
];

export default function ContactRoutes() {
  return (
    <section className="bg-[#f5f8f6] py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Find the Right Place
            </p>

            <h2 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
              Looking for something{" "}
              <span className="text-[#19944f]">
                specific?
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#68766e]">
              Use the dedicated option below so your enquiry reaches the right
              place.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {routes.map((route) => {
            const Icon = route.icon;

            return (
              <StaggerItem
                key={route.title}
                className="h-full"
              >
                <Link
                  href={route.href}
                  className="group flex h-full min-h-[280px] flex-col rounded-[24px] border border-[#dfe8e2] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#b8d7c3] hover:shadow-[0_14px_35px_rgba(20,50,35,0.07)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf7ef] transition-colors duration-300 group-hover:bg-[#19944f]">
                    <Icon
                      size={24}
                      className="text-[#19944f] transition-colors duration-300 group-hover:text-white"
                    />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#142019]">
                    {route.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#68766e]">
                    {route.description}
                  </p>

                  <div className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-[#178f4c]">
                    {route.action}

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}   