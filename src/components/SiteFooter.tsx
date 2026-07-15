/* -------------------------------- Footer ---------------------------------- */

const services = [
  { label: "الإعلانات المدفوعة", href: "#services" },
  { label: "المحتوى والإبداع", href: "#services" },
  { label: "تحليل الأداء", href: "#services" },
];

const company = [
  { label: "الخدمات", href: "#services" },
  { label: "أعمالنا", href: "#work" },
  { label: "عن صُنع", href: "#about" },
  { label: "تواصل معنا", href: "#contact" },
];

export default function SiteFooter() {
  return (
    <footer 
      dir="rtl" 
      className="w-full text-white" 
      style={{ background: "var(--esq-bg)" }}
    >
      {/* Orange CTA band */}
      <div id="contact" className="scroll-mt-24 px-4 pt-4 md:px-8 md:pt-8">
        <div
          className="relative overflow-hidden rounded-[2rem] px-6 py-20 text-center md:rounded-[2.5rem] md:py-28"
          style={{
            background:
              "linear-gradient(135deg, #D00A00 0%, #E21400 40%, #F5350A 70%, #FF6A3D 100%)",
          }}
        >
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold leading-[1.3] tracking-tight md:text-5xl">
            جاهزين نبني حضورًا يليق فيكم؟
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/80">
            نبدأ بفهم علامتك وأهدافك، ثم نصنع خطة محتوى وحملات تترك أثرًا حقيقيًا.
          </p>
          <a
            href="mailto:Suna.mediaa@gmail.com"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/70 px-8 py-3 text-sm font-medium text-white transition-[transform,background-color,color] duration-200 ease-out hover:bg-white hover:text-[var(--suna)] active:scale-[0.97]"
          >
            تواصل معنا ←
          </a>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-6xl px-6 pb-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Services */}
          <div className="text-right">
            <h4 className="text-sm font-semibold uppercase tracking-wide">
              الخدمات
            </h4>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="text-right">
            <h4 className="text-sm font-semibold uppercase tracking-wide">
              الشركة
            </h4>
            <ul className="mt-5 space-y-3">
              {company.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-right">
            <h4 className="text-sm font-semibold uppercase tracking-wide">
              تواصل معنا
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-neutral-400">
              <li>
                <a
                  href="mailto:Suna.mediaa@gmail.com"
                  className="transition-colors hover:text-white"
                  dir="ltr"
                >
                  Suna.mediaa@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+966559032660"
                  className="transition-colors hover:text-white"
                  dir="ltr"
                >
                  +966 55 903 2660
                </a>
              </li>
              <li>الرياض، المملكة العربية السعودية</li>
            </ul>
          </div>
        </div>

        {/* Brand wave motif */}
        <div className="mt-16 text-white/15" aria-hidden>
          <div className="suna-wave" />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-center md:flex-row md:text-right">
          <img
            src="/brand/suna-wordmark-white.png"
            alt="صُنع"
            className="h-9 w-auto opacity-90"
          />
          <p className="font-latin text-xs text-neutral-500" dir="ltr">
            © {new Date().getFullYear()} SUNA MEDIA · Riyadh, KSA
          </p>
        </div>
      </div>
    </footer>
  );
}