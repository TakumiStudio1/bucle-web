import { Camera, MessagesSquare, Music2 } from "lucide-react";
import { siteConfig } from "@/config/site";

const ICONS = [
  { label: "Instagram", href: siteConfig.social.instagram, Icon: Camera },
  { label: "TikTok", href: siteConfig.social.tiktok, Icon: Music2 },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: MessagesSquare },
];

/**
 * Social links are demo placeholders — visually present but disabled, so
 * they never send a visitor to a real (nonexistent) profile.
 */
export function SocialIcons({ className }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className ?? ""}`}>
      {ICONS.map(({ label, Icon }) => (
        <li key={label}>
          <span
            className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full border border-cream/30 text-cream/50"
            aria-label={`${label} — enlace de demostración, no disponible`}
            title={`${label} (demostración, no disponible)`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        </li>
      ))}
    </ul>
  );
}
