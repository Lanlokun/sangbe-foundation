
import Image from "next/image";

export default function DonationPaymentDetails() {
  return (
    <section className="bg-white px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#19944f]">
            Payment Information
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#142019]">
            Donation payment details
          </h2>

          <p className="mt-3 max-w-2xl text-[#68766e]">
            You can support Sangbe Foundation through Wave,
            local bank transfer, or international bank transfer.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#dfe8e2] bg-white p-3 shadow-sm sm:p-5">
          <Image
            src="/images/contact/sangbe-foundation-donation-payment-details.jpeg"
            alt="Sangbe Foundation Wave, Ecobank and international bank transfer donation details"
            width={1280}
            height={420}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="h-auto w-full rounded-xl object-contain"
          />
        </div>
      </div>
    </section>
  );
}
