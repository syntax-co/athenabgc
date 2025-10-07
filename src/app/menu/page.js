import Header from "@/components/header";
import menuData from "@/json_files/menu.json";
import { withPrefix } from "@/lib/prefix";

export default function AbgcMenuPage() {
  const categories = menuData;

  return (
    <main className="min-h-screen bg-primary text-foreground ">
        
        <Header />

        <div className="h-[80vh] w-full bg-fixed
            flex flex-col bg-center bg-cover"
            style={{
                backgroundImage:`url(${withPrefix('images/tavern.webp')})`
            }}
            >


            <div className=" text-background font-display mt-auto
            flex justify-center
            
            text-[20vw]
            md:text-[16vw]
            lg:text-[13vw]
            xl:text-[10vw]
            
            "
            >
                
                <div className="w-5/6"
                >
                    Menu
                </div>
            </div>

        </div>

        

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 bg-primary relative z-30">

        <nav className="mb-6 flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="inline-flex items-center text-background rounded-xl border px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition">
              {c.label}
            </a>
          ))}
        </nav>

        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-24 py-8">
            <div className="mb-4">
              <h2 className="text-2xl text-background font-display">{cat.label}</h2>
              {cat.subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{cat.subtitle}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.items.map((item, idx) => (
                <MenuCard key={idx} name={item.name} price={item.price} desc={item.desc} />
              ))}
            </div>
          </section>
        ))}

        <div className="mt-12 rounded-2xl border p-5 md:p-6 bg-card">
          <h3 className="text-xl font-display">Gaming Fee</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            $10 per person includes a cold drink or tea and access to 450+ games for the day.
          </p>
        </div>
      </section>
    </main>
  );
}

function MenuCard({ name, price, desc }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-lg font-medium leading-tight">{name}</h4>
        <span className="shrink-0 rounded-full border px-2.5 py-1 text-sm tabular-nums">
          {price > 0 ? `$${price.toFixed(2)}` : "Included"}
        </span>
      </div>
      {desc && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>}
    </div>
  );
}

function ByobPill() {
  return (
    <a
      href="/byob"
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs md:text-sm hover:bg-accent hover:text-accent-foreground transition"
      title="BYOB info"
    >
      <span className="i-lucide-wine glass size-3.5" aria-hidden />
      BYOB ($2 per person)
    </a>
  );
}
