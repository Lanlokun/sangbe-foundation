import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

const items = [
  {
    icon: ClipboardList,
    title: "Tell us what is happening",
    description:
      "Provide enough information for our team to understand the situation and the type of support being requested.",
  },
  {
    icon: HeartHandshake,
    title: "We review the request",
    description:
      "Requests are reviewed based on the circumstances, information provided, and the Foundation's available resources.",
  },
  {
    icon: CheckCircle2,
    title: "We may follow up",
    description:
      "Where appropriate, our team may contact you for additional information before determining the next steps.",
  },
];

export default function RequestHelpGuidance() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
                Before You Submit
              </p>

              <h2 className="max-w-lg text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
                Help us understand{" "}
                <span className="text-[#19944f]">
                  the situation.
                </span>
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-[#68766e]">
                Sharing clear information helps us understand what assistance
                is being requested and whether Sangbe Foundation may be able to
                respond.
              </p>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-5 rounded-[22px] border border-[#dfe8e2] bg-[#f8faf8] p-6"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e7f7ed]">
                      <Icon size={21} className="text-[#19944f]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-bold text-[#142019]">
                          {item.title}
                        </h3>

                        <span className="text-xs font-semibold text-[#b2bdb6]">
                          0{index + 1}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-[#68766e]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="flex gap-3 rounded-[18px] bg-[#fff8e8] p-5">
                <AlertCircle
                  size={19}
                  className="mt-0.5 shrink-0 text-[#a47719]"
                />

                <p className="text-sm leading-6 text-[#6d6248]">
                  Submitting a request does not guarantee assistance. Support
                  depends on the circumstances, the Foundation&apos;s capacity,
                  and available resources.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}