import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fullscreen Page",
  robots: { index: false },
};

export default function FullscreenPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-cream">
      {/* Intentionally minimal — mirrors the original placeholder page */}
    </div>
  );
}
