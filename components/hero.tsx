import Image from "next/image";

export function Hero() {
  return (
    <section className="page-section relative isolate min-h-[580px] overflow-hidden sm:min-h-[620px] lg:min-h-[680px]">
      <div className="absolute inset-0">
        <Image
          src="/images/d4v-hero-photo.png"
          alt="Older adults reviewing an unknown caller on a smartphone together at a table."
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover object-[61%_center] sm:object-[58%_center] lg:object-[53%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,27,44,0.9)_0%,rgba(7,27,44,0.82)_27%,rgba(7,27,44,0.46)_55%,rgba(7,27,44,0.16)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,27,44,0.34)_0%,rgba(7,27,44,0.14)_38%,rgba(7,27,44,0.32)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(248,243,235,0)_0%,rgba(248,243,235,0.95)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[580px] max-w-[1320px] items-center px-6 pb-20 pt-[154px] sm:min-h-[620px] sm:px-8 md:pt-[176px] lg:min-h-[680px] lg:px-10 lg:pt-[190px]">
        <div className="max-w-[860px]">
          <h1 className="editorial-serif max-w-[8ch] text-[3.1rem] leading-[0.92] font-semibold tracking-[-0.03em] text-[var(--color-warm-white)] sm:max-w-[8.4ch] sm:text-[3.9rem] md:max-w-none md:text-[4.6rem] lg:text-[5.25rem]">
            <span className="hero-landing-line block">Join Us in</span>
            <span className="hero-landing-line block">Preventing Online Fraud.</span>
          </h1>
          <div className="hero-landing-support mt-7 h-1.5 w-20 rounded-full bg-[var(--color-orange)]" />
          <p className="hero-landing-support mt-5 text-[0.96rem] font-semibold tracking-[0.14em] text-[color:rgba(255,253,249,0.92)] sm:text-base sm:tracking-[0.16em] md:text-lg md:tracking-[0.18em]">
            EMPOWERING OUR COMMUNITY.
            <br />
            PROTECTING WHAT MATTERS.
          </p>
        </div>
      </div>

      <div data-hero-sentinel className="absolute inset-x-0 bottom-0 h-px" />
    </section>
  );
}
