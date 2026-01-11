import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-full", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--accent))", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="none" stroke="url(#grad1)" strokeWidth="4" />
      <path
        d="M50 15 L65 35 L50 30 L35 35 Z"
        fill="hsl(var(--primary))"
        transform="rotate(45 50 50)"
      />
      <path
        d="M50 85 L65 65 L50 70 L35 65 Z"
        fill="hsl(var(--accent))"
        transform="rotate(45 50 50)"
      />
      <circle cx="50" cy="50" r="5" fill="hsl(var(--foreground))" />
    </svg>
  );
}
