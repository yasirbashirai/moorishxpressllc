// Lightweight inline icon set (stroke icons, inherit currentColor)
type P = { className?: string };
const base = "fill-none stroke-current stroke-[1.8]";
const svg = (d: React.ReactNode) => {
  const Icon = ({ className = "h-6 w-6" }: P) => (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
  );
  return Icon;
};

export const IconArrow = svg(<path d="M5 12h14M13 6l6 6-6 6" />);
export const IconClock = svg(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const IconBolt = svg(<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />);
export const IconTruck = svg(<><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>);
export const IconShield = svg(<><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z" /><path d="m9 12 2 2 4-4" /></>);
export const IconMap = svg(<><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>);
export const IconMail = svg(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>);
export const IconPhone = svg(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />);
export const IconCheck = svg(<path d="m5 12 5 5L20 7" />);
export const IconPlus = svg(<path d="M12 5v14M5 12h14" />);
export const IconHeadset = svg(<><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /><path d="M19 20a4 4 0 0 1-4 2h-2" /></>);
export const IconWeight = svg(<><path d="M6 8h12l2 12H4z" /><circle cx="12" cy="5" r="2" /></>);
export const IconLift = svg(<><path d="M3 4h11v10H3zM14 14h7M17 14v6M14 20h7" /></>);
export const IconRoute = svg(<><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M8 19h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7" /></>);
export const IconBox = svg(<><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></>);
export const IconHand = svg(<path d="M7 11V6a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V12M16 9.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-2.7L3.5 15a1.5 1.5 0 0 1 2.5-1.7L7 15" />);
export const IconDoc = svg(<><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>);
export const IconStar = svg(<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z" />);
export const IconUsers = svg(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" /></>);
export const IconChart = svg(<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />);

// Filled brand-mark icons for social links
export const IconFacebook = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1v-2c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8z" /></svg>
);
export const IconInstagram = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></svg>
);
export const IconLinkedin = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3.3 9h3.4v11.5H3.3zM9 9h3.3v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.2 2.4 4.2 5.4v6.4h-3.4v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v5.8H9z" /></svg>
);
