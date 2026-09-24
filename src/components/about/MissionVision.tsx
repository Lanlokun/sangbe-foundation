import {
  Eye,
  Target,
  HeartHandshake,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const cards = [
  {
    icon: Target,
    label: "Our Mission",
    title:
      "Advancing psycho-education for healthier lives and positive change.",
    description:
      "We use psycho-education to raise awareness about stress, its effects, and healthy coping mechanisms such as physical activity and meditation. Our goal is to provide professional and effective psycho-education to the general public and schools, free of charge.",
  },
  {
    icon: Eye,
    label: "Our Vision",
    title:
      "A future where young people are better equipped to overcome addiction, mental health challenges, and stress.",
    description:
      "We envision young people having access to the knowledge, psychological strategies, and support they need to make healthier choices and overcome difficult circumstances, including those who may not have access to formal education.",
  },
];

export default function MissionVision() {
  return (
    <section className="relative overflow-hidden bg-[#073b29] py-24 lg:py-28">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full border border-white/[0.06]" />

      <div className="pointer-events-none absolute -bottom-64 left-[20%] h-[500px] w-[500px] rounded-full border border-white/[0.05]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1da85a] shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                <HeartHandshake
                  size={26}
                  className="text-white"
                />
              </div>

              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#72dda0]">
                What Guides Us
              </p>

              <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white lg:text-5xl">
                Knowledge that empowers.{" "}
                <span className="text-[#72dda0]">
                  Support that transforms.
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-lg leading-8 text-white/60 lg:justify-self-end">
              Since 2019, Sangbe Foundation has
              worked to help people understand
              stress, addiction, mental health,
              and healthier ways of coping through
              accessible psycho-education.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <StaggerItem
                key={card.label}
                className="h-full"
              >
                <div className="group h-full rounded-[28px] border border-white/10 bg-white/[0.07] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#72dda0]/25 hover:bg-white/[0.09] lg:p-10">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 transition-colors duration-300 group-hover:bg-[#1da85a]">
                    <Icon
                      size={25}
                      className="text-[#72dda0] transition-colors duration-300 group-hover:text-white"
                    />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#72dda0]">
                    {card.label}
                  </p>

                  <h3 className="mt-4 max-w-md text-2xl font-bold leading-tight text-white lg:text-3xl">
                    {card.title}
                  </h3>

                  <p className="mt-5 max-w-xl leading-7 text-white/60">
                    {card.description}
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