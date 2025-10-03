'use client'
import Header from "@/components/header";
import { useMemo, useState } from "react";

// --- Types (JS docs style) ---
/** @typedef {{
 *  id: string,
 *  title: string,
 *  start: string, // ISO
 *  end?: string,  // ISO
 *  location?: string,
 *  url?: string,
 *  tags?: string[],
 *  description?: string
 * }} EventItem */

// --- Sample data (HYDRATION-SAFE: fixed ISO strings) ---
/** @type {EventItem[]} */
const INITIAL_EVENTS = [
  {
    id: "ev-1",
    title: "Open Play Night",
    start: "2025-10-01T19:00:00.000Z",
    location: "Athena Board Game Café",
    url: "",
    tags: ["community", "casual"],
    description: "Drop in and play from our library."
  },
  {
    id: "ev-2",
    title: "Cozy RPG One-Shot",
    start: "2025-10-04T18:30:00.000Z",
    location: "Back Room",
    url: "",
    tags: ["rpg"],
    description: "Beginner-friendly roleplaying session."
  },
  {
    id: "ev-3",
    title: "Family Sunday",
    start: "2025-10-07T12:00:00.000Z",
    end:   "2025-10-07T16:00:00.000Z",
    location: "Main Hall",
    tags: ["family", "all-ages"],
  },
];

export default function EventsPage() {
  const [monthCursor, setMonthCursor] = useState(new Date());
  const [query, setQuery] = useState("");
  const [events] = useState(INITIAL_EVENTS);

  const filtered = useMemo(() => filterEvents(events, query), [events, query]);
  const month = useMemo(() => buildMonth(monthCursor), [monthCursor]);

  return (
    <main className="min-h-screen bg-primary text-white">
      <Header />

      <div>

        <div className="h-16" 
        />

        <div className="relative z-30 bg-primary"
        >
          {/* Hero */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(75%_60%_at_50%_0%,rgba(255,255,255,0.08),transparent)]" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 pt-24 sm:pt-12 md:py-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display tracking-tight">Events & Calendar</h1>
              <p className="mt-3 text-gray-300 max-w-2xl text-sm sm:text-base">
                See what@aposs happening at Athena—tournaments, open play, RPG one-shots, and more.
              </p>
              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                
              </div>
            </div>
          </section>

          {/* Mobile layout (list-first) */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 pb-16 md:hidden">
            <MobileMonthNav
              label={month.label}
              onPrev={() => setMonthCursor(addMonths(monthCursor, -1))}
              onNext={() => setMonthCursor(addMonths(monthCursor, 1))}
            />

            <div className="mt-4 space-y-3">
              <MobileEventList month={month} events={filtered} />
            </div>

            {/* Upcoming (mobile) */}
            <div className="mt-10">
              <h2 className="text-lg font-display mb-3">Upcoming Events</h2>
              <div className="space-y-3">
                {filtered
                  .slice()
                  .sort((a, b) => new Date(a.start) - new Date(b.start))
                  .slice(0, 8)
                  .map((e) => (
                    <EventCard key={e.id} event={e} />
                  ))}
              </div>
            </div>
          </section>

          {/* Desktop / tablet layout */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 pb-20 hidden md:block">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
              {/* Calendar */}
              <div className="lg:col-span-3 rounded-2xl border border-gray-800 bg-gray-950/60 backdrop-blur">
                <Calendar
                  month={month}
                  onPrev={() => setMonthCursor(addMonths(monthCursor, -1))}
                  onNext={() => setMonthCursor(addMonths(monthCursor, 1))}
                  events={filtered}
                />
              </div>

              {/* Upcoming */}
              <aside className="lg:col-span-2">
                <h2 className="text-xl font-display mb-3">Upcoming Events</h2>
                <div className="space-y-3">
                  {filtered
                    .slice()
                    .sort((a, b) => new Date(a.start) - new Date(b.start))
                    .slice(0, 10)
                    .map((e) => (
                      <EventCard key={e.id} event={e} />
                    ))}
                </div>
              </aside>
            </div>
          </section>

        </div>
      </div>




    </main>
  );
}

function MobileMonthNav({ label, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-between sticky top-0 z-10 -mx-4 px-4 py-2 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/50">
      <button
        onClick={onPrev}
        className="h-10 rounded-lg border border-gray-800 px-4 text-sm hover:bg-gray-900 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
        aria-label="Previous month"
      >
        Prev
      </button>
      <div className="text-base font-medium">{label}</div>
      <button
        onClick={onNext}
        className="h-10 rounded-lg border border-gray-800 px-4 text-sm hover:bg-gray-900 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
        aria-label="Next month"
      >
        Next
      </button>
    </div>
  );
}

function MobileEventList({ month, events }) {
  // Group events by day within the visible month
  const byDay = useMemo(() => {
    const map = new Map();
    month.days.forEach((d) => {
      const key = ymd(d.date);
      map.set(key, {
        date: d.date,
        isCurrentMonth: d.isCurrentMonth,
        isToday: d.isToday,
        items: [],
      });
    });
    events.forEach((e) => {
      const key = ymd(new Date(e.start));
      if (map.has(key)) map.get(key).items.push(e);
    });
    return Array.from(map.values()).filter((g) => g.items.length > 0);
  }, [month, events]);

  if (!byDay.length) {
    return (
      <div className="rounded-2xl border border-gray-800 bg-gray-950/60 p-4 text-sm text-gray-400">
        No events this month.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {byDay.map((g) => (
        <div key={g.date.toISOString()} className="rounded-2xl border border-gray-800 bg-gray-950/60">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="text-sm font-medium">
              {g.date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
            {g.isToday && (
              <span className="rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] text-black">Today</span>
            )}
          </div>
          <div className="border-t border-gray-800" />
          <ul className="p-3 space-y-2">
            {g.items
              .slice()
              .sort((a, b) => new Date(a.start) - new Date(b.start))
              .map((e) => (
                <li key={e.id}>
                  <a
                    href={e.url || `#${e.id}`}
                    className="block rounded-xl bg-gray-900/60 px-3 py-2 text-sm hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate font-medium leading-tight">{e.title}</div>
                        <div className="mt-0.5 text-gray-400 text-xs">
                          {formatTime(new Date(e.start))}{e.location ? ` • ${e.location}` : ''}
                        </div>
                        {e.description && (
                          <p className="mt-1 text-gray-300 text-xs line-clamp-2">{e.description}</p>
                        )}
                        {e.tags?.length ? (
                          <div className="mt-1 flex flex-wrap gap-1.5">
                            {e.tags.map((t) => (
                              <span key={t} className="rounded-full border border-gray-800 px-2 py-0.5 text-[10px] text-gray-300">{t}</span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      <time className="shrink-0 rounded-md border border-gray-800 bg-gray-900 px-2 py-1 text-[11px] text-gray-300">
                        {new Date(e.start).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </time>
                    </div>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Calendar({ month, onPrev, onNext, events }) {
  const firstRow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          className="h-10 rounded-lg border border-gray-800 px-4 text-sm hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          aria-label="Previous month"
        >
          Prev
        </button>
        <div className="text-lg font-medium">{month.label}</div>
        <button
          onClick={onNext}
          className="h-10 rounded-lg border border-gray-800 px-4 text-sm hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
          aria-label="Next month"
        >
          Next
        </button>
      </div>

      {/* Week header (hidden on very small screens just in case this renders) */}
      <div className="mt-4 grid grid-cols-7 text-xs text-gray-400">
        {firstRow.map((d) => (
          <div key={d} className="p-2 text-center uppercase tracking-wider">{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-px rounded-xl border border-gray-800 bg-gray-800">
        {month.days.map((day) => (
          <div
            key={day.key}
            className={`min-h-[96px] bg-black p-2 ${day.isCurrentMonth ? "" : "opacity-40"}`}
            role="gridcell"
            aria-label={day.date.toDateString()}
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-gray-400">{day.date.getDate()}</span>
              {day.isToday && (
                <span className="rounded-full bg-amber-500/90 px-1.5 py-0.5 text-[10px] text-black">Today</span>
              )}
            </div>
            <div className="mt-1 space-y-1">
              {events
                .filter((e) => isSameDay(new Date(e.start), day.date))
                .slice(0, 3)
                .map((e) => (
                  <a
                    key={e.id}
                    href={e.url || `#${e.id}`}
                    className="block truncate rounded-md bg-gray-900 px-2 py-1 text-[11px] hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
                    title={e.title}
                  >
                    {formatTime(new Date(e.start))} • {e.title}
                  </a>
                ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-500">Showing up to 3 events per day. See the sidebar for more.</p>
    </div>
  );
}

function EventCard({ event }) {
  const start = new Date(event.start);
  const end = event.end ? new Date(event.end) : null;
  return (
    <a
      href={event.url || `#${event.id}`}
      className="block rounded-2xl border border-gray-800 bg-gray-950/60 p-4 hover:bg-gray-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-medium leading-tight truncate">{event.title}</h3>
          <p className="mt-1 text-sm text-gray-400">
            {formatDateRange(start, end)}{event.location ? ` • ${event.location}` : ""}
          </p>
          {event.description && (
            <p className="mt-2 text-sm text-gray-300 line-clamp-2">{event.description}</p>
          )}
          {event.tags?.length ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {event.tags.map((t) => (
                <span key={t} className="rounded-full border border-gray-800 px-2 py-0.5 text-[10px] text-gray-300">{t}</span>
              ))}
            </div>
          ) : null}
        </div>
        <time className="shrink-0 rounded-lg border border-gray-800 bg-gray-900 px-2 py-1 text-xs text-gray-300">
          {start.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
        </time>
      </div>
    </a>
  );
}

// --- Utils ---
function buildMonth(anchor) {
  const year = anchor.getFullYear();
  const month = anchor.getMonth();
  const first = new Date(year, month, 1);
  const start = startOfWeek(first);
  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = addDays(start, i);
    days.push({
      key: d.toISOString(),
      date: d,
      isCurrentMonth: d.getMonth() === month,
      isToday: isSameDay(d, new Date()),
    });
  }
  const label = anchor.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  return { days, label };
}

function filterEvents(list, q) {
  const s = q.trim().toLowerCase();
  if (!s) return list;
  return list.filter((e) =>
    [e.title, e.location, e.description, ...(e.tags || [])]
      .filter(Boolean)
      .some((v) => String(v).toLowerCase().includes(s))
  );
}

function startOfWeek(d) {
  const day = d.getDay();
  const diff = d.getDate() - day; // week starts Sunday
  return new Date(d.getFullYear(), d.getMonth(), diff);
}
function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function addMonths(d, n) { const r = new Date(d); r.setMonth(r.getMonth() + n); return r; }
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function pad2(n) { return String(n).padStart(2, "0"); }
function formatTime(d) { return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`; }
function formatDateRange(start, end) {
  const s = start.toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  if (!end) return s;
  const sameDay = isSameDay(start, end);
  const e = end.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  return sameDay ? `${s} – ${end.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}` : `${s} → ${e}`;
}
function ymd(d) { return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`; }