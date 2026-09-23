"use client";

import { useState } from "react";
import {
  Banknote,
  Building2,
  Check,
  ChevronRight,
  CircleDollarSign,
  Heart,
  Info,
  MoreHorizontal,
  Smartphone,
} from "lucide-react";

type Method =
  | "bank"
  | "mobile"
  | "qmoney"
  | "afrimoney"
  | "other";

const methods = [
  {
    id: "bank" as Method,
    label: "Bank Transfer",
    icon: Building2,
  },
  {
    id: "mobile" as Method,
    label: "Mobile Money",
    icon: Smartphone,
  },
  {
    id: "qmoney" as Method,
    label: "QMoney",
    icon: CircleDollarSign,
  },
  {
    id: "afrimoney" as Method,
    label: "AfriMoney",
    icon: Banknote,
  },
  {
    id: "other" as Method,
    label: "Other Methods",
    icon: MoreHorizontal,
  },
];

const amounts = [50, 100, 200, 500];

export default function DonationForm() {
  const [method, setMethod] = useState<Method>("bank");
  const [amount, setAmount] = useState("");
  const [showNotice, setShowNotice] = useState(false);

  function selectAmount(value: number) {
    setAmount(String(value));
    setShowNotice(false);
  }

  function continueDonation() {
    if (!amount || Number(amount) <= 0) {
      return;
    }

    setShowNotice(true);
  }

  return (
    <section
      id="donate"
      className="scroll-mt-24 bg-[#f5f8f6] py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Make a Contribution
            </p>

            <h2 className="text-4xl font-bold tracking-[-0.03em] text-[#142019] lg:text-5xl">
              Choose how you&apos;d like to{" "}
              <span className="text-[#19944f]">support.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#68766e]">
              Select a preferred donation method and contribution amount.
            </p>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-[#dfe8e2] bg-white shadow-[0_15px_45px_rgba(20,50,35,0.05)]">
            {/* Steps */}
            <div className="border-b border-[#e5ebe7] px-7 py-7 md:px-10">
              <div className="grid grid-cols-3">
                <Step
                  number="1"
                  label="Select Method"
                  active
                />

                <Step
                  number="2"
                  label="Enter Amount"
                />

                <Step
                  number="3"
                  label="Get Details"
                />
              </div>
            </div>

            <div className="p-7 md:p-10 lg:p-12">
              {/* Payment methods */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#178f4c]">
                  Donation Method
                </p>

                <h3 className="mt-3 text-2xl font-bold text-[#142019]">
                  How would you like to donate?
                </h3>

                <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-5">
                  {methods.map((item) => {
                    const Icon = item.icon;
                    const selected = method === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setMethod(item.id);
                          setShowNotice(false);
                        }}
                        className={`relative flex min-h-[125px] flex-col items-center justify-center rounded-[18px] border p-4 text-center transition ${
                          selected
                            ? "border-[#19944f] bg-[#f0faf3] shadow-[0_0_0_1px_#19944f]"
                            : "border-[#dfe8e2] bg-white hover:border-[#acd4ba]"
                        }`}
                      >
                        {selected && (
                          <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#19944f]">
                            <Check
                              size={12}
                              className="text-white"
                            />
                          </div>
                        )}

                        <Icon
                          size={27}
                          className={
                            selected
                              ? "text-[#19944f]"
                              : "text-[#68766e]"
                          }
                        />

                        <span
                          className={`mt-3 text-sm font-semibold ${
                            selected
                              ? "text-[#178f4c]"
                              : "text-[#25342b]"
                          }`}
                        >
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amount */}
              <div className="mt-10 border-t border-[#e5ebe7] pt-10">
                <label
                  htmlFor="donation-amount"
                  className="block text-sm font-semibold text-[#25342b]"
                >
                  Donation Amount
                </label>

                <div className="relative mt-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-[#68766e]">
                    GMD
                  </span>

                  <input
                    id="donation-amount"
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(event) => {
                      setAmount(event.target.value);
                      setShowNotice(false);
                    }}
                    placeholder="Enter amount"
                    className="w-full rounded-xl border border-[#d9e3dc] bg-[#fbfcfb] py-4 pl-[70px] pr-4 text-[#142019] outline-none transition placeholder:text-[#a2ada6] focus:border-[#19944f] focus:bg-white focus:ring-4 focus:ring-[#19944f]/10"
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {amounts.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => selectAmount(value)}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        amount === String(value)
                          ? "border-[#19944f] bg-[#e9f7ee] text-[#178f4c]"
                          : "border-[#dfe8e2] text-[#59675f] hover:border-[#acd4ba]"
                      }`}
                    >
                      GMD {value}
                    </button>
                  ))}
                </div>
              </div>

              {/* Continue */}
              <button
                type="button"
                disabled={!amount || Number(amount) <= 0}
                onClick={continueDonation}
                className="group mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-[#19944f] px-7 py-4 font-semibold text-white transition hover:bg-[#168545] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
                <ChevronRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              {/* Temporary production notice */}
              {showNotice && (
                <div className="mt-6 rounded-[20px] border border-[#cfe5d7] bg-[#eef9f2] p-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#dff3e6]">
                      <Heart
                        size={19}
                        className="text-[#19944f]"
                      />
                    </div>

                    <div>
                      <h4 className="font-bold text-[#142019]">
                        Donation details will be available soon.
                      </h4>

                      <p className="mt-2 text-sm leading-6 text-[#68766e]">
                        You selected{" "}
                        <strong className="text-[#25342b]">
                          GMD {amount}
                        </strong>{" "}
                        via{" "}
                        <strong className="text-[#25342b]">
                          {
                            methods.find(
                              (item) => item.id === method
                            )?.label
                          }
                        </strong>
                        . The Foundation&apos;s verified payment details will
                        be displayed here once configured.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-start gap-3 text-sm leading-6 text-[#7c8981]">
                <Info
                  size={17}
                  className="mt-0.5 shrink-0"
                />

                <p>
                  Only use payment details published directly by Sangbe
                  Foundation on this website or provided through its verified
                  communication channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  number,
  label,
  active = false,
}: {
  number: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          active
            ? "bg-[#19944f] text-white"
            : "bg-[#e2e7e4] text-[#7b8880]"
        }`}
      >
        {number}
      </div>

      <span
        className={`hidden text-sm font-semibold sm:block ${
          active
            ? "text-[#178f4c]"
            : "text-[#87938c]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}