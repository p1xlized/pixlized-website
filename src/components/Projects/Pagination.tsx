import { motion } from "framer-motion";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function ArchivePagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const getPages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pages = getPages();

  return (
    <div className="mt-auto pt-6 font-mono text-[9px] uppercase tracking-[0.2em]">
      <div className="flex items-center justify-between border-t border-primary/10 pt-4">
        {/* NAVIGATION: PREV */}
        <motion.button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-primary/40 hover:text-primary disabled:opacity-10 transition-colors group"
        >
          <CaretLeft size={12} weight="bold" />
          <span className="hidden md:inline ">Prev_Page</span>
        </motion.button>

        {/* CENTERED DATA NODES */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            {pages.map((page) => {
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className="relative flex items-center justify-center p-1 group"
                >
                  {/* Active background glow effect */}
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-primary/10 blur-[2px]"
                    />
                  )}

                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-primary/20 hover:text-primary/60"
                    }`}
                  >
                    {isActive
                      ? `[${page.toString().padStart(2, "0")}]`
                      : page.toString().padStart(2, "0")}
                  </span>

                  {/* Tiny underline indicator for active node */}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-primary/60"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* SYSTEM STATUS FRACTION */}
          <div className="h-3 w-[1px] bg-primary/10 mx-2 hidden sm:block" />

          <div className="flex flex-col items-start leading-none opacity-40 tabular-nums">
            <span className="text-[7px] mb-0.5 tracking-widest">
              Sector_Pos
            </span>
            <span className="text-[10px] font-bold">
              {currentPage.toString().padStart(2, "0")}{" "}
              <span className="text-primary/20">/</span>{" "}
              {totalPages.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* NAVIGATION: NEXT */}
        <motion.button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-primary/40 hover:text-primary disabled:opacity-10 transition-colors group text-right"
        >
          <span className="hidden md:inline ">Next_Page</span>
          <CaretRight size={12} weight="bold" />
        </motion.button>
      </div>

      {/* SUB-HUD DECORATION */}
      <div className="mt-2 flex justify-between items-center opacity-10">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-primary" />
        <div className="px-4 text-[7px] tracking-[0.5em]  shrink-0">
          Terminal_Pagination_Module_v1.0
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-primary" />
      </div>
    </div>
  );
}
