// Strip the marketing chrome (nav, footer, announcement bar) when inside the Studio.
// The Studio brings its own full-screen UI.

export const metadata = {
  title: "Isla Thrifts Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
