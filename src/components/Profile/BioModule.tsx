import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const BioModule = () => {
  const [input, setInput] = useState("");
  // Local state hook to handle active heart particle render arrays safely
  const [hearts, setHearts] = useState<
    Array<{ id: number; x: number; delay: number; size: number }>
  >([]);

  const commands: Record<string, string> = {
    help: "  Available core modules:\n  • fetch   - Display system architecture status\n  • ls      - List directory segments\n  • pwd     - View active identity details\n  • toolkit - Review technology stacks\n  • echo    - Return text input syntax\n  • date    - Fetch system timestamp\n  • clear   - Wipe interface backlog",
    ls: "  documents/         projects/\n  UEF-FI/            Maisonneuve-College/",
    pwd: "  Name: Alexandru Paduret\n  Email: alex@pixlized.net\n  Website: pixlized.net\n",
    toolkit:
      "  Core: TypeScript, React, Node.js, Deno, Rust, C#,\n  Data: GraphQL, PostgreSQL, REST, MongoDB\n  Ops:  Docker, Linux, Git/GitHub, Kubernetes\n",
    date: `  ${new Date().toUTCString()}`,
  };

  const [history, setHistory] = useState<
    Array<{ type: "command" | "output"; content: string }>
  >([
    { type: "command", content: "$ systemctl start diagnostic-interface" },
    { type: "output", content: commands.help },
  ]);

  const terminalRef = React.useRef<HTMLDivElement>(null);

  const getNixosFetch = () => {
    return [
      "  ❄️  alex@pixlized.net",
      "  ---------------+---------------",
      "  os    | NixOS Unstable",
      "  host  | G14",
      "  krnl  | Linux 7.0.8",
      "  wm    | Niri (Wayland)",
      "  pkgs  | 1842 (nix-env), 24 (flatpak)",
      "  shell | fish ",
      "  ram   | 4.2 GiB / 32.0 GiB (13%)",
    ].join("\n");
  };

  // Obfuscated easter egg execution trigger
  const triggerMatrixCascade = () => {
    const freshDrops = Array.from({ length: 28 }).map((_, idx) => ({
      id: Date.now() + idx,
      x: Math.random() * 100, // Screen width % boundaries
      delay: Math.random() * 1.8,
      size: Math.floor(Math.random() * 16) + 12, // Random pixel sizing
    }));
    setHearts(freshDrops);

    // Auto-clean up DOM node elements once keyframes end
    setTimeout(() => setHearts([]), 4500);
  };

  const handleCommand = (cmd: string) => {
    const cleanInput = cmd.trim();

    if (cleanInput === "") {
      setInput("");
      return;
    }

    const args = cleanInput.split(" ");
    const primaryCmd = args[0].toLowerCase();

    if (primaryCmd === "clear") {
      setHistory([
        { type: "command", content: "$ systemctl reload diagnostic-interface" },
        { type: "output", content: commands.help },
      ]);
      setInput("");
      return;
    }

    const activeLoop: Array<{ type: "command" | "output"; content: string }> =
      [];
    activeLoop.push({ type: "command", content: `$ ${cleanInput}` });

    if (primaryCmd === "fetch") {
      activeLoop.push({ type: "output", content: getNixosFetch() });
    } else if (primaryCmd === "echo") {
      const echoValue = args.slice(1).join(" ");

      // Obfuscated look-up configuration for 'kristina'
      // Splitting, reversing and mapping charCodes dynamically so it won't show up in a cleartext search
      const _0x9e12 = "anitsirk".split("").reverse().join("");
      const targetFound = echoValue.toLowerCase().includes(_0x9e12);

      if (targetFound) {
        triggerMatrixCascade();
        const _0xb4f2 = [
          32, 32, 73, 32, 108, 111, 118, 101, 32, 121, 111, 117, 10, 32, 32, 74,
          101, 32, 116, 39, 97, 105, 109, 101, 10, 32, 32, 1070, 1091, 1083,
          1102, 98, 108, 1102, 32, 1090, 1077, 1073, 1103, 10, 32, 32, 84, 101,
          32, 105, 117, 98, 101, 115, 99, 10, 32, 32, 77, 105, 110, 228, 32,
          114, 97, 107, 97, 115, 116, 97, 110, 32, 115, 105, 110, 117, 97, 10,
          32, 32, 73, 99, 104, 32, 108, 105, 101, 98, 101, 32, 100, 105, 105,
          99, 104, 10, 32, 32, 24811, 105, 12375, 12390, 12427, 10, 32, 32,
          25105, 23050, 20320, 10, 32, 32, 1571, 1604, 1576, 1603, 10, 32, 32,
          49324, 46993, 54644, 44396,
        ];
        const decryptedMessage = String.fromCharCode(..._0xb4f2);

        activeLoop.push({
          type: "output",
          content: `  ❤️  [System Matrix Initialization Success] \n${decryptedMessage}\n  💌`,
        });
      } else {
        activeLoop.push({
          type: "output",
          content: echoValue ? `  ${echoValue}` : "  echo what?",
        });
      }
    } else if (commands[primaryCmd]) {
      activeLoop.push({ type: "output", content: commands[primaryCmd] });
    } else {
      activeLoop.push({
        type: "output",
        content: `  command not found: ${primaryCmd}. Type 'help' for support diagnostics.`,
      });
    }

    setHistory(activeLoop);
    setInput("");
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <>
      {/* --- EASTER EGG FULL SCREEN OVERLAY ENGINE --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[9999]">
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 0, y: "-10vh", x: `${heart.x}vw` }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: "110vh",
                x: `${heart.x + (Math.random() * 6 - 3)}vw`, // Minor drifting sway
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3.5,
                delay: heart.delay,
                ease: "linear",
              }}
              style={{
                position: "absolute",
                fontSize: `${heart.size}px`,
                filter: "drop-shadow(0 0 6px rgba(239, 68, 68, 0.4))",
              }}
            >
              ❤️
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- TERMINAL WORKSPACE UI CONTAINER --- */}
      <div className="group relative flex-[1.4] overflow-hidden border border-primary/20 bg-background/40 p-3 transition-all duration-500 hover:border-primary hover:bg-primary/5 flex flex-col min-h-56 h-56 select-none">
        {/* --- TERMINAL HEADER --- */}
        <div className="flex items-center gap-2 border-b border-primary/20 pb-1.5 mb-2 shrink-0">
          <div className="flex gap-1">
            <div className="size-1.5 rounded-full bg-yellow-500/60" />
            <div className="size-1.5 rounded-full bg-orange-500/60" />
            <div className="size-1.5 rounded-full bg-primary/60" />
          </div>
          <span className="text-[8px] font-mono text-primary/60 uppercase tracking-widest">
            terminal_v1.3_nix
          </span>
        </div>

        {/* --- TERMINAL OUTPUT --- */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto text-[10px] font-mono text-primary/80 space-y-1 min-h-0 custom-scrollbar"
        >
          {history.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "whitespace-pre-wrap break-words leading-tight py-0.5",
                entry.type === "command"
                  ? "text-primary font-bold"
                  : "text-primary/70",
              )}
            >
              {entry.content}
            </motion.div>
          ))}
        </div>

        {/* --- TERMINAL INPUT --- */}
        <div className="flex items-center gap-2 border-t border-primary/20 pt-1.5 mt-2 shrink-0">
          <span className="text-primary font-mono text-[10px] font-bold shrink-0 animate-pulse">
            $
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCommand(input);
              }
            }}
            placeholder="Type a command segment..."
            className="flex-1 bg-transparent text-primary outline-none font-mono text-[10px] placeholder:text-primary/20 focus:placeholder:text-primary/40"
            autoFocus
          />
        </div>
      </div>
    </>
  );
};
export default BioModule;
