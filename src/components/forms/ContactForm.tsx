"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.email("Enter a valid email"),
  company: z.string().optional(),
  budget: z.string().optional(),
  services: z.array(z.string()).min(1, "Pick at least one service"),
  message: z.string().min(10, "Tell us a little more"),
});

type FormData = z.infer<typeof schema>;

const SERVICE_OPTIONS = [
  "Digital marketing",
  "Graphic design",
  "Video editing",
  "Web design",
  "Web development",
  "Software development",
  "App development",
];

const BUDGETS = ["< $5k", "$5k–$15k", "$15k–$50k", "$50k+"];

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { services: [] },
  });

  const selectedServices = watch("services") ?? [];

  async function onSubmit(data: FormData) {
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error ?? "Something went wrong");
      }
      setState("success");
      reset();
    } catch (e) {
      setState("error");
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      aria-label="Contact form"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Your name" error={errors.name?.message}>
          <input
            {...register("name")}
            className={inputCls}
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            className={inputCls}
            placeholder="jane@brand.co"
            type="email"
          />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input
            {...register("company")}
            className={inputCls}
            placeholder="Brand Co."
          />
        </Field>
        <Field label="Budget (optional)">
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map((b) => {
              const current = watch("budget");
              const active = current === b;
              return (
                <button
                  type="button"
                  key={b}
                  onClick={() => setValue("budget", active ? "" : b)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors",
                    active
                      ? "border-[color:var(--color-gold-400)] bg-[color:var(--color-gold-400)]/10 text-[color:var(--color-gold-200)]"
                      : "border-white/10 text-[color:var(--color-fg-soft)] hover:border-white/30",
                  )}
                >
                  {b}
                </button>
              );
            })}
          </div>
        </Field>
      </div>

      <Field label="Services needed" error={errors.services?.message}>
        <div className="flex flex-wrap gap-2">
          {SERVICE_OPTIONS.map((s) => {
            const active = selectedServices.includes(s);
            return (
              <button
                type="button"
                key={s}
                onClick={() => {
                  const next = active
                    ? selectedServices.filter((x) => x !== s)
                    : [...selectedServices, s];
                  setValue("services", next, { shouldValidate: true });
                }}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  active
                    ? "border-[color:var(--color-gold-400)] bg-[color:var(--color-gold-400)]/10 text-[color:var(--color-gold-200)]"
                    : "border-white/10 text-[color:var(--color-fg-soft)] hover:border-white/30",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Tell us about your project" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={6}
          className={cn(inputCls, "resize-none")}
          placeholder="A few lines about goals, timeline and anything else we should know."
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-gold-400)] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[color:var(--color-gold-300)] disabled:opacity-50"
        >
          {state === "sending" ? "Sending…" : "Send message"}
          <span aria-hidden>→</span>
        </button>
        <AnimatePresence>
          {state === "success" && (
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-[color:var(--color-gold-200)]"
            >
              Thanks — we&apos;ll be in touch within 24 hours.
            </motion.span>
          )}
          {state === "error" && (
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-[#e6d8d0]"
            >
              {errorMsg || "Something went wrong — try again."}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[color:var(--color-fg)] placeholder:text-[color:var(--color-muted)] focus:border-[color:var(--color-gold-400)]/60 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold-400)]/20";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs tracking-[0.25em] uppercase text-[color:var(--color-muted)]">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-[#e6d8d0]">{error}</span>}
    </label>
  );
}
