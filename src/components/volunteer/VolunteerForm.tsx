"use client";

import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  Info,
  Loader2,
  Send,
} from "lucide-react";

type VolunteerData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  occupation: string;
  interests: string[];
  availability: string;
  experience: string;
  motivation: string;
  consent: boolean;
};

const initialForm: VolunteerData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  occupation: "",
  interests: [],
  availability: "",
  experience: "",
  motivation: "",
  consent: false,
};

const interestOptions = [
  "Community Outreach",
  "Drug Abuse Awareness",
  "Disaster Relief",
  "Community Assistance",
  "Events",
  "Communications & Media",
  "Technology",
  "Fundraising & Partnerships",
  "Other",
];

export default function VolunteerForm() {
  const [form, setForm] = useState<VolunteerData>(initialForm);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof VolunteerData>(
    field: K,
    value: VolunteerData[K]
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

  function toggleInterest(interest: string) {
    setForm((current) => {
      const selected = current.interests.includes(interest);

      return {
        ...current,
        interests: selected
          ? current.interests.filter((item) => item !== interest)
          : [...current.interests, interest],
      };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.interests.length === 0) {
      setStatus("error");
      setErrorMessage(
        "Please select at least one area you are interested in."
      );
      return;
    }

    if (!form.consent) {
      setStatus("error");
      setErrorMessage(
        "Please confirm that the information provided is accurate."
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/volunteer", {
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
            "We could not submit your application. Please try again."
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
    <section
      id="volunteer-form"
      className="scroll-mt-24 bg-[#f5f8f6] py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Volunteer Application
            </p>

            <h2 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
              Tell us how you&apos;d like to{" "}
              <span className="text-[#19944f]">get involved.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#68766e]">
              Complete the form below to express your interest in volunteering
              with Sangbe Foundation.
            </p>
          </div>

          <div className="rounded-[30px] border border-[#dfe8e2] bg-white p-7 shadow-[0_15px_45px_rgba(20,50,35,0.04)] md:p-10 lg:p-12">
            {status === "success" ? (
              <div className="flex min-h-[470px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e5f7eb]">
                  <CheckCircle2
                    size={31}
                    className="text-[#19944f]"
                  />
                </div>

                <h3 className="mt-6 text-3xl font-bold text-[#142019]">
                  Thank you for volunteering.
                </h3>

                <p className="mt-4 max-w-lg text-base leading-7 text-[#68766e]">
                  Your volunteer application has been received. Our team will
                  review the information and may contact you when a suitable
                  opportunity is available.
                </p>

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 font-semibold text-[#178f4c] hover:underline"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Personal information */}
                <div>
                  <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#178f4c]">
                    Your Information
                  </p>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Field
                      label="Full Name"
                      required
                      value={form.name}
                      onChange={(value) => updateField("name", value)}
                      placeholder="Your full name"
                      autoComplete="name"
                    />

                    <Field
                      label="Email Address"
                      required
                      type="email"
                      value={form.email}
                      onChange={(value) => updateField("email", value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />

                    <Field
                      label="Phone / WhatsApp"
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(value) => updateField("phone", value)}
                      placeholder="+220..."
                      autoComplete="tel"
                    />

                    <Field
                      label="Location"
                      required
                      value={form.location}
                      onChange={(value) =>
                        updateField("location", value)
                      }
                      placeholder="Town / community"
                    />

                    <div className="md:col-span-2">
                      <Field
                        label="Occupation / Area of Study"
                        value={form.occupation}
                        onChange={(value) =>
                          updateField("occupation", value)
                        }
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div className="mt-10 border-t border-[#e5ebe7] pt-10">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#178f4c]">
                    Areas of Interest
                  </p>

                  <h3 className="mt-3 text-xl font-bold text-[#142019]">
                    Where would you like to contribute?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#68766e]">
                    Select all that apply.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {interestOptions.map((interest) => {
                      const selected =
                        form.interests.includes(interest);

                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                            selected
                              ? "border-[#19944f] bg-[#19944f] text-white"
                              : "border-[#d9e3dc] bg-[#f9fbfa] text-[#58675e] hover:border-[#a9cfb7] hover:text-[#178f4c]"
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Availability */}
                <div className="mt-10 border-t border-[#e5ebe7] pt-10">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#25342b]">
                        Availability{" "}
                        <span className="text-[#19944f]">*</span>
                      </label>

                      <select
                        required
                        value={form.availability}
                        onChange={(event) =>
                          updateField(
                            "availability",
                            event.target.value
                          )
                        }
                        className="w-full rounded-xl border border-[#d9e3dc] bg-[#fbfcfb] px-4 py-3.5 text-[#142019] outline-none transition focus:border-[#19944f] focus:bg-white focus:ring-4 focus:ring-[#19944f]/10"
                      >
                        <option value="">Select availability</option>
                        <option value="weekdays">
                          Weekdays
                        </option>
                        <option value="weekends">
                          Weekends
                        </option>
                        <option value="evenings">
                          Evenings
                        </option>
                        <option value="flexible">
                          Flexible
                        </option>
                        <option value="events">
                          Specific events / activities
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#25342b]">
                        Relevant Experience
                      </label>

                      <input
                        type="text"
                        value={form.experience}
                        onChange={(event) =>
                          updateField(
                            "experience",
                            event.target.value
                          )
                        }
                        placeholder="Optional"
                        className="w-full rounded-xl border border-[#d9e3dc] bg-[#fbfcfb] px-4 py-3.5 text-[#142019] outline-none transition placeholder:text-[#a2ada6] focus:border-[#19944f] focus:bg-white focus:ring-4 focus:ring-[#19944f]/10"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="motivation"
                      className="mb-2 block text-sm font-semibold text-[#25342b]"
                    >
                      Why would you like to volunteer?{" "}
                      <span className="text-[#19944f]">*</span>
                    </label>

                    <textarea
                      id="motivation"
                      required
                      rows={6}
                      value={form.motivation}
                      onChange={(event) =>
                        updateField(
                          "motivation",
                          event.target.value
                        )
                      }
                      placeholder="Tell us briefly why you would like to volunteer with Sangbe Foundation and how you hope to contribute."
                      className="w-full resize-none rounded-xl border border-[#d9e3dc] bg-[#fbfcfb] px-4 py-3.5 text-[#142019] outline-none transition placeholder:text-[#a2ada6] focus:border-[#19944f] focus:bg-white focus:ring-4 focus:ring-[#19944f]/10"
                    />
                  </div>
                </div>

                <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-[18px] bg-[#f4f8f5] p-5">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(event) =>
                      updateField(
                        "consent",
                        event.target.checked
                      )
                    }
                    className="mt-1 h-4 w-4 accent-[#19944f]"
                  />

                  <span className="text-sm leading-6 text-[#59675f]">
                    I confirm that the information provided is accurate and
                    agree that Sangbe Foundation may contact me regarding
                    volunteering opportunities.
                  </span>
                </label>

                <div className="mt-5 flex items-start gap-3 text-sm leading-6 text-[#7c8981]">
                  <Info
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  <p>
                    Submitting this form expresses your interest in
                    volunteering and does not guarantee immediate placement.
                    Opportunities depend on current activities and needs.
                  </p>
                </div>

                {status === "error" && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#19944f] px-7 py-4 font-semibold text-white transition hover:bg-[#168545] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application

                      <Send
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#25342b]">
        {label}{" "}
        {required && (
          <span className="text-[#19944f]">*</span>
        )}
      </label>

      <input
        type={type}
        required={required}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#d9e3dc] bg-[#fbfcfb] px-4 py-3.5 text-[#142019] outline-none transition placeholder:text-[#a2ada6] focus:border-[#19944f] focus:bg-white focus:ring-4 focus:ring-[#19944f]/10"
      />
    </div>
  );
}