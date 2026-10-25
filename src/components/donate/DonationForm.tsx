"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Copy,
  Globe2,
  Heart,
  Loader2,
  Smartphone,
} from "lucide-react";

import HoneypotField from "@/components/ui/HoneypotField";

type DonationMethod =
  | "wave"
  | "bank"
  | "international_bank";

type DonationResult = {
  reference: string;
  amount: number;
  currency: string;
  method: DonationMethod;
  status: string;
};

const PRESET_AMOUNTS = [50, 100, 200, 500];

const paymentMethods = [
  {
    id: "wave" as const,
    name: "Wave",
    description: "Local mobile money donation",
    icon: Smartphone,
  },
  {
    id: "bank" as const,
    name: "Bank Transfer",
    description: "Ecobank Gambia",
    icon: Building2,
  },
  {
    id: "international_bank" as const,
    name: "International Transfer",
    description: "International bank transfer",
    icon: Globe2,
  },
];

export default function DonationForm() {
  const [step, setStep] = useState(1);

  const [method, setMethod] =
    useState<DonationMethod | null>(null);

  const [amount, setAmount] = useState("");

  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");

  const [anonymous, setAnonymous] =
    useState(false);

  // Invisible anti-spam field.
  // Normal users leave this empty.
  const [website, setWebsite] = useState("");

  const [donation, setDonation] =
    useState<DonationResult | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const numericAmount = Number(amount);

  function choosePreset(value: number) {
    setAmount(String(value));
    setError("");
  }

  function selectMethod(value: DonationMethod) {
    setMethod(value);
    setError("");
  }

  function continueToAmount() {
    if (!method) {
      setError(
        "Please select a payment method."
      );
      return;
    }

    setError("");
    setStep(2);
  }

  async function createDonation() {
    if (
      !Number.isFinite(numericAmount) ||
      numericAmount < 1
    ) {
      setError(
        "Please enter a valid donation amount."
      );
      return;
    }

    if (!method) {
      setError(
        "Please select a payment method."
      );
      setStep(1);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/donations",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            method,
            amount: numericAmount,
            donorName,
            donorEmail,
            donorPhone,
            anonymous,
            website,
          }),
        }
      );

      const data = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "We could not create your donation request."
        );
      }

      if (
        !data?.success ||
        !data?.donation?.reference
      ) {
        throw new Error(
          "We could not confirm your donation request."
        );
      }

      setDonation(data.donation);
      setStep(3);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="donate"
      className="bg-[#f5f8f6] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Heading */}

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
            Make a Donation
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em] text-[#142019] sm:text-5xl">
            Support our work.
          </h2>

          <p className="mt-5 text-base leading-7 text-[#68766e]">
            Choose your preferred payment
            method and donation amount. We
            will provide the appropriate
            payment details.
          </p>
        </div>

        {/* Step indicator */}

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="grid grid-cols-3">
            <StepIndicator
              number={1}
              label="Select Method"
              active={step === 1}
              complete={step > 1}
            />

            <StepIndicator
              number={2}
              label="Enter Amount"
              active={step === 2}
              complete={step > 2}
            />

            <StepIndicator
              number={3}
              label="Get Details"
              active={step === 3}
              complete={false}
            />
          </div>
        </div>

        {/* Main card */}

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-[28px] border border-[#dce6df] bg-white shadow-[0_20px_60px_rgba(20,55,35,0.07)]">
          <HoneypotField
            value={website}
            onChange={setWebsite}
          />

          {/* STEP 1 */}

          {step === 1 && (
            <div className="p-7 sm:p-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#178f4c]">
                  Step 1
                </p>

                <h3 className="mt-3 text-2xl font-bold text-[#142019]">
                  Choose a payment method
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#68766e]">
                  Select how you would like
                  to make your donation.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {paymentMethods.map(
                  (paymentMethod) => {
                    const Icon =
                      paymentMethod.icon;

                    const selected =
                      method ===
                      paymentMethod.id;

                    return (
                      <button
                        key={
                          paymentMethod.id
                        }
                        type="button"
                        onClick={() =>
                          selectMethod(
                            paymentMethod.id
                          )
                        }
                        className={`relative rounded-[20px] border p-5 text-left transition-all ${
                          selected
                            ? "border-[#19944f] bg-[#eff9f2] ring-2 ring-[#19944f]/10"
                            : "border-[#dfe7e2] bg-white hover:border-[#bcd8c5] hover:bg-[#fafcfb]"
                        }`}
                      >
                        {selected && (
                          <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#19944f]">
                            <Check
                              size={14}
                              className="text-white"
                            />
                          </div>
                        )}

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f5ec]">
                          <Icon
                            size={21}
                            className="text-[#19944f]"
                          />
                        </div>

                        <p className="mt-5 font-bold text-[#142019]">
                          {
                            paymentMethod.name
                          }
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#7c8981]">
                          {
                            paymentMethod.description
                          }
                        </p>
                      </button>
                    );
                  }
                )}
              </div>

              {error && (
                <ErrorMessage
                  message={error}
                />
              )}

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={
                    continueToAmount
                  }
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#19944f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#168545]"
                >
                  Continue

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <div className="p-7 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#178f4c]">
                Step 2
              </p>

              <h3 className="mt-3 text-2xl font-bold text-[#142019]">
                Enter your donation
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#68766e]">
                Every contribution helps
                Sangbe Foundation support
                communities and people in
                need.
              </p>

              {/* Amount */}

              <div className="mt-8">
                <label
                  htmlFor="amount"
                  className="mb-2 block text-sm font-semibold text-[#25342b]"
                >
                  Donation Amount (GMD)
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#19944f]">
                    D
                  </span>

                  <input
                    id="amount"
                    type="number"
                    min="1"
                    step="0.01"
                    value={amount}
                    onChange={(event) => {
                      setAmount(
                        event.target.value
                      );
                      setError("");
                    }}
                    placeholder="Enter amount"
                    className="w-full rounded-xl border border-[#d9e3dc] bg-white py-4 pl-10 pr-4 text-lg font-semibold text-[#142019] outline-none transition focus:border-[#19944f] focus:ring-4 focus:ring-[#19944f]/10"
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {PRESET_AMOUNTS.map(
                    (value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          choosePreset(
                            value
                          )
                        }
                        className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                          amount ===
                          String(value)
                            ? "border-[#19944f] bg-[#eaf7ef] text-[#178f4c]"
                            : "border-[#dce5df] text-[#53645a] hover:border-[#a9cfb5]"
                        }`}
                      >
                        GMD {value}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Optional donor info */}

              <div className="mt-9 border-t border-[#e7ede9] pt-8">
                <h4 className="font-bold text-[#142019]">
                  Donor information
                </h4>

                <p className="mt-1 text-sm text-[#7a8880]">
                  Optional. This can help
                  the Foundation identify
                  and acknowledge your
                  donation.
                </p>

                <label className="mt-5 flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={(event) =>
                      setAnonymous(
                        event.target.checked
                      )
                    }
                    className="h-4 w-4 accent-[#19944f]"
                  />

                  <span className="text-sm font-medium text-[#4f6156]">
                    Make this donation
                    anonymously
                  </span>
                </label>

                {!anonymous && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      value={donorName}
                      onChange={(event) =>
                        setDonorName(
                          event.target.value
                        )
                      }
                      placeholder="Full name"
                      autoComplete="name"
                      className="rounded-xl border border-[#d9e3dc] bg-white px-4 py-3.5 text-sm text-[#142019] outline-none transition focus:border-[#19944f] focus:ring-4 focus:ring-[#19944f]/10"
                    />

                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(event) =>
                        setDonorEmail(
                          event.target.value
                        )
                      }
                      placeholder="Email address"
                      autoComplete="email"
                      className="rounded-xl border border-[#d9e3dc] bg-white px-4 py-3.5 text-sm text-[#142019] outline-none transition focus:border-[#19944f] focus:ring-4 focus:ring-[#19944f]/10"
                    />

                    <input
                      type="tel"
                      value={donorPhone}
                      onChange={(event) =>
                        setDonorPhone(
                          event.target.value
                        )
                      }
                      placeholder="Phone number"
                      autoComplete="tel"
                      className="rounded-xl border border-[#d9e3dc] bg-white px-4 py-3.5 text-sm text-[#142019] outline-none transition focus:border-[#19944f] focus:ring-4 focus:ring-[#19944f]/10 sm:col-span-2"
                    />
                  </div>
                )}
              </div>

              {error && (
                <ErrorMessage
                  message={error}
                />
              )}

              <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setStep(1);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dbe5de] px-5 py-3.5 text-sm font-semibold text-[#53645a] transition hover:bg-[#f6f9f7]"
                >
                  <ArrowLeft size={17} />
                  Back
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={
                    createDonation
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#19944f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#168545] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Preparing...
                    </>
                  ) : (
                    <>
                      Get Payment Details
                      <ArrowRight
                        size={17}
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}

          {step === 3 &&
            donation && (
              <PaymentDetails
                donation={donation}
              />
            )}
        </div>

        {/* Registration */}

        <div className="mx-auto mt-7 flex max-w-3xl items-center justify-center gap-2 text-center text-xs text-[#7b8980]">
          <CheckCircle2
            size={15}
            className="text-[#19944f]"
          />

          <span>
            Sangbe Foundation • Charity
            Registration No.{" "}
            <strong className="text-[#53645a]">
              2019/C8931
            </strong>
          </span>
        </div>
      </div>
    </section>
  );
}

function StepIndicator({
  number,
  label,
  active,
  complete,
}: {
  number: number;
  label: string;
  active: boolean;
  complete: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div
        className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
          active || complete
            ? "bg-[#19944f] text-white"
            : "border border-[#ccd9d0] bg-white text-[#849188]"
        }`}
      >
        {complete ? (
          <Check size={16} />
        ) : (
          number
        )}
      </div>

      <p
        className={`mt-2 text-xs font-semibold ${
          active || complete
            ? "text-[#178f4c]"
            : "text-[#89958d]"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function PaymentDetails({
  donation,
}: {
  donation: DonationResult;
}) {
  return (
    <div className="p-7 sm:p-10">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e7f7ec]">
        <Heart
          size={25}
          className="fill-[#19944f] text-[#19944f]"
        />
      </div>

      <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#178f4c]">
        Step 3
      </p>

      <h3 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-[#142019]">
        Complete your payment
      </h3>

      <p className="mt-3 max-w-xl text-sm leading-6 text-[#68766e]">
        Use the payment details below
        to complete your donation. Your
        donation remains pending until
        payment has been confirmed.
      </p>

      {/* Summary */}

      <div className="mt-8 grid gap-3 rounded-[20px] bg-[#f3f8f5] p-5 sm:grid-cols-2">
        <SummaryItem
          label="Donation Amount"
          value={`${donation.currency} ${Number(
            donation.amount
          ).toLocaleString()}`}
        />

        <SummaryItem
          label="Status"
          value="Pending Payment"
        />
      </div>

      {/* Payment-specific details */}

      <div className="mt-7">
        {donation.method ===
          "wave" && (
          <WaveDetails
            reference={
              donation.reference
            }
          />
        )}

        {donation.method ===
          "bank" && (
          <BankDetails
            reference={
              donation.reference
            }
          />
        )}

        {donation.method ===
          "international_bank" && (
          <InternationalBankDetails
            reference={
              donation.reference
            }
          />
        )}
      </div>

      {/* Reference */}

      <div className="mt-7 rounded-[20px] border border-[#cfe3d5] bg-[#f5fbf7] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#728079]">
          Your Sangbe Donation Reference
        </p>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <code className="break-all text-base font-bold text-[#073b29]">
            {donation.reference}
          </code>

          <CopyButton
            value={
              donation.reference
            }
          />
        </div>

        <p className="mt-3 text-xs leading-5 text-[#748178]">
          Where your payment provider
          allows a reference or
          description, use this reference
          so the Foundation can identify
          your donation.
        </p>
      </div>

      <div className="mt-7 rounded-[18px] border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-bold text-amber-900">
          Payment confirmation
        </p>

        <p className="mt-2 text-sm leading-6 text-amber-800">
          Creating this donation request
          does not confirm that payment
          has been received. The
          Foundation will verify the
          payment separately.
        </p>
      </div>
    </div>
  );
}

function WaveDetails({
  reference,
}: {
  reference: string;
}) {
  return (
    <PaymentCard
      title="Wave"
      subtitle="Local donations — The Gambia"
    >
      <DetailRow
        label="Wave Number"
        value="877779250"
        copy
      />

      <DetailRow
        label="Reference"
        value={reference}
        copy
      />
    </PaymentCard>
  );
}

function BankDetails({
  reference,
}: {
  reference: string;
}) {
  return (
    <PaymentCard
      title="Ecobank (Gambia)"
      subtitle="Local bank transfer"
    >
      <DetailRow
        label="Account Name"
        value="SANGBE FOUNDATION"
        copy
      />

      <DetailRow
        label="Account Number"
        value="6274014837"
        copy
      />

      <DetailRow
        label="Reference"
        value={reference}
        copy
      />
    </PaymentCard>
  );
}

function InternationalBankDetails({
  reference,
}: {
  reference: string;
}) {
  return (
    <PaymentCard
      title="Ecobank (Gambia)"
      subtitle="International bank transfer"
    >
      <DetailRow
        label="Account Name"
        value="SANGBE FOUNDATION"
        copy
      />

      <DetailRow
        label="Account Number"
        value="6274014837"
        copy
      />

      <DetailRow
        label="SWIFT Code"
        value="ECOCGMGM"
        copy
      />

      <DetailRow
        label="BBAN"
        value="008204627401483714"
        copy
      />

      <DetailRow
        label="Bank Address"
        value="42 Kairaba Avenue, Serrekunda, The Gambia"
      />

      <DetailRow
        label="Reference"
        value={reference}
        copy
      />
    </PaymentCard>
  );
}

function PaymentCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[#dce6df]">
      <div className="bg-[#073b29] px-5 py-4">
        <p className="font-bold text-white">
          {title}
        </p>

        <p className="mt-1 text-xs text-white/60">
          {subtitle}
        </p>
      </div>

      <div className="divide-y divide-[#e7ede9] px-5">
        {children}
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  copy = false,
}: {
  label: string;
  value: string;
  copy?: boolean;
}) {
  return (
    <div className="flex gap-4 py-4">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#89958e]">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-[#142019]">
          {value}
        </p>
      </div>

      {copy && (
        <CopyButton value={value} />
      )}
    </div>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#839087]">
        {label}
      </p>

      <p className="mt-1 font-bold text-[#142019]">
        {value}
      </p>
    </div>
  );
}

function CopyButton({
  value,
}: {
  value: string;
}) {
  const [copied, setCopied] =
    useState(false);

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(
        value
      );

      setCopied(true);

      window.setTimeout(
        () => setCopied(false),
        1500
      );
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyValue}
      className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-[#d7e4db] bg-white px-3 py-2 text-xs font-semibold text-[#53665a] transition hover:border-[#a9cfb5] hover:text-[#178f4c]"
    >
      {copied ? (
        <>
          <Check size={14} />
          Copied
        </>
      ) : (
        <>
          <Copy size={14} />
          Copy
        </>
      )}
    </button>
  );
}

function ErrorMessage({
  message,
}: {
  message: string;
}) {
  return (
    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </div>
  );
}