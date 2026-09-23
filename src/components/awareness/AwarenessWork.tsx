import {
  Megaphone,
  MessageCircle,
  Users,
  BookOpen,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const activities = [
  {
    number: "01",
    icon: Megaphone,
    title: "Awareness",
    description:
      "Sharing clear messages about drug abuse, prevention, risks, and healthier choices.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Education",
    description:
      "Helping young people and communities access information that supports better understanding and informed decisions.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Conversation",
    description:
      "Encouraging open and constructive discussions about drug abuse, prevention, and available support.",
  },
  {
    number: "04",
    icon: Users,
    title: "Community Engagement",
    description:
      "Working with people and communities to strengthen awareness and encourage collective responsibility.",
  },
];

export default function AwarenessWork() {
  return (
    <section className="relative overflow-hidden bg-[#073b29] py-24 lg:py-28">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-48 -top-52 h-[600px] w-[600px] rounded-full border border-white/[0.06]" />

      <div className="pointer-events-none absolute -bottom-64 left-[20%] h-[500px] w-[500px] rounded-full border border-white/[0.05]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#72dda0]">
                Our Awareness Work
              </p>

              <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white lg:text-5xl">
                Starting conversations that can{" "}
                <span className="text-[#72dda0]">
                  lead to better choices.
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-lg leading-8 text-white/60 lg:justify-self-end">
              Prevention is strengthened when people have access to information,
              opportunities to ask questions, and communities willing to talk
              openly about difficult issues.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <StaggerItem
                key={activity.title}
                className="h-full"
              >
                <div className="group flex h-full min-h-[300px] flex-col rounded-[24px] border border-white/10 bg-white/[0.07] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#72dda0]/25 hover:bg-white/[0.09]">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 transition-colors duration-300 group-hover:bg-[#1da85a]">
                      <Icon
                        size={24}
                        className="text-[#72dda0] transition-colors duration-300 group-hover:text-white"
                      />
                    </div>

                    <span className="text-xs font-bold text-white/30">
                      {activity.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-white">
                    {activity.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/55">
                    {activity.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}