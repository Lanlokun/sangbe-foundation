export default function Home() {
  return (
    <main>
      <section className="min-h-screen flex items-center bg-[#f7faf8]">
        <div className="container">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#178a49]">
              Sangbe Foundation
            </p>

            <h1 className="text-5xl font-bold tracking-tight text-[#17201b] md:text-7xl">
              Building Hope.
              <br />
              Changing Lives.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#66736b] md:text-xl">
              Supporting communities, empowering young people, fighting drug
              abuse, and helping vulnerable people build a healthier and more
              hopeful future.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/donate"
                className="rounded-lg bg-[#178a49] px-7 py-4 font-semibold text-white transition hover:bg-[#0f6937]"
              >
                Donate Now
              </a>

              <a
                href="/volunteer"
                className="rounded-lg border border-[#178a49] px-7 py-4 font-semibold text-[#178a49] transition hover:bg-[#eaf7ef]"
              >
                Become a Volunteer
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}