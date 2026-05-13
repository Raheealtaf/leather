// app/about/page.tsx
import Link from "next/link";
import { Scissors, ShieldCheck, Leaf, Clock, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#111] font-sans pt-20 md:pt-32">
      {/* ── 1. EDITORIAL HERO SECTION ── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center pb-16 md:pb-24">
        <p className="text-[#C8A96E] font-bold tracking-[0.25em] uppercase text-[10px] mb-8">
          The Heritage
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-wide mb-8 max-w-4xl mx-auto leading-tight text-[#111]">
          Forged in Tradition.
          <br />
          <span className="text-gray-400">Crafted for Tomorrow.</span>
        </h1>
        <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto font-light">
          At RS Leather, we believe that true luxury isn't manufactured on an
          assembly line. It is shaped by hand, perfected over time, and designed
          to last a lifetime.
        </p>
      </section>

      {/* Hero Image Block (Sharp, edge-to-edge on mobile, inset on desktop) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
        <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-gray-200 relative overflow-hidden group">
          {/* REPLACE WITH YOUR ACTUAL WORKSHOP IMAGE */}
          <div className="absolute inset-0 bg-[#111] flex items-center justify-center text-gray-600 text-[10px] tracking-[0.2em] uppercase">
            [ Full-Width Workshop / Brand Image ]
          </div>
        </div>
      </section>

      {/* ── 2. THE STORY SECTION (Minimalist Split Layout) ── */}
      <section className="py-16 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Side: Sharp Image */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 bg-gray-100 overflow-hidden relative">
              {/* REPLACE WITH YOUR LEATHER DETAIL IMAGE */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-[10px] tracking-[0.2em] uppercase border border-gray-300 m-4">
                [ Artisan Detail Image ]
              </div>
            </div>
          </div>

          {/* Right Side: Editorial Text */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl font-serif text-[#111] mb-8 leading-tight">
              A Legacy of <br className="hidden md:block" />
              <span className="italic text-gray-400">Uncompromising</span>{" "}
              Quality.
            </h2>

            <div className="space-y-6 text-sm text-gray-600 leading-loose font-light mb-12">
              <p>
                What started as a small workshop has evolved into a symbol of
                premium craftsmanship. Every jacket, bag, and wallet we produce
                carries the spirit of artisans who have spent decades mastering
                the art of leatherworking.
              </p>
              <p>
                We source only the finest top-grain and full-grain hides. Unlike
                mass-produced synthetics that peel and crack, our leather
                develops a rich, unique patina. The more you wear it, the better
                it looks. It becomes a canvas of your personal journey.
              </p>
            </div>

            {/* Elegant Blockquote */}
            <div className="border-t border-b border-gray-200/50 py-8 text-center lg:text-left">
              <p className="text-lg md:text-xl font-serif text-[#111] italic leading-relaxed">
                "We don't just make clothing. We make heirlooms meant to be
                passed down to the next generation."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. OUR PILLARS (Airy, Borderless Grid) ── */}
      <section className="bg-white py-24 md:py-32 border-t border-gray-200/50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-[#C8A96E] font-bold tracking-[0.25em] uppercase text-[10px] mb-4">
              The Standard
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#111]">
              Core Principles
            </h2>
          </div>

          {/* Soft Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            <div className="flex flex-col items-center text-center group">
              <Scissors className="w-8 h-8 text-[#111] stroke-[1.2] mb-6 transition-transform duration-500 group-hover:-translate-y-1" />
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#111] mb-4">
                Master Artistry
              </h3>
              <p className="text-[12px] text-gray-500 leading-relaxed font-light">
                Hand-cut patterns and precision stitching ensure a flawless fit
                and unmatched attention to detail.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <ShieldCheck className="w-8 h-8 text-[#111] stroke-[1.2] mb-6 transition-transform duration-500 group-hover:-translate-y-1" />
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#111] mb-4">
                Built for Life
              </h3>
              <p className="text-[12px] text-gray-500 leading-relaxed font-light">
                Reinforced seams and heavy-duty YKK hardware guarantee your gear
                survives whatever you throw at it.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <Leaf className="w-8 h-8 text-[#111] stroke-[1.2] mb-6 transition-transform duration-500 group-hover:-translate-y-1" />
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#111] mb-4">
                Ethical Sourcing
              </h3>
              <p className="text-[12px] text-gray-500 leading-relaxed font-light">
                We partner exclusively with environmentally conscious tanneries
                that treat their materials with respect.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <Clock className="w-8 h-8 text-[#111] stroke-[1.2] mb-6 transition-transform duration-500 group-hover:-translate-y-1" />
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#111] mb-4">
                Timeless Design
              </h3>
              <p className="text-[12px] text-gray-500 leading-relaxed font-light">
                We ignore fleeting fast-fashion trends in favor of classic
                silhouettes that look incredible in any decade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CALL TO ACTION (Brutalist / Editorial Block) ── */}
      <section className="bg-[#111] text-[#FDFBF7] py-24 md:py-32 text-center px-4 sm:px-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <p className="text-[#C8A96E] font-bold tracking-[0.25em] uppercase text-[10px] mb-6">
            Begin Your Journey
          </p>
          <h2 className="text-3xl md:text-5xl font-serif tracking-wide mb-8 leading-tight">
            Experience the difference.
          </h2>
          <p className="text-sm text-gray-400 mb-12 font-light leading-relaxed max-w-md mx-auto">
            Explore our latest collection and find the piece that will accompany
            you for the rest of your life.
          </p>

          {/* Sharp, unrounded brutalist button */}
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-4 bg-[#FDFBF7] text-[#111] hover:bg-[#C8A96E] hover:text-white font-bold text-[10px] tracking-[0.25em] uppercase py-5 px-10 transition-colors duration-300"
          >
            Shop the Collection <ArrowRight className="w-4 h-4 stroke-[1.5]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
