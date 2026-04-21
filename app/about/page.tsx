// app/about/page.tsx
import Link from "next/link";
import { Scissors, ShieldCheck, Leaf, Clock, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-900 text-white py-32 lg:py-48 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-900 z-10"></div>

        {/* Placeholder for Hero Background Image */}
        <div className="absolute inset-0 bg-slate-800 opacity-40">
          {/* Add your workshop background image here later */}
        </div>

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-500 font-bold tracking-[0.2em] uppercase text-sm mb-6">
            Our Heritage
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Forged in Tradition.
            <br />
            <span className="text-slate-400">Crafted for Tomorrow.</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            At RS Leathers, we believe that true luxury isn't manufactured on an
            assembly line. It is shaped by hand, perfected over time, and
            designed to last a lifetime.
          </p>
        </div>
      </section>

      {/* 2. THE STORY SECTION (Split Layout) */}
      <section className="py-20 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Images */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/5] w-full max-w-md bg-slate-100 rounded-2xl overflow-hidden shadow-2xl relative z-10">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium border-2 border-dashed border-slate-300 m-4 rounded-xl">
                [Workshop Image 1]
              </div>
            </div>
            {/* Offset decorative image */}
            <div className="hidden sm:block absolute -bottom-12 -right-12 aspect-square w-64 bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border-8 border-white z-20">
              <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-medium">
                [Leather Detail]
              </div>
            </div>
          </div>

          {/* Right Side: Text */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              A Legacy of <span className="text-amber-600">Uncompromising</span>{" "}
              Quality.
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
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

            <div className="mt-10 border-l-4 border-amber-500 pl-6 py-2">
              <p className="text-xl font-bold text-slate-900 italic">
                "We don't just make clothing. We make heirlooms meant to be
                passed down to the next generation."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR PILLARS (Grid Section) */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              The RS Leathers Standard
            </h2>
            <p className="text-lg text-slate-600">
              The core principles that guide every cut, stitch, and finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Scissors className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Master Artistry
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Hand-cut patterns and precision stitching ensure a flawless fit
                and unmatched attention to detail.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Built for Life
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Reinforced seams and heavy-duty YKK hardware guarantee your gear
                survives whatever you throw at it.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Ethical Sourcing
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We partner exclusively with environmentally conscious tanneries
                that treat their workers and materials with respect.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Timeless Design
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We ignore fleeting fast-fashion trends in favor of classic
                silhouettes that look incredible in any decade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="bg-slate-900 text-white py-20 text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Ready to experience the difference?
          </h2>
          <p className="text-lg text-slate-400 mb-10">
            Explore our latest collection and find the piece that will accompany
            you for the rest of your life.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold py-4 px-10 rounded-lg transition-transform hover:-translate-y-1 shadow-lg shadow-amber-500/20"
          >
            Shop the Collection <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
