"use client";

import { useRef, useState } from "react";
import { sectionIndex, site, socials } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/utils";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FieldName = keyof FormValues;
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "error";

const emptyValues: FormValues = { name: "", email: "", subject: "", message: "" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.subject.trim().length < 3) {
    errors.subject = "Add a short subject so I know what this is about.";
  }
  if (values.message.trim().length < 20) {
    errors.message = "A little more detail, please — at least 20 characters.";
  }
  if (values.message.length > 4000) {
    errors.message = "That message is a bit long. Keep it under 4000 characters.";
  }
  return errors;
}

const fields: {
  name: FieldName;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  full?: boolean;
}[] = [
  {
    name: "name",
    label: "Your name",
    placeholder: "Ada Lovelace",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "you@company.com",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "subject",
    label: "Subject",
    placeholder: "A project, a role, or a question",
    full: true,
  },
];

export function Contact() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [banner, setBanner] = useState<{ message: string; hint?: string } | null>(
    null,
  );
  const honeypot = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const update = (field: FieldName, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    if (honeypot.current?.value) {
      // Bots fill hidden fields; pretend everything is fine and send nothing.
      setStatus("success");
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      const target = formRef.current?.querySelector<HTMLElement>(
        `[name="${first}"]`,
      );
      target?.focus();
      return;
    }

    setStatus("sending");
    setBanner(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; hint?: string }
        | null;

      if (response.ok && payload?.ok) {
        setStatus("success");
        setValues(emptyValues);
        return;
      }

      setStatus("error");
      if (response.status === 503) {
        setBanner({
          message:
            "The form is not connected to an email service on this deployment yet.",
          hint:
            payload?.error ??
            "Set RESEND_API_KEY (and the CONTACT_* variables) to enable sending — or email me directly using the address on the left.",
        });
      } else if (response.status === 429) {
        setBanner({
          message: "That was a lot of messages in a short time.",
          hint: "Please wait a minute and try again, or email me directly.",
        });
      } else {
        setBanner({
          message: payload?.error ?? "The message could not be sent.",
          hint: `You can always email me directly at ${site.email}.`,
        });
      }
    } catch {
      setStatus("error");
      setBanner({
        message: "The network did not cooperate.",
        hint: `Check your connection and try again, or email ${site.email}.`,
      });
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full opacity-60 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, var(--glow-a), transparent 68%)",
        }}
      />

      <div className="wrap relative">
        <SectionHead
          index={sectionIndex.contact}
          label="Contact"
          title={
            <>
              Let&apos;s make something{" "}
              <em className="font-display text-accent italic">
                worth remembering
              </em>
              .
            </>
          }
          description="Available for frontend, full-stack and mobile roles, and for carefully scoped freelance work. Tell me what you are building."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="font-mono text-[0.63rem] tracking-[0.18em] text-faint uppercase">
                Direct line
              </p>
              <a
                href={`mailto:${site.email}`}
                className="group mt-2 inline-flex items-center gap-2 font-display text-[clamp(1.5rem,4vw,2.6rem)] leading-tight tracking-[-0.02em] break-all text-fg transition-colors hover:text-accent"
              >
                {site.email}
                <Icon
                  name="arrow-up-right"
                  size={20}
                  className="shrink-0 opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                />
              </a>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-line bg-card px-4 py-3.5">
                  <p className="font-mono text-[0.58rem] tracking-[0.16em] text-faint uppercase">
                    Based in
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[0.84rem]">
                    <Icon name="map-pin" size={13} className="text-accent" />
                    {site.location}
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-card px-4 py-3.5">
                  <p className="font-mono text-[0.58rem] tracking-[0.16em] text-faint uppercase">
                    Response time
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[0.84rem]">
                    <Icon name="clock" size={13} className="text-accent" />
                    Usually within a day
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-6 flex flex-wrap gap-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={
                      social.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[0.8rem] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-fg"
                  >
                    <Icon name={social.icon} size={14} />
                    {social.label}
                    <Icon
                      name="arrow-up-right"
                      size={12}
                      className="opacity-40 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-bg-soft/50 px-4 py-4">
                <span
                  aria-hidden
                  className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-mint"
                />
                <p className="text-[0.82rem] leading-relaxed text-muted">
                  <span className="text-fg">{site.availability}.</span>{" "}
                  I read every message myself — no autoresponders, no forms
                  disappearing into a void.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="card-surface relative overflow-hidden p-5 md:p-7">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
              />

              {status === "success" ? (
                <div
                  className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                  role="status"
                  aria-live="polite"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-mint/40 bg-mint/10 text-mint">
                    <Icon name="check" size={24} />
                  </span>
                  <h3 className="mt-5 text-[1.3rem] font-medium tracking-[-0.02em]">
                    Message sent
                  </h3>
                  <p className="mt-2 max-w-sm text-[0.87rem] leading-relaxed text-muted">
                    Thanks for reaching out — it landed in my inbox. I usually
                    reply within a day.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setBanner(null);
                    }}
                    className="btn btn-ghost mt-6 !py-2.5 !text-[0.8rem]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {fields.map((field) => (
                      <div
                        key={field.name}
                        className={cn(field.full && "sm:col-span-2")}
                      >
                        <label
                          htmlFor={`contact-${field.name}`}
                          className="mb-1.5 block font-mono text-[0.6rem] tracking-[0.16em] text-faint uppercase"
                        >
                          {field.label}
                        </label>
                        <input
                          id={`contact-${field.name}`}
                          name={field.name}
                          type={field.type ?? "text"}
                          value={values[field.name]}
                          onChange={(event) =>
                            update(field.name, event.target.value)
                          }
                          placeholder={field.placeholder}
                          autoComplete={field.autoComplete ?? "off"}
                          aria-invalid={Boolean(errors[field.name])}
                          aria-describedby={
                            errors[field.name]
                              ? `contact-${field.name}-error`
                              : undefined
                          }
                          className={cn(
                            "w-full rounded-xl border bg-bg-soft/40 px-3.5 py-2.5 text-[0.86rem] text-fg transition-colors placeholder:text-faint/80 focus:outline-none",
                            errors[field.name]
                              ? "border-peach/60 focus:border-peach"
                              : "border-line focus:border-accent/60",
                          )}
                        />
                        {errors[field.name] ? (
                          <p
                            id={`contact-${field.name}-error`}
                            className="mt-1.5 flex items-center gap-1.5 text-[0.72rem] text-peach"
                          >
                            <Icon name="alert" size={11} />
                            {errors[field.name]}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block font-mono text-[0.6rem] tracking-[0.16em] text-faint uppercase"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={values.message}
                      onChange={(event) =>
                        update("message", event.target.value)
                      }
                      placeholder="What are you building, and where could I help?"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "contact-message-error" : undefined
                      }
                      className={cn(
                        "w-full resize-none rounded-xl border bg-bg-soft/40 px-3.5 py-2.5 text-[0.86rem] text-fg transition-colors placeholder:text-faint/80 focus:outline-none",
                        errors.message
                          ? "border-peach/60 focus:border-peach"
                          : "border-line focus:border-accent/60",
                      )}
                    />
                    <div className="mt-1.5 flex items-center justify-between gap-3">
                      {errors.message ? (
                        <p
                          id="contact-message-error"
                          className="flex items-center gap-1.5 text-[0.72rem] text-peach"
                        >
                          <Icon name="alert" size={11} />
                          {errors.message}
                        </p>
                      ) : (
                        <span className="font-mono text-[0.63rem] text-faint">
                          Every message is read.
                        </span>
                      )}
                      <span className="font-mono text-[0.63rem] text-faint">
                        {values.message.length}/4000
                      </span>
                    </div>
                  </div>

                  {/* honeypot — hidden from people and assistive tech */}
                  <div aria-hidden="true" className="absolute -left-[9999px]">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      ref={honeypot}
                      id="contact-website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {banner ? (
                    <div
                      role="alert"
                      className="rounded-xl border border-peach/40 bg-peach/[0.07] px-3.5 py-3"
                    >
                      <p className="flex items-start gap-2 text-[0.8rem] leading-snug text-fg">
                        <Icon
                          name="alert"
                          size={13}
                          className="mt-0.5 shrink-0 text-peach"
                        />
                        {banner.message}
                      </p>
                      {banner.hint ? (
                        <p className="mt-1.5 pl-[21px] text-[0.75rem] leading-relaxed text-muted">
                          {banner.hint}{" "}
                          <a
                            href={`mailto:${site.email}`}
                            className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
                          >
                            Email me directly
                          </a>
                          .
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <p className="font-mono text-[0.62rem] leading-relaxed text-faint">
                      No mailing list.
                      <br />
                      Your details stay between us.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn btn-primary group min-w-[9.5rem] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <span
                            aria-hidden
                            className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-current border-t-transparent"
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <Icon
                            name="send"
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="sr-only" role="status" aria-live="polite">
                    {status === "sending" ? "Sending your message" : ""}
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
