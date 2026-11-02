"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { IconCheck, IconPhone } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";

/** Posts a lead to /api/lead. Shared by every form on the site. */
async function sendLead(type: string, data: Record<string, string>) {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, ...data }),
  });
  if (!res.ok) throw new Error("send failed");
}

const input =
  "w-full rounded-md border border-line bg-white px-4 py-3 text-ink outline-none transition placeholder:text-steel/60 focus:border-red focus:ring-4 focus:ring-red/10";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-graphite";

function Field({ name, text, children }: { name: string; text: string; children?: React.ReactNode }) {
  return (
    <label htmlFor={name} className="block">
      <span className={label}>{text}</span>
      {children}
    </label>
  );
}

/** Hidden honeypot field: bots fill it, people never see it. */
const Honeypot = () => (
  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden="true" />
);

function Success({ title, text, onReset }: { title: string; text: string; onReset: () => void }) {
  return (
    <div className="py-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-gradient text-white shadow-lg shadow-red/30">
        <IconCheck className="h-8 w-8" />
      </div>
      <h3 className="mt-6 text-3xl font-bold uppercase">{title}</h3>
      <p className="mx-auto mt-3 max-w-sm text-steel">{text}</p>
      <a href={site.phoneHref} className="mt-6 inline-flex items-center gap-2 font-display text-xl font-semibold text-red">
        <IconPhone className="h-5 w-5" />{site.phone}
      </a>
      <button type="button" onClick={onReset} className="mt-6 block w-full text-sm font-semibold text-steel underline">
        Send another request
      </button>
    </div>
  );
}

/** Recommends a truck from weight and liftgate needs (shown live in the quote form). */
export function truckFit(weightLbs: number) {
  if (!weightLbs) return null;
  // Practical payload guides, not legal limits: confirmed per load by dispatch.
  if (weightLbs <= 10000) return { truck: "Non-CDL box truck (26,000 lb GVWR)", note: "Fits our standard box truck. Liftgate and air ride included.", tone: "ok" as const };
  if (weightLbs <= 16000) return { truck: "CDL Class B box truck (33,000 lb GVWR)", note: "Heavier load: our 33,000 lb GVWR truck is the right fit.", tone: "ok" as const };
  return { truck: "Let's talk about this one", note: "This may be more than one box truck can carry. Send it anyway and we will plan it with you.", tone: "warn" as const };
}

/* ------------------------------------------------------------------ */
/* Quote form: 3 quick steps so shippers and brokers give us what we  */
/* need to quote without a back-and-forth phone call.                  */
/* ------------------------------------------------------------------ */

const serviceOptions = ["OTR / long haul", "First mile pickup", "Last mile delivery", "White glove", "Not sure yet"];

export function QuoteForm({ title = "Get a freight quote", dark = false }: { title?: string; dark?: boolean }) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<Record<string, string>>({ role: "Shipper", service: "OTR / long haul", liftgate: "Not sure" });

  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));
  const fit = truckFit(Number(data.weight));
  const steps = ["Your load", "Route & timing", "Contact"];

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < 2) return setStep(step + 1);
    const hp = (e.currentTarget.elements.namedItem("website") as HTMLInputElement)?.value;
    setStatus("sending");
    try {
      await sendLead("quote", { ...data, website: hp, truck: fit?.truck || "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const wrap = `relative rounded-xl p-6 sm:p-8 ${dark ? "bg-white shadow-2xl shadow-black/40" : "border border-line bg-white shadow-xl shadow-ink/5"}`;

  if (status === "sent")
    return (
      <div className={wrap}>
        <Success
          title="Request received"
          text="Thanks. Our dispatch team will review your load and get back to you with a quote shortly. Need it moving right now? Call us."
          onReset={() => { setStatus("idle"); setStep(0); }}
        />
      </div>
    );

  return (
    <form onSubmit={submit} className={wrap} noValidate={false}>
      <Honeypot />
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-2xl font-bold uppercase text-ink">{title}</h3>
        <span className="rounded-full bg-fog px-3 py-1 text-xs font-semibold text-steel">Step {step + 1}/3</span>
      </div>

      {/* Progress */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        {steps.map((s, i) => (
          <div key={s}>
            <div className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? "bg-red-gradient" : "bg-line"}`} />
            <p className={`mt-2 text-[0.7rem] font-semibold uppercase tracking-wider ${i === step ? "text-red" : "text-steel/70"}`}>{s}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {step === 0 && (
          <>
            <div>
              <span className={label}>I am a</span>
              <div className="grid grid-cols-3 gap-2">
                {["Shipper", "Freight broker", "Other"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => set("role", r)}
                    className={`rounded-md border px-2 py-2.5 text-sm font-semibold transition ${data.role === r ? "border-red bg-red/5 text-red" : "border-line text-graphite hover:border-steel"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <Field name="service" text="Service">
              <select id="service" value={data.service} onChange={(e) => set("service", e.target.value)} className={input}>
                {serviceOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field name="weight" text="Total weight (lbs)">
                <input id="weight" type="number" min={0} inputMode="numeric" placeholder="e.g. 8000" value={data.weight || ""} onChange={(e) => set("weight", e.target.value)} className={input} />
              </Field>
              <Field name="pallets" text="Pallets / pieces">
                <input id="pallets" type="number" min={0} inputMode="numeric" placeholder="e.g. 10" value={data.pallets || ""} onChange={(e) => set("pallets", e.target.value)} className={input} />
              </Field>
            </div>
            <div>
              <span className={label}>Liftgate needed?</span>
              <div className="grid grid-cols-3 gap-2">
                {["Yes", "No", "Not sure"].map((r) => (
                  <button key={r} type="button" onClick={() => set("liftgate", r)} className={`rounded-md border px-2 py-2.5 text-sm font-semibold transition ${data.liftgate === r ? "border-red bg-red/5 text-red" : "border-line text-graphite hover:border-steel"}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            {/* Instant truck match */}
            {fit && (
              <div className={`flex gap-3 rounded-md border-l-4 p-4 text-sm ${fit.tone === "ok" ? "border-gold bg-gold/10" : "border-red bg-red/5"}`} aria-live="polite">
                <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-red" />
                <div>
                  <p className="font-semibold text-ink">Instant match: {fit.truck}</p>
                  <p className="mt-1 text-steel">{fit.note}</p>
                </div>
              </div>
            )}
          </>
        )}

        {step === 1 && (
          <>
            <Field name="from" text="Pickup city, state or ZIP">
              <input id="from" required placeholder="e.g. Atlanta, GA 30311" value={data.from || ""} onChange={(e) => set("from", e.target.value)} className={input} />
            </Field>
            <Field name="to" text="Delivery city, state or ZIP">
              <input id="to" required placeholder="e.g. Dallas, TX" value={data.to || ""} onChange={(e) => set("to", e.target.value)} className={input} />
            </Field>
            <Field name="date" text="Pickup date">
              <input id="date" type="date" value={data.date || ""} onChange={(e) => set("date", e.target.value)} className={input} />
            </Field>
            <Field name="goods" text="What are we hauling?">
              <textarea id="goods" rows={3} placeholder="Commodity, dimensions, dock or no dock, appointment times…" value={data.goods || ""} onChange={(e) => set("goods", e.target.value)} className={input} />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field name="name" text="Your name">
                <input id="name" required autoComplete="name" value={data.name || ""} onChange={(e) => set("name", e.target.value)} className={input} />
              </Field>
              <Field name="company" text="Company">
                <input id="company" autoComplete="organization" value={data.company || ""} onChange={(e) => set("company", e.target.value)} className={input} />
              </Field>
            </div>
            <Field name="email" text="Email">
              <input id="email" type="email" required autoComplete="email" value={data.email || ""} onChange={(e) => set("email", e.target.value)} className={input} />
            </Field>
            <Field name="phone" text="Phone">
              <input id="phone" type="tel" required autoComplete="tel" value={data.phone || ""} onChange={(e) => set("phone", e.target.value)} className={input} />
            </Field>
          </>
        )}
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-md bg-red/10 p-3 text-sm text-red-deep">
          Sorry, that did not send. Please call {site.phone} or email {site.email}.
        </p>
      )}

      <div className="mt-6 flex gap-3">
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="rounded-md border border-line px-5 py-3.5 font-display font-semibold uppercase text-graphite hover:border-steel">
            Back
          </button>
        )}
        <button type="submit" disabled={status === "sending"} className="flex-1 rounded-md bg-red-gradient px-6 py-3.5 font-display text-base font-semibold uppercase tracking-wider text-white shadow-lg shadow-red/30 transition hover:-translate-y-0.5 disabled:opacity-60">
          {step < 2 ? "Continue" : status === "sending" ? "Sending…" : "Get My Quote"}
        </button>
      </div>
      <p className="mt-4 text-center text-xs text-steel">No obligation. Dispatch answers 24/7 at {site.phone}.</p>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Dispatch sign-up for owner-operators (box trucks and hotshots).     */
/* ------------------------------------------------------------------ */

export function DispatchForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setStatus("sending");
    try {
      await sendLead("dispatch", fd);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent")
    return (
      <div className="rounded-xl bg-white p-8 shadow-2xl shadow-black/30">
        <Success title="You're on the list" text="Thanks for reaching out. A dispatcher will contact you to go over your truck, lanes and goals." onReset={() => setStatus("idle")} />
      </div>
    );

  return (
    <form onSubmit={submit} className="relative rounded-xl bg-white p-6 shadow-2xl shadow-black/30 sm:p-8">
      <Honeypot />
      <h3 className="text-2xl font-bold uppercase text-ink">Dispatch sign-up</h3>
      <p className="mt-1 text-sm text-steel">Box truck and hotshot owner-operators. Takes 1 minute.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field name="d-name" text="Your name"><input id="d-name" name="name" required autoComplete="name" className={input} /></Field>
        <Field name="d-company" text="Company / carrier name"><input id="d-company" name="company" className={input} /></Field>
        <Field name="d-phone" text="Phone"><input id="d-phone" name="phone" type="tel" required autoComplete="tel" className={input} /></Field>
        <Field name="d-email" text="Email"><input id="d-email" name="email" type="email" required autoComplete="email" className={input} /></Field>
        <Field name="d-equipment" text="Equipment">
          <select id="d-equipment" name="equipment" className={input}>
            <option>26 ft box truck (non-CDL)</option>
            <option>Box truck (CDL / over 26,000 lb)</option>
            <option>Box truck (under 26 ft)</option>
            <option>Hotshot (CDL)</option>
            <option>Hotshot (non-CDL)</option>
          </select>
        </Field>
        <Field name="d-authority" text="Authority status">
          <select id="d-authority" name="authority" className={input}>
            <option>Active MC authority</option>
            <option>New authority (under 6 months)</option>
            <option>Authority pending</option>
          </select>
        </Field>
        <Field name="d-mc" text="MC / DOT number"><input id="d-mc" name="mc" placeholder="Optional" className={input} /></Field>
        <Field name="d-base" text="Home base (city, state)"><input id="d-base" name="from" placeholder="e.g. Atlanta, GA" className={input} /></Field>
      </div>
      <div className="mt-4">
        <Field name="d-lanes" text="Preferred lanes / home time">
          <textarea id="d-lanes" name="notes" rows={3} placeholder="Where do you like to run? How often do you want to be home?" className={input} />
        </Field>
      </div>
      {status === "error" && <p className="mt-4 rounded-md bg-red/10 p-3 text-sm text-red-deep">Sorry, that did not send. Please call {site.phone}.</p>}
      <button type="submit" disabled={status === "sending"} className="mt-6 w-full rounded-md bg-gold-gradient px-6 py-4 font-display text-base font-semibold uppercase tracking-wider text-ink shadow-lg shadow-gold/30 transition hover:-translate-y-0.5 disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Start Dispatching With Us"}
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Review form: collects feedback from customers we have hauled for.   */
/* ------------------------------------------------------------------ */

export function ReviewForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [rating, setRating] = useState(5);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setStatus("sending");
    try {
      await sendLead("review", { ...fd, rating: String(rating) });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent")
    return (
      <div className="rounded-xl border border-line bg-white p-8 shadow-xl">
        <Success title="Thank you" text="We appreciate you taking the time. Your feedback helps us run a better operation." onReset={() => setStatus("idle")} />
      </div>
    );

  return (
    <form onSubmit={submit} className="relative rounded-xl border border-line bg-white p-6 shadow-xl shadow-ink/5 sm:p-8">
      <Honeypot />
      <h3 className="text-2xl font-bold uppercase">Share your experience</h3>
      <div className="mt-5">
        <span className={label}>Your rating</span>
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} star${n > 1 ? "s" : ""}`} onClick={() => setRating(n)} className={`text-3xl transition ${n <= rating ? "text-gold" : "text-line"}`}>
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field name="r-name" text="Name"><input id="r-name" name="name" required className={input} /></Field>
        <Field name="r-company" text="Company"><input id="r-company" name="company" className={input} /></Field>
      </div>
      <div className="mt-4">
        <Field name="r-email" text="Email (not published)"><input id="r-email" name="email" type="email" required className={input} /></Field>
      </div>
      <div className="mt-4">
        <Field name="r-notes" text="Your review"><textarea id="r-notes" name="notes" rows={4} required className={input} /></Field>
      </div>
      {status === "error" && <p className="mt-4 rounded-md bg-red/10 p-3 text-sm text-red-deep">Sorry, that did not send. Please email {site.email}.</p>}
      <button type="submit" disabled={status === "sending"} className="mt-6 w-full rounded-md bg-red-gradient px-6 py-4 font-display font-semibold uppercase tracking-wider text-white transition hover:-translate-y-0.5 disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Submit Review"}
      </button>
    </form>
  );
}
