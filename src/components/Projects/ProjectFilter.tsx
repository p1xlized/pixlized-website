import {
  CaretDown,
  Database,
  FadersHorizontal,
  SortAscending,
  SortDescending,
  MagnifyingGlass,
  CheckCircle,
  Briefcase,
  User,
  SquaresFour,
} from "@phosphor-icons/react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  sortOrder: "ASC" | "DESC";
  setSortOrder: (val: "ASC" | "DESC") => void;
  workType: "ALL" | "PERSONAL" | "FREELANCE";
  setWorkType: (val: "ALL" | "PERSONAL" | "FREELANCE") => void;
  filter: string;
  setFilter: (val: string) => void;
}

export function ProjectFilters({
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  workType,
  setWorkType,
  filter,
  setFilter,
}: ProjectFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const SectionLabel = ({
    label,
    icon: Icon,
  }: {
    label: string;
    icon?: any;
  }) => (
    <div className="flex items-center gap-3 mb-4 border-b border-primary/10 pb-2 shrink-0">
      {Icon && <Icon size={18} weight="duotone" className="text-primary" />}
      <span className="text-[11px] uppercase tracking-widest text-primary/60 font-bold">
        {label}
      </span>
    </div>
  );

  const FilterContent = (
    <div className="flex flex-col space-y-10">
      {/* 1. SEARCH */}
      <div className="shrink-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-primary/[0.03] border border-primary/20 rounded-sm py-2 px-3 text-xs tracking-wide text-primary focus:outline-none focus:border-primary/50 transition-all placeholder:text-primary/20"
          />
        </div>
      </div>

      {/* 2. SORT ORDER */}
      <div className="shrink-0">
        <SectionLabel label="Sort By" />
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "DESC", icon: SortDescending, label: "Newest" },
            { id: "ASC", icon: SortAscending, label: "Oldest" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSortOrder(s.id as "ASC" | "DESC")}
              className={`flex flex-col items-center gap-2 py-2 border rounded-sm transition-all ${
                sortOrder === s.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-primary/10 text-primary/40 hover:border-primary/30"
              }`}
            >
              <s.icon
                size={20}
                weight={sortOrder === s.id ? "fill" : "regular"}
              />
              <span className="text-[9px] uppercase font-medium tracking-tighter">
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. PROJECT TYPE */}
      <div className="shrink-0">
        <SectionLabel label="Type" />
        <div className="flex flex-col gap-1">
          {[
            { id: "ALL", label: "All Projects", icon: SquaresFour },
            { id: "PERSONAL", label: "Personal", icon: User },
            { id: "FREELANCE", label: "Freelance", icon: Briefcase },
          ].map((t) => {
            const isActive = workType === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setWorkType(t.id as any)}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-sm border transition-all ${
                  isActive
                    ? "border-primary/30 bg-primary/5 text-primary"
                    : "border-transparent text-primary/40 hover:bg-primary/[0.03] hover:text-primary/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <t.icon size={16} weight={isActive ? "fill" : "regular"} />
                  <span className="text-[10px] uppercase tracking-widest">
                    {t.label}
                  </span>
                </div>
                {isActive && (
                  <CheckCircle
                    size={14}
                    weight="fill"
                    className="text-primary"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. CATEGORIES */}
      <div className="flex-1 min-h-0 flex flex-col">
        <SectionLabel label="Categories" icon={Database} />
        <nav className="flex flex-col gap-1 overflow-y-auto pr-2 custom-scrollbar">
          {["ALL", "WEB", "GAME", "MOBILE"].map((label) => {
            const isActive = filter === label;
            return (
              <button
                key={label}
                onClick={() => setFilter(label)}
                className={`flex items-center gap-3 px-3 py-2 text-[10px] uppercase tracking-widest transition-all rounded-sm ${
                  isActive
                    ? "text-primary bg-primary/10 font-bold"
                    : "text-primary/30 hover:text-primary/60 hover:bg-primary/[0.02]"
                }`}
              >
                <div
                  className={`size-1.5 rounded-full border transition-all ${
                    isActive
                      ? "bg-primary border-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"
                      : "border-primary/30"
                  }`}
                />
                {label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <aside className="w-full lg:w-56 h-full flex flex-col">
      {/* MOBILE */}
      <div className="lg:hidden mb-6 shrink-0">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="border border-primary/20 bg-background/50 backdrop-blur-md rounded-sm"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4">
            <div className="flex items-center gap-3 text-primary">
              <FadersHorizontal size={20} weight="duotone" />
              <span className="text-xs uppercase tracking-widest font-bold">
                Filters
              </span>
            </div>
            <CaretDown
              size={18}
              className={`text-primary/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-6">
            {FilterContent}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:flex flex-col h-full">{FilterContent}</div>
    </aside>
  );
}
