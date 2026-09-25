"use client";

import { useState, type FormEvent } from "react";

const TOPICS = [
  "Order care",
  "Bespoke & gifting",
  "Press & stockists",
  "Something else",
];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-surface-container-low p-space-lg md:p-space-xl text-center">
        <span className="material-symbols-outlined text-[36px] text-secondary">
          mark_email_read
        </span>
        <h3 className="font-headline-md text-headline-md text-primary mt-4">
          Received with thanks.
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-md mx-auto">
          Your note is on the workbench. A human from the atelier will reply
          within two working days.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full bg-surface border border-on-surface-variant/20 px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-space-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        <label className="flex flex-col gap-2">
          <span className="font-label-md text-label-md uppercase tracking-[0.16em] text-on-surface-variant">
            Your name
          </span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Camille Aubert"
            maxLength={80}
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-label-md text-label-md uppercase tracking-[0.16em] text-on-surface-variant">
            Email
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            maxLength={120}
            className={inputCls}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-label-md text-label-md uppercase tracking-[0.16em] text-on-surface-variant">
          Topic
        </span>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className={`px-4 py-2 font-label-sm text-label-sm uppercase tracking-[0.14em] transition-colors ${
                topic === t
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-label-md text-label-md uppercase tracking-[0.16em] text-on-surface-variant">
          Message
        </span>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your room, your ritual, or your order…"
          rows={6}
          maxLength={3000}
          className={`${inputCls} resize-y min-h-[140px]`}
        />
      </label>

      {status === "error" ? (
        <p className="font-body-sm text-body-sm text-error">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="h-[52px] px-8 inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-[0.14em] hover:bg-primary-container transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send to the Atelier"}
        <span className="material-symbols-outlined text-[18px]">send</span>
      </button>
    </form>
  );
}
