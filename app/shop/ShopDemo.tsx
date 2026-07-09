"use client";

import { useMemo, useState } from "react";
import { PRODUCTS, type Product } from "@/lib/products";
import { SITE } from "@/lib/site";

/* Simplified Delta Roe mark — gold triangle + lotus, used as the "print" on products */
function Mark({ size = 22, opacity = 1 }: { size?: number; opacity?: number }) {
  return (
    <g opacity={opacity} transform={`scale(${size / 100})`}>
      <path d="M50 4 L96 88 L4 88 Z" fill="none" stroke="var(--gold)" strokeWidth="3" />
      <path
        d="M50 46 C42 58 30 62 22 74 C34 78 44 76 50 70 C56 76 66 78 78 74 C70 62 58 58 50 46 Z"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="3"
      />
      <path d="M50 46 C46 58 46 66 50 70 C54 66 54 58 50 46 Z" fill="var(--gold)" opacity="0.5" />
    </g>
  );
}

/* Gold line-art product illustrations — one visual language for the whole shelf */
function ProductArt({ art }: { art: Product["art"] }) {
  const stroke = "var(--gold)";
  const glow = "var(--gold-bright)";
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (art) {
    case "candle":
      return (
        <svg viewBox="0 0 200 200" role="img" aria-label="Candle illustration">
          <path {...common} d="M60 80 h80 v86 a8 8 0 0 1 -8 8 h-64 a8 8 0 0 1 -8 -8 Z" />
          <path {...common} d="M56 72 h88 v8 h-88 Z" />
          <path {...common} strokeWidth={2} d="M100 62 v-8" />
          <path d="M100 40 c-7 8 -7 14 0 20 c7 -6 7 -12 0 -20 Z" fill={glow} opacity="0.9" />
          <g transform="translate(78 100)"><Mark size={44} /></g>
        </svg>
      );
    case "oil":
      return (
        <svg viewBox="0 0 200 200" role="img" aria-label="Ritual oil illustration">
          <path {...common} d="M82 76 h36 v14 c14 8 22 22 22 38 v30 a12 12 0 0 1 -12 12 h-56 a12 12 0 0 1 -12 -12 v-30 c0 -16 8 -30 22 -38 Z" />
          <path {...common} d="M86 52 h28 v24 h-28 Z" />
          <path {...common} d="M92 40 h16 v12 h-16 Z" />
          <g transform="translate(80 116)"><Mark size={40} /></g>
        </svg>
      );
    case "bracelet":
      return (
        <svg viewBox="0 0 200 200" role="img" aria-label="Chakra bracelet illustration">
          <circle cx="100" cy="104" r="52" {...common} strokeDasharray="2 10" />
          {[
            ["#b48cc8", -90], ["#6a5acd", -39], ["#4a90d9", 12], ["#57a85c", 63],
            ["#e8c547", 114], ["#e0813c", 165], ["#c0392b", 216],
          ].map(([c, deg]) => {
            const a = ((deg as number) * Math.PI) / 180;
            // fixed-precision strings — avoids SSR/client float serialization drift
            const cx = (100 + 52 * Math.cos(a)).toFixed(2);
            const cy = (104 + 52 * Math.sin(a)).toFixed(2);
            return (
              <circle
                key={c as string}
                cx={cx}
                cy={cy}
                r="10"
                fill={c as string}
                opacity="0.85"
                stroke={stroke}
                strokeWidth="1.5"
              />
            );
          })}
        </svg>
      );
    case "crystals":
      return (
        <svg viewBox="0 0 200 200" role="img" aria-label="Crystal kit illustration">
          <path {...common} d="M70 160 L84 108 L98 128 Z" />
          <path {...common} d="M96 160 L116 84 L136 118 L128 160 Z" />
          <path {...common} d="M116 84 L128 160" strokeWidth={1.5} opacity="0.7" />
          <path {...common} d="M46 160 L58 128 L70 144 Z" />
          <path {...common} d="M40 166 h124" />
          <path d="M116 56 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill={glow} opacity="0.8" />
        </svg>
      );
    case "smoke":
      return (
        <svg viewBox="0 0 200 200" role="img" aria-label="Sacred smoke kit illustration">
          <path {...common} d="M64 130 l52 -44 a10 10 0 0 1 14 14 l-52 44 a18 18 0 0 1 -14 -14 Z" />
          <path {...common} strokeWidth={1.8} d="M70 122 l44 -36 M78 130 l44 -36" opacity="0.7" />
          <path {...common} strokeWidth={2} d="M138 84 c10 -10 2 -18 8 -26 c4 -6 12 -8 14 -16" opacity="0.8" />
          <path {...common} d="M52 150 c10 12 30 12 40 0" />
        </svg>
      );
    case "tee":
      return (
        <svg viewBox="0 0 200 200" role="img" aria-label="Tee illustration">
          <path {...common} d="M76 50 a24 24 0 0 0 48 0 l28 12 -12 30 -14 -6 v72 h-52 v-72 l-14 6 -12 -30 Z" />
          <g transform="translate(80 96)"><Mark size={40} /></g>
        </svg>
      );
    case "hat":
      return (
        <svg viewBox="0 0 200 200" role="img" aria-label="Hat illustration">
          <path {...common} d="M56 116 v-14 a44 44 0 0 1 88 0 v14" />
          <path {...common} d="M56 116 h88 c22 0 30 8 28 14 h-144 c-2 -6 6 -14 28 -14 Z" />
          <path {...common} strokeWidth={1.8} d="M100 58 v58" opacity="0.5" />
          <g transform="translate(84 78)"><Mark size={32} /></g>
        </svg>
      );
    case "tea":
      return (
        <svg viewBox="0 0 200 200" role="img" aria-label="Tea illustration">
          <path {...common} d="M64 70 h72 v84 a12 12 0 0 1 -12 12 h-48 a12 12 0 0 1 -12 -12 Z" />
          <path {...common} d="M60 62 h80 v8 h-80 Z" />
          <path {...common} strokeWidth={2} d="M88 46 c4 -6 -2 -10 2 -16 M108 46 c4 -6 -2 -10 2 -16" opacity="0.8" />
          <g transform="translate(78 96)"><Mark size={44} /></g>
        </svg>
      );
    case "journal":
      return (
        <svg viewBox="0 0 200 200" role="img" aria-label="Journal illustration">
          <path {...common} d="M62 44 h70 a10 10 0 0 1 10 10 v92 a10 10 0 0 1 -10 10 h-70 a8 8 0 0 1 -8 -8 v-96 a8 8 0 0 1 8 -8 Z" />
          <path {...common} d="M70 44 v112" strokeWidth={1.8} opacity="0.6" />
          <circle cx="112" cy="76" r="4" fill={glow} opacity="0.8" />
          <path {...common} strokeWidth={1.5} d="M96 76 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0" opacity="0.6" />
          <g transform="translate(90 104)"><Mark size={36} /></g>
        </svg>
      );
    case "jewelry":
      return (
        <svg viewBox="0 0 200 200" role="img" aria-label="Pendant illustration">
          <path {...common} strokeWidth={1.8} d="M52 40 c14 26 34 40 48 44 c14 -4 34 -18 48 -44" opacity="0.8" />
          <circle cx="100" cy="92" r="7" {...common} />
          <path {...common} d="M100 100 l-16 26 16 34 16 -34 Z" />
          <path {...common} strokeWidth={1.5} d="M84 126 h32" opacity="0.7" />
          <path d="M142 118 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" fill={glow} opacity="0.8" />
        </svg>
      );
  }
}

type CartLine = { product: Product; qty: number };

export default function ShopDemo() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutMsg, setCheckoutMsg] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const count = useMemo(() => cart.reduce((n, l) => n + l.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((n, l) => n + l.qty * l.product.price, 0), [cart]);

  function add(p: Product) {
    setCart((c) => {
      const hit = c.find((l) => l.product.id === p.id);
      return hit
        ? c.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + 1 } : l))
        : [...c, { product: p, qty: 1 }];
    });
    setJustAdded(p.id);
    window.setTimeout(() => setJustAdded(null), 1200);
  }

  function setQty(id: string, qty: number) {
    setCart((c) =>
      qty <= 0
        ? c.filter((l) => l.product.id !== id)
        : c.map((l) => (l.product.id === id ? { ...l, qty } : l))
    );
  }

  const collections = useMemo(() => {
    const order: string[] = [];
    for (const p of PRODUCTS) if (!order.includes(p.collection)) order.push(p.collection);
    return order;
  }, []);

  return (
    <>
      {/* demo ribbon */}
      <div className="demo-ribbon" role="status">
        <span className="dot" aria-hidden="true" />
        Preview mode — this is a design demo. Nothing can be purchased yet; products, prices &amp; copy are proposals for review.
      </div>

      <div className="svc-hero" style={{ paddingBottom: 36 }}>
        <div className="narrow">
          <div className="eyebrow">The Apothecary</div>
          <h1 style={{ marginTop: 14 }}>Take the sanctuary home</h1>
          <p className="lede" style={{ marginTop: 16 }}>
            Everything below is poured, blended, or charged under the Delta Roe
            name — the same materials that fill the studio.
          </p>
        </div>
      </div>

      {collections.map((col) => (
        <section key={col} style={{ paddingTop: 8, paddingBottom: 40 }}>
          <div className="wrap">
            <div className="eyebrow" style={{ marginBottom: 18 }}>{col}</div>
            <div className="shop-grid">
              {PRODUCTS.filter((p) => p.collection === col).map((p) => (
                <article key={p.id} className="product-card">
                  <div className={p.image ? "product-art has-photo" : "product-art"}>
                    {p.badge && <span className="product-badge">{p.badge}</span>}
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.name} loading="lazy" />
                    ) : (
                      <ProductArt art={p.art} />
                    )}
                  </div>
                  <div className="product-body">
                    <div className="product-head">
                      <h3>{p.name}</h3>
                      <span className="product-price">${p.price}</span>
                    </div>
                    <p className="product-desc">{p.desc}</p>
                    <p className="product-detail">{p.detail}</p>
                    <button className="btn btn-ghost product-add" onClick={() => add(p)}>
                      {justAdded === p.id ? "Added ✓" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* floating cart button */}
      {count > 0 && (
        <button className="cart-fab" onClick={() => setDrawerOpen(true)} aria-label={`Open cart, ${count} items`}>
          Cart · {count} · ${subtotal}
        </button>
      )}

      {/* cart drawer */}
      {drawerOpen && (
        <div className="cart-overlay" onClick={() => setDrawerOpen(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()} aria-label="Shopping cart">
            <div className="cart-head">
              <span className="eyebrow">Your Ritual</span>
              <button className="cart-close" onClick={() => setDrawerOpen(false)} aria-label="Close cart">×</button>
            </div>
            {cart.length === 0 && <p style={{ color: "var(--muted)" }}>Your cart is empty.</p>}
            {cart.map((l) => (
              <div className="cart-line" key={l.product.id}>
                <div>
                  <div className="cart-name">{l.product.name}</div>
                  <div className="cart-sub">${l.product.price}</div>
                </div>
                <div className="cart-qty">
                  <button onClick={() => setQty(l.product.id, l.qty - 1)} aria-label="Decrease">−</button>
                  <span>{l.qty}</span>
                  <button onClick={() => setQty(l.product.id, l.qty + 1)} aria-label="Increase">+</button>
                </div>
              </div>
            ))}
            {cart.length > 0 && (
              <>
                <div className="cart-total">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                {!checkoutMsg ? (
                  <button className="btn btn-solid" style={{ width: "100%" }} onClick={() => setCheckoutMsg(true)}>
                    Checkout
                  </button>
                ) : (
                  <div className="demo-note">
                    <strong>Demo mode.</strong> In the live store this checkout
                    runs through Shopify — cards, Apple&nbsp;Pay, and gift
                    notes included — and each order is poured, printed, or
                    packed to order under the Delta&nbsp;Roe label. Questions?{" "}
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </div>
                )}
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
