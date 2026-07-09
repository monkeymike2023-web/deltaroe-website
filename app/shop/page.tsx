import type { Metadata } from "next";
import ShopDemo from "./ShopDemo";

export const metadata: Metadata = {
  title: "The Apothecary — Delta Roe Candles, Oils, Crystals & Ritual Goods",
  description:
    "The Delta Roe Apothecary: intention candles, ritual oils, crystals, chakra sets and sacred goods — curated and charged in Elk Grove. Store preview.",
  robots: { index: false }, // demo mode — don't index until the real store launches
};

export default function ShopPage() {
  return (
    <main>
      <ShopDemo />
    </main>
  );
}
