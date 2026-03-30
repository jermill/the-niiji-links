const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://theniijis.com";

type LinkItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image: string | null;
};

// Fallback images when the API doesn't return one
const fallbackImages: Record<string, string> = {
  main: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=1200&auto=format&fit=crop",
  stream:
    "https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=1200&auto=format&fit=crop",
  shop: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
  latest:
    "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1200&auto=format&fit=crop",
  lodge:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  contact:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
};

// Static fallback if API is unreachable
const staticLinks: LinkItem[] = [
  {
    id: "main",
    title: "The Niiji's",
    subtitle: "Aboriginal American Music Collective",
    href: "https://theniijis.com",
    image: null,
  },
  {
    id: "stream",
    title: "The Stream",
    subtitle: "Artist-curated listening",
    href: "https://stream.theniijis.com",
    image: null,
  },
  {
    id: "shop",
    title: "Niiji Supply",
    subtitle: "Merch & goods",
    href: "https://niijisupply.com",
    image: null,
  },
  {
    id: "latest",
    title: "Latest Drop",
    subtitle: "New release",
    href: "https://theniijis.com",
    image: null,
  },
  {
    id: "lodge",
    title: "The Lodge",
    subtitle: "Tribe community",
    href: "https://theniijis.com/lodge",
    image: null,
  },
  {
    id: "contact",
    title: "Contact",
    subtitle: "Bookings & inquiries",
    href: "mailto:sondaeblu@gmail.com",
    image: null,
  },
];

async function getLinks(): Promise<LinkItem[]> {
  try {
    const res = await fetch(`${API_URL}/api/links`, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data = await res.json();
    return data.links || staticLinks;
  } catch {
    return staticLinks;
  }
}

function isExternalLink(href: string) {
  return href.startsWith("http");
}

export default async function Page() {
  const links = await getLinks();

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-md px-4 py-8 sm:py-10">
        <header className="mb-8 text-center">
          <img
            src="/images/logo.png"
            alt="The Niiji's"
            className="mx-auto mb-3 h-16 w-auto"
          />
          <p className="text-sm text-neutral-500">All paths lead here</p>
        </header>

        <section className="space-y-4">
          {links.map((link) => {
            const imageUrl =
              link.image || fallbackImages[link.id] || fallbackImages.main;

            return (
              <a
                key={link.id}
                href={link.href}
                target={isExternalLink(link.href) ? "_blank" : undefined}
                rel={isExternalLink(link.href) ? "noreferrer" : undefined}
                className="group block overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FFF385]/70"
                aria-label={link.title}
              >
                <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-neutral-900">
                  <img
                    src={imageUrl}
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
            );
          })}
        </section>

        <footer className="mt-10 text-center text-xs tracking-[0.2em] text-neutral-600">
          NIJI FLOW
        </footer>
      </main>
    </div>
  );
}
