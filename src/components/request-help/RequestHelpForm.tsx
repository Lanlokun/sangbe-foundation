"use client";

import { FormEvent, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";

type RequestForm = {
  name: string;
  phone: string;
  email: string;
  location: string;
  beneficiary: string;
  assistanceType: string;
  urgency: string;
  details: string;
  consent: boolean;
};

const initialForm: RequestForm = {
  name: "",
  phone: "",
  email: "",
  location: "",
  beneficiary: "",
  assistanceType: "",
  urgency: "",
  details: "",
  consent: false,
};

export default function RequestHelpForm() {
  const [form, setForm] = useState<RequestForm>(initialForm);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof RequestForm>(
    field: K,
    value: RequestForm[K]
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
      const response = await fetch("/api/request-help", {
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
            "We could not submit your request. Please try again."
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
      id="request-form"
      className="scroll-mt-24 bg-[#f5f8f6] py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Assistance Request
            </p>

            <h2 className="text-4xl font-bold tracking-[-0.03em] text-[#142019] lg:text-5xl">
              Tell us how we may{" "}
              <span className="text-[#19944f]">help.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#68766e]">
              Please provide as much relevant information as possible. Fields
              marked with an asterisk are required.
            </p>
          </div>

          <div className="rounded-[30px] border border-[#dfe8e2] bg-white p-7 shadow-[0_15px_45px_rgba(20,50,35,0.04)] md:p-10 lg:p-12">
            {status === "success" ? (
              <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e5f7eb]">
                  <CheckCircle2
                    size={31}
                    className="text-[#19944f]"
                  />
                </div>

                <h3 className="mt-6 text-3xl font-bold text-[#142019]">
                  Your request has been submitted.
                </h3>

                <p className="mt-4 max-w-lg text-base leading-7 text-[#68766e]">
                  Thank you for providing the information. Sangbe Foundation
                  will review the request and may contact you if additional
                  information is needed.
                </p>

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 font-semibold text-[#178f4c] hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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
                    label="Phone / WhatsApp"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(value) => updateField("phone", value)}
                    placeholder="+220..."
                    autoComplete="tel"
                  />

                  <Field
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={(value) => updateField("email", value)}
                    placeholder="Optional"
                    autoComplete="email"
                  />

                  <Field
                    label="Location / Community"
                    required
                    value={form.location}
                    onChange={(value) => updateField("location", value)}
                    placeholder="e.g. Busumbala"
                  />

                  <SelectField
                    label="Who needs assistance?"
                    required
                    value={form.beneficiary}
                    onChange={(value) =>
                      updateField("beneficiary", value)
                    }
                    options={[
                      ["myself", "Myself"],
                      ["family", "My family"],
                      ["individual", "Another individual"],
                      ["community", "My community"],
                      ["other", "Other"],
                    ]}
                  />

                  <SelectField
                    label="Type of Assistance"
                    required
                    value={form.assistanceType}
                    onChange={(value) =>
                      updateField("assistanceType", value)
                    }
                    options={[
                      ["essential-support", "Essential Support"],
                      ["disaster-relief", "Disaster / Emergency Relief"],
                      ["community-support", "Community Assistance"],
                      ["drug-support", "Drug Abuse Related Support"],
                      ["other", "Other"],
                    ]}
                  />

                  <div className="md:col-span-2">
                    <SelectField
                      label="How urgent is the situation?"
                      required
                      value={form.urgency}
                      onChange={(value) =>
                        updateField("urgency", value)
                      }
                      options={[
                        ["standard", "Standard"],
                        ["important", "Important"],
                        ["urgent", "Urgent"],
                      ]}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="request-details"
                      className="mb-2 block text-sm font-semibold text-[#25342b]"
                    >
                      Tell us about the situation{" "}
                      <span className="text-[#19944f]">*</span>
                    </label>

                    <textarea
                      id="request-details"
                      required
                      rows={7}
                      value={form.details}
                      onChange={(event) =>
                        updateField("details", event.target.value)
                      }
                      placeholder="Describe what has happened, what assistance is needed, and any other information that may help us understand the situation."
                      className="w-full resize-none rounded-xl border border-[#d9e3dc] bg-[#fbfcfb] px-4 py-3.5 text-[#142019] outline-none transition placeholder:text-[#a2ada6] focus:border-[#19944f] focus:bg-white focus:ring-4 focus:ring-[#19944f]/10"
                    />
                  </div>
                </div>

                <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-[18px] bg-[#f4f8f5] p-5">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(event) =>
                      updateField("consent", event.target.checked)
                    }
                    className="mt-1 h-4 w-4 accent-[#19944f]"
                  />

                  <span className="text-sm leading-6 text-[#59675f]">
                    I confirm that the information provided is accurate to the
                    best of my knowledge and understand that submitting this
                    request does not guarantee assistance.
                  </span>
                </label>

                <div className="mt-5 flex items-start gap-3 text-sm leading-6 text-[#7c8981]">
                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  <p>
                    This form is not an emergency service. If there is an
                    immediate threat to life or safety, seek appropriate local
                    emergency assistance.
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
                      Submit Request
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
        {required && <span className="text-[#19944f]">*</span>}
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

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
  required?: boolean;
};

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}: SelectFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#25342b]">
        {label}{" "}
        {required && <span className="text-[#19944f]">*</span>}
      </label>

      <select
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-[#d9e3dc] bg-[#fbfcfb] px-4 py-3.5 text-[#142019] outline-none transition focus:border-[#19944f] focus:bg-white focus:ring-4 focus:ring-[#19944f]/10"
      >
        <option value="">Select an option</option>

        {options.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}