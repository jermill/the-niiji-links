type LinkItem = {
  title: string;
  subtitle: string;
  href: string;
  image: string;
};

const links: LinkItem[] = [
  {
    title: "The Niiji's",
    subtitle: "Main world",
    href: "https://theniijis.com",
    image:
      "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "The Stream",
    subtitle: "Music platform",
    href: "https://stream.theniijis.com",
    image:
      "https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Niiji Supply",
    subtitle: "Shop",
    href: "https://niijisupply.com",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Latest Drop",
    subtitle: "New release",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "The Lodge",
    subtitle: "Community",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Contact",
    subtitle: "Bookings",
    href: "mailto:sondaeblu@gmail.com",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
  },
];

function isExternalLink(href: string) {
  return href.startsWith("http");
}

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-md px-4 py-8 sm:py-10">
        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF385] text-xl font-semibold text-black shadow-[0_0_30px_rgba(255,243,133,0.15)]">
            N
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            The Niiji&apos;s
          </h1>
          <p className="mt-2 text-sm text-neutral-500">All paths lead here</p>
        </header>

        <section className="space-y-4">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target={isExternalLink(link.href) ? "_blank" : undefined}
              rel={isExternalLink(link.href) ? "noreferrer" : undefined}
              className="group block overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FFF385]/70"
              aria-label={link.title}
            >
              <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-neutral-900">
                <img
                  src={link.image}
                  alt={link.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 transition duration-300 group-hover:bg-black/30" />

                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                    {link.subtitle}
                  </p>
                  <h2 className="text-xl font-semibold text-white">
                    {link.title}
                  </h2>
                </div>

                <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF385] text-sm font-bold text-black shadow-md transition duration-300 group-hover:scale-105">
                  &rarr;
                </div>
              </div>
            </a>
          ))}
        </section>

        <footer className="mt-10 text-center text-xs tracking-[0.2em] text-neutral-600">
          NIJI FLOW
        </footer>
      </main>
    </div>
  );
}
