import Image from "next/image";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "How Are You Doing Today?",
  description:
    "A Companion to Reclaim Your Authentic Life. Through 60 soulful questions, illuminate the path for the spiritual warrior within you.",
};

const testimonials = [
  {
    quote:
      "This book is a gentle revolution. Boon doesn't lecture, he invites. Every page is a pause, a breath, a mirror. I frequently stopped and breathed to contemplate the ideas. I didn't find answers there, I found better questions. And in them, I found myself.",
    name: "Walid Aboulnaga",
    title: "Founder, NAFAS Journeys",
  },
  {
    quote:
      "To think is to confront oneself. Through the multitude of things we encounter, we are granted moments of introspection. This book offers just such an opportunity — and it is timely and urgent.",
    name: "Minako Suematsu",
    title: "Chairperson & Publisher of the Japan Times, Ltd.",
  },
  {
    quote:
      "Reading this felt like a spiritual retreat in written form. The questions are deceptively simple, yet they lead you to places you may have forgotten or never dared to explore. Truly beautiful!",
    name: "Karsten Warrink",
    title: "CEO, Ambermedia · President, Entrepreneurs Organisation, Europe Bridge",
  },
  {
    quote:
      "As a comedian, I've made a career out of observing life. This book made life observes me back. Like a good joke: the set up sounds ordinary, but the punchline lands deep in the soul — and just uncomfortable enough to be truly healing.",
    name: "Harith Iskander",
    title: "Celebrity Comedian / Leadership & Culture Advisor, Pemalyst Sdn Bhd",
  },
];

export default function HowAreYouDoingPage() {
  return (
    <div className="bg-brand-cream">
      {/* ─── Hero ────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        {/* Centered heading above the grid */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl text-brand-brown leading-tight mb-4">
            How Are You Doing Today?
          </h1>
          <p className="text-brand-brown/70 italic mb-6">
            A Companion to Reclaim Your Authentic Life
          </p>
          <p className="font-bold text-brand-brown">
            Foreword by Wilson Pranoto,
            <br />
            founder of <em>Journey of Humanity</em>
          </p>
        </div>

        {/* Two-column grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Book mockup — fills the column */}
          <div className="flex justify-center">
            <Image
              src="/images/474399_f6345447f5234defaac5c82c97bcccf1~mv2.png"
              alt="How Are You Doing Today? — 3D book mockup"
              width={414}
              height={622}
              className="w-full max-w-sm md:max-w-none h-auto shadow-2xl"
              priority
            />
          </div>

          {/* Text */}
          <div>
            <p className="text-brand-brown/70 leading-relaxed mb-6">
              <em>How Are You Doing Today?</em> illuminates the path for the
              spiritual warrior in you to be connected with who you really are.
            </p>
            <div className="italic text-brand-brown/70 space-y-1 mb-6">
              <p>Your energy creates your reality.</p>
              <p>The greatest love is self-love.</p>
              <p>There are no coincidences in life.</p>
              <p>Everything is right sometimes.</p>
            </div>
            <p className="text-brand-brown/70 leading-relaxed text-sm mb-8">
              Through a series of simple, reflective questions, you are invited
              to meet the raw, unadorned experience of being alive. Everything
              you need to know is already implied in your own journey. This book
              opens that gate of remembrance to your authentic self &mdash; and
              for you to shine as you are meant to be.
            </p>

            {/* Purchase */}
            <p className="font-serif text-2xl font-bold tracking-widest text-brand-brown text-center mb-6">
              PURCHASE NOW
            </p>
            <div className="flex flex-row gap-6 justify-center items-start mb-6">
              {/* Amazon Kindle — solid teal button matching live site */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-brand-gray/80">*e-book</span>
                <a
                  href="https://www.amazon.com/dp/B0FFHKS19F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-44 h-16 bg-[#417586] hover:opacity-90 transition-opacity duration-200"
                >
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex items-baseline gap-0">
                      <span className="text-white font-black leading-none" style={{ fontSize: "20px" }}>
                        amazon
                      </span>
                      <span className="text-[#FF9900] font-black leading-none" style={{ fontSize: "20px" }}>
                        kindle
                      </span>
                    </div>
                    {/* Amazon smile arrow */}
                    <svg viewBox="0 0 80 10" width="68" height="8" fill="none" aria-hidden="true">
                      <path d="M4 7 Q20 2 40 4 Q60 6 74 2" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" fill="none"/>
                      <path d="M70 1 L75 3 L70 5.5" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>
                </a>
              </div>
              {/* PayPal — white button with teal border matching live site */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-brand-gray/80">*physical book</span>
                <a
                  href="https://www.paypal.com/ncp/payment/4YMFARPNQPHCU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center w-44 h-16 bg-white border-[5px] border-[#6298AA] hover:opacity-90 transition-opacity duration-200"
                >
                  <Image
                    src="/images/paypal.png"
                    alt="PayPal"
                    fill
                    className="object-contain p-3"
                    sizes="176px"
                  />
                </a>
              </div>
            </div>
            <p className="text-xs text-brand-gray/80 leading-relaxed">
              Free delivery for Singapore and Malaysia.
              <br />
              (Charges apply at cost for other countries).
              <br />
              We will be in touch to arrange delivery details.
            </p>
          </div>
        </div>
      </section>

      {/* ─── About the Book ──────────────────────────────────── */}
      <section className="py-16 px-6 bg-brand-cream-alt">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-brand-brown mb-4">
            Are you ready to stop wandering and come home to yourself?
          </h2>
          <span className="accent-rule" />
          <p className="text-brand-brown/70 leading-relaxed mt-6">
            In a world of noise and distraction, <em>How Are You Doing Today?</em>{" "}
            is a sacred pause — a gentle, powerful companion designed to
            reconnect with your truest self. Through 60 soulful questions,
            inspired by the learnings in Journey of Humanity course, this book
            illuminates the path for the spiritual warrior within you. It&rsquo;s not
            about fixing yourself; it&rsquo;s about remembering who you&rsquo;ve always been.
          </p>
        </div>
      </section>

      {/* ─── Why 60 Questions ────────────────────────────────── */}
      <section className="py-16 px-6 bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-brand-brown mb-8 text-center">
            Why 60 questions?
          </h2>
          <p className="text-brand-brown/70 leading-relaxed mb-8 text-center">
            Because transformation happens in the small moments. Forget
            overwhelming spiritual theories or rigid routines. This book meets
            you exactly where you are — with a single, tender question designed to:
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Awaken Authentic Awareness",
                body: `Cut through the clutter of your mind. Questions like "What energy do you bring home today?" or "What legacy have you created today?" reveal what is truly alive in you.`,
              },
              {
                title: "Reclaim Your Inner Voice",
                body: "Move beyond advice-giving gurus. Your answers — raw, honest, and unfiltered — become the map back to your intuition.",
              },
              {
                title: "Integrate Spirituality Into Reality",
                body: `Ground lofty ideas like "meaning" and "authenticity" into your daily choices, relationships, and challenges`,
              },
              {
                title: "Honour Your Journey",
                body: "Your responses create a living journal of growth. Look back and witness your own evolution — a testament to your courage.",
              },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="p-6 bg-brand-cream-alt border-l-2 border-brand-red"
              >
                <h3 className="font-serif text-lg text-brand-brown mb-2">
                  {title}
                </h3>
                <p className="text-sm text-brand-brown/65 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What Makes It Different + Perfect For ───────────── */}
      <section className="py-16 px-6 bg-brand-cream-alt">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-10">
          <div>
            <h2 className="font-serif text-2xl text-brand-brown mb-6">
              What Makes This Book Different?
            </h2>
            <ul className="space-y-3 text-sm text-brand-brown/70">
              {[
                "Gentle & Accessible: No spiritual expertise needed. Start exactly as you are.",
                "Active & Personal: You're not reading — you're co-creating your awakening.",
                "Bite-Sized Depth: One question. One story. Profound insight.",
                "Your Private Sanctuary: A judgement-free zone to be vulnerably, powerfully you.",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand-red mt-0.5">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-brand-brown mb-6">
              Perfect For You If:
            </h2>
            <ul className="space-y-3 text-sm text-brand-brown/70">
              {[
                "You crave authenticity but feel lost in roles",
                "You believe in energy work but struggle to live it",
                "You want spirituality without dogma",
                "You’re ready to let life “observe you back”",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand-red mt-0.5">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Begin CTA ───────────────────────────────────────── */}
      <section className="py-14 px-6 bg-brand-cream text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-3xl text-brand-brown mb-4">
            Begin Your Homecoming Today.
          </h2>
          <p className="text-brand-brown/65">
            Your authentic life isn&rsquo;t lost. It&rsquo;s waiting to be remembered.
            You can choose to begin today.
          </p>
        </div>
      </section>

      {/* ─── Testimonials ────────────────────────────────────── */}
      <section className="py-16 px-6 bg-brand-cream-alt">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-8">
            {testimonials.map(({ quote, name, title }) => (
              <blockquote
                key={name}
                className="bg-brand-cream p-6 border-l-2 border-brand-red"
              >
                {/* 5-star rating */}
                <div aria-label="5 out of 5 stars" className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg
                      key={s}
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 text-amber-400"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-brand-brown/75 leading-relaxed italic mb-4">
                  &ldquo;{quote}&rdquo;
                </p>
                <footer>
                  <p className="text-sm font-semibold text-brand-brown">{name}</p>
                  <p className="text-xs text-brand-gray">{title}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About the Author ────────────────────────────────── */}
      <section className="py-16 px-6 bg-brand-cream">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-lg">
              <Image
                src="/images/474399_3e6b7d05fb03411cb22589be55c9bfee~mv2.jpg"
                alt="Boon — Author"
                fill
                className="object-cover"
                sizes="224px"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="text-xs tracking-[0.25em] uppercase text-brand-gray mb-3">
              About The Author
            </p>
            <h2 className="font-serif text-3xl text-brand-brown mb-4">Boon</h2>
            <span className="accent-rule" style={{ margin: "1rem 0" }} />
            <p className="text-brand-brown/70 leading-relaxed text-sm">
              Boon is a self-declared &ldquo;Existential Experimentalist&rdquo; — someone
              who actively questions, probes and redefines what it means to be
              human in a constantly evolving world.
            </p>
            <p className="text-brand-brown/70 leading-relaxed text-sm mt-4">
              Just like the mythical cat with nine different lives, he aspires to
              experience as many different identities as possible, shedding
              himself of any fixed role but integrating all that he could learn.
              He has been a scholar, an entrepreneur (in HR space), a corporate
              leader (with Singapore Airlines), a business consultant, a certified
              trainer, a whisky connoisseur, an M&amp;A advisor, and now an author.
            </p>
            <p className="text-brand-brown/70 leading-relaxed text-sm mt-4">
              And just like the ephemeral butterfly that flutters around to sip
              nectar without knowing its pollen-bearing destiny, he believes he
              is here to fulfil his life mission simply by striving whatever that
              stirs his heart. Thus, after being thrown off the last mountain
              &mdash; by busting a business &mdash; he now lives to help others
              to craft a meaningful life.
            </p>
            <p className="text-brand-brown/70 leading-relaxed text-sm mt-4">
              He currently runs a social venture under the banner of
              thecatandbutterfly.com with a mission to bring people from
              different background around the world to share the common stories
              of humanity. Producing these various books is one of such paths.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Join Our Journey ────────────────────────────────── */}
      <section className="py-16 px-6 bg-brand-cream-alt text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="font-serif text-3xl text-brand-brown mb-4">
            Join Our Journey
          </h2>
          <span className="accent-rule" />
          <ul className="space-y-2 text-sm text-brand-brown/70 my-8">
            <li>Preview on the latest books</li>
            <li>Invitation to private book events</li>
            <li>Join our community of change-makers</li>
          </ul>
          <ContactForm
            buttonLabel="Sign Up"
            successMessage="Thank you for joining us! We'll be in touch!"
          />
        </div>
      </section>
    </div>
  );
}
