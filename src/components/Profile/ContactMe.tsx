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
  Cpu,
  ArrowsInLineVertical,
  TerminalWindow,
  GraphIcon,
  ChatCenteredText,
} from "@phosphor-icons/react";

const labelClasses =
  "flex items-center gap-2 text-[10px] uppercase text-card-foreground mb-1";
const boxInputClasses =
  "w-full bg-background/5 placeholder:text-primary/70 border border-primary/20 p-3 text-xs font-mono text-foreground focus:border-primary focus:outline-none focus:bg-background/20 transition-all";

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
    <section className="w-full max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden border-2 border-primary/20 bg-background/5 p-6 md:p-8 backdrop-blur-md"
      >
        {/* Euclidean Accents */}
        <div className="absolute top-0 left-0 size-3 bg-primary z-20" />
        <div className="absolute bottom-0 right-0 size-3 bg-primary z-20" />

        <AnimatePresence mode="wait">
          {!state.succeeded ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 space-y-6"
            >
              <div className="flex flex-col gap-1 border-b-2 border-primary/10 pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <TerminalWindow size={20} className="text-primary" />
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-foreground">
                      CONTACT_<span className="text-primary">ME</span>
                    </h2>
                  </div>
                  <GraphIcon
                    size={14}
                    className="text-primary opacity-30 animate-pulse hidden sm:block"
                  />
                </div>
                <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest flex items-center gap-2">
                  <ChatCenteredText size={12} />
                  Ready to start a new project or just say hi?
                </p>
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
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="group/btn relative w-full h-12 bg-transparent border-2 border-primary/40 overflow-hidden transition-all hover:border-primary disabled:opacity-50"
                  >
                    <div className="absolute inset-0 z-0 h-full w-0 bg-primary transition-all duration-300 ease-out group-hover/btn:w-full" />
                    <div className="relative z-10 flex items-center justify-between px-6 h-full transition-colors duration-200 group-hover/btn:text-background font-black">
                      <div className="flex items-center gap-3">
                        <ArrowsInLineVertical
                          size={18}
                          className="group-hover/btn:rotate-180 transition-transform"
                        />
                        <span className="text-[11px] uppercase tracking-[0.4em]">
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
              className="flex flex-col items-center py-12 space-y-5 text-center relative z-10"
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
        <div className="relative z-10 mt-6 pt-3 border-t border-primary/10 flex flex-col sm:flex-row justify-between items-center gap-4">
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
              KUOPIO_NODE_FI
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
