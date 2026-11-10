"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

// Illustrative example data only: shows how the dispatch workflow looks, not real results.
const loads = [
  { lane: "Atlanta, GA → Charlotte, NC", eq: "26 ft box truck · liftgate", miles: 245, status: "Pending your OK" },
  { lane: "Charlotte, NC → Richmond, VA", eq: "26 ft box truck", miles: 290, status: "Negotiating" },
  { lane: "Richmond, VA → Atlanta, GA", eq: "26 ft box truck · liftgate", miles: 530, status: "Searching backhaul" },
];
const week = [62, 80, 74, 90, 58, 0, 0]; // % loaded miles, illustrative
const days = ["M", "T", "W", "T", "F", "S", "S"];

/** Example owner-operator dispatch view. Clearly labelled as illustrative. */
export default function OperatorDashboard() {
  const reduce = useReducedMotion();
  const [approved, setApproved] = useState<number[]>([]);

  return (
    <div className="relative overflow-hidden rounded-[1.6rem] border border-white/60 bg-white shadow-[0_50px_120px_-30px_rgba(80,4,8,0.55)]">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-steel">Your dispatch desk</p>
        <span className="rounded-full bg-blush px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-red">Example view</span>
      </div>

      <div className="grid gap-px bg-line lg:grid-cols-[1.4fr_1fr]">
        {/* Load board */}
        <div className="bg-white p-5 sm:p-6">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-steel">Loads your dispatcher found</p>
          <ul className="mt-4 space-y-3">
            {loads.map((l, i) => {
              const ok = approved.includes(i);
              return (
                <motion.li
                  key={l.lane}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduce ? 0 : 0.15 * i, duration: 0.5 }}
                  className={`flex flex-col gap-3 rounded-xl border p-4 transition sm:flex-row sm:items-center ${ok ? "border-emerald-500/40 bg-emerald-50" : "border-line bg-fog/60"}`}
                >
                  <div className="flex-1">
                    <p className="font-display text-base font-semibold uppercase tracking-wide text-ink">{l.lane}</p>
                    <p className="mt-0.5 text-xs text-steel">{l.eq} · ~{l.miles} mi</p>
                  </div>
                  {i === 0 ? (
                    <button
                      type="button"
                      onClick={() => setApproved((a) => (ok ? a.filter((x) => x !== i) : [...a, i]))}
                      className={`rounded-lg px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider transition ${ok ? "bg-emerald-500 text-white" : "bg-red-gradient text-white shadow-md shadow-red/25 hover:-translate-y-0.5"}`}
                    >
                      {ok ? "✓ Approved" : "Approve load"}
                    </button>
                  ) : (
                    <span className="rounded-lg border border-line px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-steel">{l.status}</span>
                  )}
                </motion.li>
              );
            })}
          </ul>
          <p className="mt-4 text-xs text-steel">Nothing gets booked until you approve it. Try the button.</p>
        </div>

        {/* Loaded-miles chart + paperwork */}
        <div className="space-y-px bg-line">
          <div className="bg-white p-5 sm:p-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-steel">Loaded vs empty miles</p>
            <div className="mt-5 flex h-32 items-stretch gap-2.5">
              {week.map((v, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center gap-2">
                  <div className="relative w-full flex-1 overflow-hidden rounded-md bg-fog">
                    <motion.div
                      className="absolute inset-x-0 bottom-0 rounded-md bg-red-gradient"
                      initial={{ height: reduce ? `${v}%` : 0 }}
                      whileInView={{ height: `${v}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                    />
                  </div>
                  <span className="text-[0.65rem] font-bold text-steel">{days[i]}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[0.65rem] text-steel">Illustrative numbers. Goal: fewer empty miles, planned backhauls.</p>
          </div>
          <div className="bg-white p-5 sm:p-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-steel">Paperwork handled</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {["Broker setup packet", "Rate confirmation", "BOL on file", "POD sent"].map((x) => (
                <li key={x} className="flex items-center gap-2 rounded-lg bg-fog px-3 py-2.5 text-graphite">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-gradient text-[0.6rem] text-white">✓</span>{x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
