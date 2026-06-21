"use client";

import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import {
  User,
  EnvelopeSimple,
  Briefcase,
  CurrencyDollar,
  ChatCircleDots,
  CircleNotch,
  PaperPlaneTilt,
  ShieldCheck,
  ArrowsInLineVertical,
  TerminalWindow,
  GraphIcon,
  ChatCenteredText,
  FlyingSaucer,
  Planet,
  Cpu,
} from "@phosphor-icons/react";

const labelClasses =
  "flex items-center gap-2 text-[10px] uppercase text-primary/70 mb-1 tracking-[0.25em]";
const boxInputClasses =
  "w-full bg-background/10 placeholder:text-primary/35 border border-primary/15 px-3 py-3 text-xs font-mono text-foreground focus:border-primary/50 focus:outline-none focus:bg-background/20 transition-all rounded-none";

export default function ContactSection() {
  // Replace "YOUR_FORM_ID" with your actual Formspree ID (e.g., "mqkvpown")
  const [state, handleSubmit] = useForm("xblkqpak");
  const [logId, setLogId] = useState("");

  useEffect(() => {
    if (state.succeeded) {
      setLogId(
        Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .toUpperCase(),
      );
    }
  }, [state.succeeded]);

  return (
    <section className="flex h-full w-full items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative w-full max-w-3xl overflow-visible border border-primary/20 bg-background/10 backdrop-blur-xl shadow-[0_0_30px_rgba(var(--primary-rgb),0.08)]"
      >
        <motion.div
          whileHover={{ scale: 1.18 }}
          animate={{
            y: [-68, -58, -68],
            x: [-18, -8, 0],
          }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="group absolute -left-36 top-10 z-20 hidden md:block"
        >
          <div className="relative flex items-center justify-center rounded-full border border-primary/15 bg-background/30 p-3 text-primary/25 backdrop-blur-md shadow-[0_0_18px_rgba(var(--primary-rgb),0.08)] transition-all duration-200 group-hover:scale-110 group-hover:border-primary/35 group-hover:text-primary/80 group-hover:shadow-[0_0_26px_rgba(var(--primary-rgb),0.22)]">
            <FlyingSaucer size={26} weight="thin" />
            <span className="pointer-events-none absolute right-full mr-8 whitespace-nowrap rounded-sm border border-primary/15 bg-background/95 px-2 py-1 text-[7px] font-black uppercase tracking-[0.35em] text-primary/70 opacity-0 shadow-[0_0_18px_rgba(var(--primary-rgb),0.08)] transition-opacity duration-200 group-hover:opacity-100">
              Signal relay
            </span>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.18 }}
          animate={{
            y: [68, 58, 68],
            x: [18, 8, 0],
          }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="group absolute -right-36 top-18 z-20 hidden md:block"
        >
          <div className="relative flex items-center justify-center rounded-full border border-primary/15 bg-background/30 p-3 text-primary/20 backdrop-blur-md shadow-[0_0_18px_rgba(var(--primary-rgb),0.08)] transition-all duration-200 group-hover:scale-110 group-hover:border-primary/35 group-hover:text-primary/80 group-hover:shadow-[0_0_26px_rgba(var(--primary-rgb),0.22)]">
            <Planet size={24} weight="thin" />
            <span className="pointer-events-none absolute left-full ml-8 whitespace-nowrap rounded-sm border border-primary/15 bg-background/95 px-2 py-1 text-[7px] font-black uppercase tracking-[0.35em] text-primary/70 opacity-0 shadow-[0_0_18px_rgba(var(--primary-rgb),0.08)] transition-opacity duration-200 group-hover:opacity-100">
              Orbit marker
            </span>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-primary/35 via-primary/10 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-primary/20 via-primary/5 to-transparent" />

        <AnimatePresence mode="wait">
          {!state.succeeded ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 space-y-6 p-5 md:p-8"
            >
              <div className="flex flex-col gap-3 border-b border-primary/10 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TerminalWindow size={18} className="text-primary/90" />
                      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground">
                        CONTACT_<span className="text-primary">ME</span>
                      </h2>
                    </div>
                    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.35em] text-primary/60">
                      <ChatCenteredText size={12} />
                      Ready to start a new project or just say hi?
                    </p>
                  </div>
                  <GraphIcon
                    size={14}
                    className="hidden animate-pulse text-primary/30 sm:block"
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className={labelClasses}>
                      <User size={10} /> Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className={boxInputClasses}
                    />
                    <ValidationError
                      prefix="Name"
                      field="name"
                      errors={state.errors}
                      className="text-[8px] text-red-500 uppercase font-black"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className={labelClasses}>
                      <EnvelopeSimple size={10} /> Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="example@email.com"
                      className={boxInputClasses}
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className="text-[8px] text-red-500 uppercase font-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="projectType" className={labelClasses}>
                      <Briefcase size={10} /> Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      className={boxInputClasses}
                    >
                      <option value="Software Development">
                        Software Development
                      </option>
                      <option value="Design">Design</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="priority" className={labelClasses}>
                      <CurrencyDollar size={10} /> Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      className={boxInputClasses}
                    >
                      <option value="Standard">Standard</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className={labelClasses}>
                    <ChatCircleDots size={10} /> Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    placeholder="Tell me about your idea..."
                    className={`${boxInputClasses} resize-none`}
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className="text-[8px] text-red-500 uppercase font-black"
                  />
                </div>

                <div className="relative pt-2">
                  <motion.div
                    animate={{
                      y: state.submitting ? 0 : [0, -2, 0],
                      rotate: state.submitting ? 0 : [0, -0.8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: state.submitting ? 0 : Infinity,
                      ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute -right-14 -top-4 z-20 hidden text-primary/20 sm:block"
                  >
                    <PaperPlaneTilt size={24} weight="thin" />
                  </motion.div>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="group/btn relative flex h-12 w-full items-center justify-center overflow-hidden border border-primary/35 bg-transparent transition-all hover:border-primary/70 disabled:opacity-50"
                  >
                    <div className="absolute inset-0 z-0 h-full w-0 bg-primary transition-all duration-300 ease-out group-hover/btn:w-full" />
                    <div className="relative z-10 flex h-full w-full items-center justify-between px-5 font-black transition-colors duration-200 group-hover/btn:text-background">
                      <div className="flex items-center gap-3">
                        <ArrowsInLineVertical
                          size={18}
                          className="transition-transform group-hover/btn:rotate-180"
                        />
                        <span className="text-[10px] uppercase tracking-[0.45em] md:text-[11px]">
                          {state.submitting ? "Encrypting..." : "Send Message"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {state.submitting ? (
                          <CircleNotch size={18} className="animate-spin" />
                        ) : (
                          <PaperPlaneTilt size={18} weight="bold" />
                        )}
                      </div>
                    </div>
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 flex flex-col items-center space-y-5 px-5 py-12 text-center md:px-8"
            >
              <div className="size-16 border-2 border-primary flex items-center justify-center bg-primary/5">
                <ShieldCheck size={32} weight="bold" className="text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-black uppercase tracking-tighter">
                  Message Sent!
                </h3>
                <p className="text-[10px] font-mono text-primary/60 tracking-widest uppercase">
                  Reference ID: 0x{logId}
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="group relative border-2 border-primary px-10 py-2 font-black text-[9px] uppercase tracking-[0.5em] overflow-hidden bg-transparent"
              >
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 group-hover:text-background transition-colors">
                  Send Another
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="relative z-10 mt-6 flex flex-col items-center justify-between gap-4 border-t border-primary/10 px-5 py-4 sm:flex-row md:px-8">
          <a
            href="mailto:contact-me@pixlized.net"
            className="group/mail flex items-center gap-3"
          >
            <div className="size-8 border-2 border-primary/30 flex items-center justify-center transition-all group-hover/mail:bg-primary group-hover/mail:text-background">
              <EnvelopeSimple size={14} weight="bold" />
            </div>
            <span className="font-mono text-[9px] text-foreground/60 group-hover/mail:text-primary uppercase tracking-tighter">
              contact-me@pixlized.net
            </span>
          </a>
          <div className="flex items-center gap-2 opacity-30">
            <Cpu size={14} />
            <span className="text-[7px] font-black uppercase tracking-widest">
              pixl_1zed
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
