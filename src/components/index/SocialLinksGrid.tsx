// SocialLinksGrid.tsx - Animated social links grid component

import { Github, Linkedin, Bluesky, Gmail, Youtube, Discord } from "@thesvg/react"

interface SocialLink {
  name: string
  url: string
}

interface SocialLinksGridProps {
  links: SocialLink[]
}

// Map platform names to icon components
const iconMap = {
  github: Github,
  linkedin: Linkedin,
  bluesky: Bluesky,
  mail: Gmail,
  email: Gmail,
  gmail: Gmail,
  youtube: Youtube,
  discord: Discord,
}

export default function SocialLinksGrid({ links }: SocialLinksGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 px-2 py-4">
      {links.map((link, index) => {
        const Icon = iconMap[link.name.toLowerCase() as keyof typeof iconMap] || Github

        return (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-card group relative flex items-center justify-center gap-3 rounded-lg border border-border bg-secondary/30 p-3 transition-all hover:border-primary/40 hover:bg-secondary/60 hover:shadow-md hover:shadow-primary/10"
            style={{ animationDelay: `${index * 0.05}s` }}
            key={link.name}
          >
            <div className="icon-container flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:scale-110 group-hover:bg-primary/20">
              <Icon className="h-5 w-5 transition-transform group-hover:rotate-12" />
            </div>
            <span className="font-semibold tracking-tight transition-colors group-hover:text-primary">
              {link.name}
            </span>
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
            {/* Floating particles */}
            <div className="particle particle-1" />
            <div className="particle particle-2" />
          </a>
        )
      })}
    </div>
  )
}
