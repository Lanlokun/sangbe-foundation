import Link from "next/link";
import {
  ArrowRight,
  Heart,
  HandHeart,
  MessageCircleHeart,
} from "lucide-react";

const actions = [
  {
    icon: Heart,
    title: "Make a Donation",
    description:
      "Support the Foundation's work and help us reach more people and communities.",
    label: "Donate Now",
    href: "/donate",
    primary: true,
  },
  {
    icon: HandHeart,
    title: "Become a Volunteer",
    description:
      "Give your time, skills, and energy to help create meaningful change in our communities.",
    label: "Join Us",
    href: "/volunteer",
    primary: false,
  },
  {
    icon: MessageCircleHeart,
    title: "Request Help",
    description:
      "If you or someone you know needs assistance, reach out to the Foundation through our help request.",
    label: "Request Assistance",
    href: "/request-help",
    primary: false,
  },
];

export default function GetInvolved() {
  return (
    <section className="bg-[#f4f8f5] py-24 lg:py-32">
      <div className="container">

        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#178a49]">
            Get Involved
          </p>

          <h2 className="text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[#17201b] sm:text-5xl">
            There&apos;s more than one way
            <span className="block text-[#178a49]">to make a difference.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#66736b]">
            Whether you choose to donate, volunteer your time, or reach out for
            support, Sangbe Foundation is here to connect people with action.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <div
                key={action.title}
                className={`group flex min-h-[340px] flex-col rounded-[22px] p-8 transition duration-300 hover:-translate-y-1 ${
                  action.primary
                    ? "bg-[#178a49] text-white shadow-[0_20px_50px_rgba(23,138,73,0.18)]"
                    : "border border-[#dde7e0] bg-white text-[#17201b]"
                }`}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    action.primary
                      ? "bg-white/15 text-white"
                      : "bg-[#eaf7ef] text-[#178a49]"
                  }`}
                >
                  <Icon size={26} />
                </div>

                <h3 className="mt-8 text-2xl font-bold tracking-[-0.025em]">
                  {action.title}
                </h3>

                <p
                  className={`mt-4 leading-7 ${
                    action.primary ? "text-white/75" : "text-[#66736b]"
                  }`}
                >
                  {action.description}
                </p>

                <div className="mt-auto pt-8">
                  <Link
                    href={action.href}
                    className={`inline-flex items-center gap-2 font-bold transition hover:gap-3 ${
                      action.primary ? "text-white" : "text-[#178a49]"
                    }`}
                  >
                    {action.label}
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}