"use client";
import { useEffect, useMemo, useState } from "react";

/** @typedef {{ id:string, title:string, start:string, end?:string, location?:string, url?:string, tags?:string[], description?:string }} EventItem */

const API_BASE = "/api/events"; // swap with your real endpoint when ready

export default function EventsAdminPanel() {
  const [events, setEvents] = useState(/** @type {EventItem[]} */([]));
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(/** @type {EventItem|null} */(null));
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load events from API (with localStorage fallback)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API_BASE, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        if (!cancelled) setEvents(Array.isArray(data) ? data : []);
        localStorage.setItem("abgc_events_cache", JSON.stringify(data));
      } catch (e) {
        const cached = localStorage.getItem("abgc_events_cache");
        if (cached && !cancelled) setEvents(JSON.parse(cached));
        if (!cancelled) setError("Showing cached events. API unavailable.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => filterEvents(events, query), [events, query]);

  function onCreate() {
    setEditing({ id: "", title: "", start: new Date().toISOString(), end: "", location: "", url: "", tags: [], description: "" });
    setShowForm(true);
  }
  function onEdit(item) {
    setEditing(item);
    setShowForm(true);
  }
  async function onDelete(id) {
    if (!confirm("Delete this event?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (e) {
      // Local fallback
      const next = events.filter((e) => e.id !== id);
      setEvents(next);
      localStorage.setItem("abgc_events_cache", JSON.stringify(next));
    } finally {
      setLoading(false);
    }
  }
  async function onSave(item) {
    setLoading(true);
    setError("");
    try {
      let payload = normalizeEvent(item);
      let next;
      if (!payload.id) {
        payload.id = cryptoRandomId();
        const res = await fetch(API_BASE, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error("Create failed");
        next = [...events, payload];
      } else {
        const res = await fetch(`${API_BASE}/${encodeURIComponent(payload.id)}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error("Update failed");
        next = events.map((e) => (e.id === payload.id ? payload : e));
      }
      setEvents(next);
      localStorage.setItem("abgc_events_cache", JSON.stringify(next));
      setShowForm(false);
      setEditing(null);
    } catch (e) {
      // Local fallback (offline)
      let payload = normalizeEvent(item);
      if (!payload.id) payload.id = cryptoRandomId();
      const next = events.some((e) => e.id === payload.id)
        ? events.map((e) => (e.id === payload.id ? payload : e))
        : [...events, payload];
      setEvents(next);
      localStorage.setItem("abgc_events_cache", JSON.stringify(next));
      setShowForm(false);
      setEditing(null);
      setError("Saved locally (offline). Sync when API is ready.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-display tracking-tight">Events Admin</h2>
          <p className="mt-1 text-gray-400 text-sm">Create, edit, and publish events.</p>
          {error && <p className="mt-2 text-amber-400 text-sm">{error}</p>}
        </div>
        <button onClick={onCreate} className="rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm hover:bg-gray-800">New Event</button>
      </header>

      <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          aria-label="Search events"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, tag, or location"
          className="w-full sm:w-96 rounded-xl border border-gray-800 bg-gray-900/70 px-4 py-2.5 text-sm outline-none placeholder:text-gray-500 focus:border-gray-700"
        />
        <span className="text-xs text-gray-500">{filtered.length} result{filtered.length === 1 ? "" : "s"}</span>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-950 text-gray-400">
            <tr>
              <Th>Title</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th className="hidden md:table-cell">Location</Th>
              <Th className="hidden md:table-cell">Tags</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">No events found.</td>
              </tr>
            )}
            {filtered.map((e) => (
              <tr key={e.id} className="border-t border-gray-800">
                <Td>{e.title}</Td>
                <Td>{formatDate(new Date(e.start))}</Td>
                <Td>{formatTime(new Date(e.start))}{e.end ? `–${formatTime(new Date(e.end))}` : ""}</Td>
                <Td className="hidden md:table-cell">{e.location || "—"}</Td>
                <Td className="hidden md:table-cell">{(e.tags || []).join(", ")}</Td>
                <Td>
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(e)} className="rounded-lg border border-gray-800 px-2.5 py-1 hover:bg-gray-900">Edit</button>
                    <button onClick={() => onDelete(e.id)} className="rounded-lg border border-gray-800 px-2.5 py-1 text-red-300 hover:bg-gray-900">Delete</button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <Modal onClose={() => { setShowForm(false); setEditing(null); }}>
          <EventForm
            initial={editing || undefined}
            onCancel={() => { setShowForm(false); setEditing(null); }}
            onSave={onSave}
          />
        </Modal>
      )}

      {loading && <Spinner />}
    </div>
  );
}

function Th({ children, className = "" }) {
  return <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${className}`}>{children}</th>;
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}

function Modal({ children, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-gray-800 bg-gray-950 p-4 md:p-6 shadow-2xl">
        {children}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-full border border-gray-800 bg-gray-950 px-3 py-1 text-xs text-gray-300">Saving…</div>
  );
}

function EventForm({ initial, onCancel, onSave }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [date, setDate] = useState(toInputDate(initial?.start));
  const [startTime, setStartTime] = useState(toInputTime(initial?.start));
  const [endTime, setEndTime] = useState(toInputTime(initial?.end));
  const [location, setLocation] = useState(initial?.location || "");
  const [url, setUrl] = useState(initial?.url || "");
  const [tags, setTags] = useState((initial?.tags || []).join(", "));
  const [description, setDescription] = useState(initial?.description || "");

  const [err, setErr] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!title.trim()) return setErr("Title is required.");
    if (!date) return setErr("Date is required.");
    const start = combineDateTime(date, startTime || "00:00");
    const end = endTime ? combineDateTime(date, endTime) : "";

    /** @type {EventItem} */
    const item = {
      id: initial?.id || "",
      title: title.trim(),
      start,
      end: end || undefined,
      location: location.trim() || undefined,
      url: url.trim() || undefined,
      tags: parseTags(tags),
      description: description.trim() || undefined,
    };
    onSave(item);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-display">{initial?.id ? "Edit Event" : "New Event"}</h2>

      {err && <p className="text-sm text-amber-400">{err}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3 py-2 outline-none" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3 py-2 outline-none" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Start Time</label>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3 py-2 outline-none" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">End Time</label>
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3 py-2 outline-none" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3 py-2 outline-none" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">URL (optional)</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3 py-2 outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-gray-400 mb-1">Tags (comma separated)</label>
          <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3 py-2 outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-gray-400 mb-1">Description</label>
          <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-xl border border-gray-800 bg-gray-900 px-3 py-2 outline-none" />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="rounded-xl border border-gray-800 px-4 py-2 text-sm hover:bg-gray-900">Cancel</button>
        <button type="submit" className="rounded-xl border border-gray-800 bg-gray-100 text-black px-4 py-2 text-sm hover:bg-white">Save</button>
      </div>
    </form>
  );
}

// --- Utilities ---
function filterEvents(list, q) {
  const s = q.trim().toLowerCase();
  if (!s) return list;
  return list.filter((e) =>
    [e.title, e.location, e.description, ...(e.tags || [])]
      .filter(Boolean)
      .some((v) => String(v).toLowerCase().includes(s))
  );
}
function toInputDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function toInputTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
function combineDateTime(dateStr, timeStr) {
  const [y, m, d] = dateStr.split("-").map((n) => parseInt(n, 10));
  const [hh, mm] = timeStr.split(":").map((n) => parseInt(n, 10));
  const dt = new Date(y, (m - 1), d, hh, mm, 0, 0);
  return dt.toISOString();
}
function parseTags(s) {
  return s.split(",").map((t) => t.trim()).filter(Boolean);
}
function normalizeEvent(e) {
  const out = { ...e };
  if (out.end && new Date(out.end) <= new Date(out.start)) delete out.end;
  return out;
}
function cryptoRandomId() {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const buf = new Uint32Array(4);
    crypto.getRandomValues(buf);
    return Array.from(buf).map((n) => n.toString(16).padStart(8, "0")).join("").slice(0, 24);
  }
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
}
function formatDate(d){
  return d.toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"});
}
function formatTime(d){
  return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}