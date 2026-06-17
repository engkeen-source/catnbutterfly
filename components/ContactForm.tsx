"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

interface ContactFormProps {
  buttonLabel?: string;
  successMessage?: string;
}

export default function ContactForm({
  buttonLabel = "Submit",
  successMessage = "Thanks, we received your submission.",
}: ContactFormProps = {}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  }

  const inputClass =
    "w-full border-b border-brand-brown/30 bg-transparent py-2 text-sm text-brand-brown placeholder-brand-brown/40 focus:outline-none focus:border-brand-brown transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md mx-auto">
      <div>
        <label htmlFor="name" className="sr-only">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Name"
          className={inputClass}
          disabled={status === "loading"}
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email"
          className={inputClass}
          disabled={status === "loading"}
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Message"
          className={`${inputClass} resize-none`}
          disabled={status === "loading"}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start px-8 py-3 border border-brand-brown text-brand-brown text-xs tracking-widest uppercase hover:bg-brand-brown hover:text-brand-cream transition-colors duration-200 disabled:opacity-50"
      >
        {status === "loading" ? "Submitting…" : buttonLabel}
      </button>

      {status === "success" && (
        <p className="text-sm text-brand-teal">
          {successMessage}
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-brand-red">{errorMsg}</p>
      )}
    </form>
  );
}
