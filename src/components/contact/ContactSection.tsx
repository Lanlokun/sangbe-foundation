"use client";

import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactSection() {
  const [form, setForm] = useState<FormData>(initialForm);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState("");

  function updateField(
    field: keyof FormData,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "We could not send your message. Please try again."
        );
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        {/* Contact details */}
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
            Get in Touch
          </p>

          <h2 className="max-w-lg text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
            Start a{" "}
            <span className="text-[#19944f]">conversation.</span>
          </h2>

          <p className="mt-6 max-w-md text-base leading-7 text-[#68766e]">
            Send us a message using the form and our team will review your
            enquiry and respond when possible.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex gap-4 rounded-[20px] border border-[#e0e8e3] bg-[#f8faf8] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7ef]">
                <MapPin size={20} className="text-[#19944f]" />
              </div>

              <div>
                <p className="font-bold text-[#142019]">
                  Location
                </p>

                <p className="mt-1 text-sm leading-6 text-[#68766e]">
                  Busumbala, West Coast Region
                  <br />
                  The Gambia
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-[20px] border border-[#e0e8e3] bg-[#f8faf8] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7ef]">
                <Phone size={20} className="text-[#19944f]" />
              </div>

              <div>
                <p className="font-bold text-[#142019]">
                  Phone / WhatsApp
                </p>

                <p className="mt-1 text-sm text-[#8a978f]">
                  Contact number coming soon
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-[20px] border border-[#e0e8e3] bg-[#f8faf8] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7ef]">
                <Mail size={20} className="text-[#19944f]" />
              </div>

              <div>
                <p className="font-bold text-[#142019]">
                  Email
                </p>

                <p className="mt-1 text-sm text-[#8a978f]">
                  Official email coming soon
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-start gap-3 rounded-[18px] bg-[#eaf7ef] p-5">
            <MessageCircle
              size={19}
              className="mt-0.5 shrink-0 text-[#19944f]"
            />

            <p className="text-sm leading-6 text-[#53665a]">
              Looking for assistance? Please use our dedicated{" "}
              <a
                href="/request-help"
                className="font-semibold text-[#178f4c] hover:underline"
              >
                Request Help
              </a>{" "}
              form so we can collect the appropriate information.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-[30px] border border-[#dfe8e2] bg-[#f8faf8] p-7 md:p-10 lg:p-12">
          <div className="mb-9">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#178f4c]">
              Send a Message
            </p>

            <h3 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-[#142019]">
              How can we help?
            </h3>
          </div>

          {status === "success" ? (
            <div className="flex min-h-[470px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e3f6ea]">
                <CheckCircle2
                  size={30}
                  className="text-[#19944f]"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#142019]">
                Message received.
              </h3>

              <p className="mt-3 max-w-md text-base leading-7 text-[#68766e]">
                Thank you for contacting Sangbe Foundation. Your message has
                been submitted successfully.
              </p>

              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-7 font-semibold text-[#178f4c] transition hover:text-[#126f3c]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[#25342b]"
                  >
                    Full Name *
                  </label>

                  <input
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    placeholder="Your name"
                    className="w-full rounded-xl border border-[#d9e3dc] bg-white px-4 py-3.5 text-[#142019] outline-none transition placeholder:text-[#a2ada6] focus:border-[#19944f] focus:ring-4 focus:ring-[#19944f]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#25342b]"
                  >
                    Email Address *
                  </label>

                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#d9e3dc] bg-white px-4 py-3.5 text-[#142019] outline-none transition placeholder:text-[#a2ada6] focus:border-[#19944f] focus:ring-4 focus:ring-[#19944f]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-[#25342b]"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    placeholder="Optional"
                    className="w-full rounded-xl border border-[#d9e3dc] bg-white px-4 py-3.5 text-[#142019] outline-none transition placeholder:text-[#a2ada6] focus:border-[#19944f] focus:ring-4 focus:ring-[#19944f]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-[#25342b]"
                  >
                    Subject *
                  </label>

                  <input
                    id="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={(event) =>
                      updateField("subject", event.target.value)
                    }
                    placeholder="What is this about?"
                    className="w-full rounded-xl border border-[#d9e3dc] bg-white px-4 py-3.5 text-[#142019] outline-none transition placeholder:text-[#a2ada6] focus:border-[#19944f] focus:ring-4 focus:ring-[#19944f]/10"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-[#25342b]"
                >
                  Message *
                </label>

                <textarea
                  id="message"
                  required
                  rows={7}
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-xl border border-[#d9e3dc] bg-white px-4 py-3.5 text-[#142019] outline-none transition placeholder:text-[#a2ada6] focus:border-[#19944f] focus:ring-4 focus:ring-[#19944f]/10"
                />
              </div>

              {status === "error" && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#19944f] px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#168545] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message

                    <Send
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}