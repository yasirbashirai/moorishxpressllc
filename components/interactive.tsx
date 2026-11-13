"use client";

import Image from "next/image";
import SmartLink from "./SmartLink";
import { useState } from "react";
import { regions, trucks } from "@/lib/site";
import { IconArrow, IconCheck, IconHeadset, IconTruck } from "./icons";

/* ------------------------------------------------------------------ */
/* Audience switch: routes shippers/brokers and owner-operators to     */
/* the right offer in one click.                                       */
/* ------------------------------------------------------------------ */

const audiences = [
  {
    id: "ship",
    tab: "I have freight to move",
    Icon: IconTruck,
    title: "Shippers & freight brokers",
    text: "You need a reliable box truck carrier that answers the phone, shows up on time and keeps you updated. We run our own 26 ft box trucks out of Atlanta, so you deal directly with the carrier.",
    bullets: ["Direct carrier, not a middleman", "Class B CDL (33,000 lb GVWR) + non-CDL (26,000 lb GVWR) box trucks", "Tuck-under liftgate and air-ride suspension on every truck", "Carrier setup packet ready for brokers"],
    cta: { href: "/contact#quote", label: "Get a Freight Quote" },
    variant: "red" as const,
  },
  {
    id: "drive",
    tab: "I own a truck",
    Icon: IconHeadset,
    title: "Owner-operators & small fleets",
    text: "You want steady loads at fair rates without spending your day on load boards and broker calls. We dispatch box trucks, hotshots, flatbeds, reefers and dry vans. We are a carrier too, so we dispatch with a driver's point of view.",
    bullets: ["Loads that fit your truck and lanes", "Rate negotiation on every load", "Broker setup and paperwork handled", "You approve every load, always"],
    cta: { href: "/dispatch#signup", label: "Dispatch My Truck" },
    variant: "gold" as const,
  },
];

export function AudienceSwitch() {
  const [active, setActive] = useState(0);
  const a = audiences[active];
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-2xl shadow-ink/10">
      <div className="grid grid-cols-2 bg-fog p-1.5" role="tablist">
        {audiences.map((x, i) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-4 font-display text-sm font-semibold uppercase tracking-wider transition sm:text-base ${active === i ? (i === 0 ? "bg-red-gradient text-white" : "bg-white text-red ring-2 ring-red") : "text-graphite hover:text-red"}`}
          >
            <x.Icon className="h-5 w-5" />{x.tab}
          </button>
        ))}
      </div>
      <div key={a.id} className="grid gap-8 p-7 sm:p-10 md:grid-cols-2" style={{ animation: "drive .6s cubic-bezier(.2,.8,.2,1) both" }}>
        <div>
          <h3 className="text-3xl font-bold uppercase leading-tight">{a.title}</h3>
          <p className="mt-4 leading-relaxed text-steel">{a.text}</p>
          <SmartLink
            href={a.cta.href}
            className={`group mt-7 inline-flex items-center gap-2 rounded-md px-7 py-4 font-display font-semibold uppercase tracking-wider transition hover:-translate-y-0.5 ${a.variant === "red" ? "bg-red-gradient text-white shadow-lg shadow-red/30" : "bg-white text-red ring-2 ring-red shadow-lg shadow-red/15"}`}
          >
            {a.cta.label}<IconArrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </SmartLink>
        </div>
        <ul className="space-y-3 self-center">
          {a.bullets.map((b) => (
            <li key={b} className="flex items-center gap-3 rounded-lg bg-fog px-4 py-3.5 font-medium text-graphite">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${a.variant === "red" ? "bg-red-gradient text-white" : "bg-blush text-red ring-1 ring-red/20"}`}>
                <IconCheck className="h-4 w-4" />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Truck spec toggle: compares the CDL 33,000 lb unit with the non-CDL */
/* 26,000 lb units, with an animated GVWR gauge.                        */
/* ------------------------------------------------------------------ */

export function TruckSpecs() {
  const [id, setId] = useState<string>(trucks[0].id);
  const t = trucks.find((x) => x.id === id)!;
  const pct = Math.round((t.gvwr / 33000) * 100);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className="relative">
        <div className="absolute -inset-4 -z-10 rounded-3xl bg-white opacity-20 blur-2xl" />
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <Image src="/images/moorish-box-truck.jpg" alt="MOORISH XPRESS LLC 26 ft box truck with tuck-under liftgate at a loading dock" width={1122} height={395} className="h-auto w-full" />
          <div className="absolute left-4 top-4 rounded-md bg-white/90 px-3 py-1.5 font-display text-xs uppercase tracking-widest text-red backdrop-blur">Our truck · Atlanta, GA</div>
        </div>
        {/* GVWR gauge */}
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-end justify-between">
            <span className="eyebrow text-white/60">Gross vehicle weight rating</span>
            <span className="font-display text-4xl font-bold text-white">{t.gvwr.toLocaleString()} lb</span>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-white transition-all duration-700 ease-out" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-xs text-white/50"><span>0</span><span>26,000 lb non-CDL limit</span><span>33,000</span></div>
        </div>
      </div>

      <div>
        <div className="inline-grid grid-cols-2 gap-1 rounded-lg bg-white/10 p-1">
          {trucks.map((x) => (
            <button
              key={x.id}
              onClick={() => setId(x.id)}
              className={`rounded-md px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wider transition ${id === x.id ? "bg-white text-red" : "text-white/70 hover:text-white"}`}
            >
              {x.id === "cdl" ? "Class B CDL" : "Non-CDL"}
            </button>
          ))}
        </div>
        <p className="eyebrow mt-8 text-white/80">{t.badge}</p>
        <h3 className="mt-2 text-4xl font-bold uppercase text-white">{t.name}</h3>
        <p className="mt-4 text-lg leading-relaxed text-white/70">{t.summary}</p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {t.specs.map((s) => (
            <li key={s} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white">
              <IconCheck className="h-5 w-5 text-white" />{s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Coverage map: Atlanta hub with animated lanes out to the regions we */
/* serve. Positions are a simple lon/lat projection, not a GIS map.    */
/* ------------------------------------------------------------------ */

const project = (lon: number, lat: number) => ({ x: (lon + 126) * 20, y: (50 - lat) * 34 });
const hub = project(-84.39, 33.75);
const cities = [
  { name: "Charlotte", lon: -80.84, lat: 35.23, region: "Southeast" },
  { name: "Nashville", lon: -86.78, lat: 36.16, region: "Southeast" },
  { name: "Jacksonville", lon: -81.66, lat: 30.33, region: "Southeast" },
  { name: "Dallas", lon: -96.8, lat: 32.78, region: "South & Texas" },
  { name: "Houston", lon: -95.37, lat: 29.76, region: "South & Texas" },
  { name: "Oklahoma City", lon: -97.52, lat: 35.47, region: "South & Texas" },
  { name: "New Orleans", lon: -90.07, lat: 29.95, region: "South & Texas" },
  { name: "Richmond", lon: -77.44, lat: 37.54, region: "Mid-Atlantic & Northeast" },
  { name: "Philadelphia", lon: -75.17, lat: 39.95, region: "Mid-Atlantic & Northeast" },
  { name: "New York", lon: -74.0, lat: 40.71, region: "Mid-Atlantic & Northeast" },
  { name: "Chicago", lon: -87.63, lat: 41.88, region: "Midwest" },
  { name: "Indianapolis", lon: -86.16, lat: 39.77, region: "Midwest", end: true },
  { name: "Columbus", lon: -82.99, lat: 39.96, region: "Midwest" },
  { name: "Detroit", lon: -83.05, lat: 42.33, region: "Midwest" },
  { name: "Los Angeles, CA", lon: -118.24, lat: 34.05, region: "West Coast & Southwest", below: true },
  { name: "San Francisco, CA", lon: -122.42, lat: 37.77, region: "West Coast & Southwest", below: true },
  { name: "Phoenix, AZ", lon: -112.07, lat: 33.45, region: "West Coast & Southwest" },
  { name: "Albuquerque, NM", lon: -106.65, lat: 35.08, region: "West Coast & Southwest", below: true },
  { name: "Portland, OR", lon: -122.68, lat: 45.52, region: "West Coast & Southwest", below: true },
  { name: "Seattle, WA", lon: -122.33, lat: 47.61, region: "West Coast & Southwest", below: true },
].map((c: { name: string; lon: number; lat: number; region: string; end?: boolean; below?: boolean }) => ({ ...c, ...project(c.lon, c.lat) }));

export function CoverageMap() {
  const [region, setRegion] = useState<string>("All");
  const on = (r: string) => region === "All" || region === r;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="space-y-2 lg:col-span-2">
        {["All", ...regions.map((r) => r.name)].map((name) => {
          const r = regions.find((x) => x.name === name);
          const active = region === name;
          return (
            <button
              key={name}
              onClick={() => setRegion(name)}
              className={`block w-full rounded-lg border p-4 text-left transition ${active ? "border-red bg-white shadow-lg shadow-red/10" : "border-line bg-white/70 hover:border-steel"}`}
            >
              <span className="flex items-center justify-between font-display text-lg font-semibold uppercase tracking-wide">
                {name === "All" ? "All lanes from Atlanta" : name}
                <span className={`h-3 w-3 rounded-full ${active ? "bg-red" : "bg-line"}`} />
              </span>
              {r && (
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {r.states.map((s) => (
                    <span key={s} className={`rounded px-2 py-0.5 text-xs font-bold ${active ? "bg-red text-white" : "bg-fog text-steel"}`}>{s}</span>
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-line bg-white bg-dots lg:col-span-3">
        <svg viewBox="20 40 1125 680" className="h-full w-full" role="img" aria-label="Nationwide lanes from Atlanta to the Southeast, South, Midwest, Northeast and West Coast">
          {cities.map((c) => {
            const mx = (hub.x + c.x) / 2;
            const my = (hub.y + c.y) / 2 - Math.max(40, Math.abs(hub.x - c.x) * 0.22);
            return (
              <path
                key={`l-${c.name}`}
                d={`M${hub.x},${hub.y} Q${mx},${my} ${c.x},${c.y}`}
                fill="none"
                stroke={on(c.region) ? "#d7141a" : "#d9dbe0"}
                strokeWidth={on(c.region) ? 2.5 : 1.5}
                strokeDasharray="8 4"
                className={on(c.region) ? "animate-dash" : ""}
                style={{ transition: "stroke .4s" }}
              />
            );
          })}
          {cities.map((c) => (
            <g key={c.name} style={{ opacity: on(c.region) ? 1 : 0.3, transition: "opacity .4s" }}>
              <circle cx={c.x} cy={c.y} r={6} fill="#d7141a" />
              <circle cx={c.x} cy={c.y} r={2.5} fill="#ffffff" />
              <text x={c.below ? c.x - 8 : c.end ? c.x - 12 : c.x + 12} y={c.below ? c.y + 26 : c.y + 6} textAnchor={c.end ? "end" : "start"} fontSize="19" fontWeight="600" fill="#2a2c33" fontFamily="Inter, sans-serif">{c.name}</text>
            </g>
          ))}
          {/* Atlanta hub */}
          <circle cx={hub.x} cy={hub.y} r={30} fill="#d7141a" opacity="0.15">
            <animate attributeName="r" values="18;42;18" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx={hub.x} cy={hub.y} r={11} fill="#d7141a" stroke="#fff" strokeWidth="4" />
          <text x={hub.x - 40} y={hub.y + 40} fontSize="20" fontWeight="700" fill="#0c0c0e" fontFamily="Oswald, sans-serif">ATLANTA HQ</text>
        </svg>
      </div>
    </div>
  );
}

/** Endless keyword ticker. Doubles the list so the loop is seamless. */
export function Marquee({ items, size = "md", className = "py-4" }: { items: string[]; size?: "sm" | "md" | "xl"; className?: string }) {
  const text = size === "xl" ? "gap-3 px-3 text-[clamp(0.85rem,2.25vw,2.125rem)] font-bold leading-none tracking-tight" : size === "sm" ? "gap-4 px-4 text-xs font-semibold tracking-wider" : "gap-6 px-6 text-xl font-semibold tracking-wider";
  const dot = size === "md" ? "h-2 w-2" : "h-1.5 w-1.5";
  // The list is rendered twice and slides by exactly half its width, so the loop never jumps.
  return (
    <div className={`overflow-hidden bg-red-gradient ${className}`}>
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((t, i) => (
          <span key={i} aria-hidden={i >= items.length} className={`flex shrink-0 items-center whitespace-nowrap font-display uppercase text-white ${text}`}>
            {t}<span className={`${dot} rotate-45 bg-white`} />
          </span>
        ))}
      </div>
    </div>
  );
}
