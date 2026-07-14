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
              "linear-gradient(135deg, #E94706 0%, #F54A04 40%, #FF5A12 70%, #FF7B2E 100%)",
          }}
        >
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold leading-[1.3] tracking-tight md:text-5xl">
            جاهزين نبني حضورًا يليق فيكم؟
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/80">
            نبدأ بفهم علامتك وأهدافك، ثم نصنع خطة محتوى وحملات تترك أثرًا حقيقيًا.
          </p>
          <a
            href="mailto:hello@suna.studio"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/70 px-8 py-3 text-sm font-medium text-white transition-[transform,background-color,color] duration-200 ease-out hover:bg-white hover:text-[hsl(18_88%_55%)] active:scale-[0.97]"
          >
            تواصل معنا ←
          </a>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-6xl px-6 pb-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
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
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row md:text-right">
          <span className="text-2xl font-bold tracking-tight">SUNA | صُنع</span>
          <p className="text-xs text-neutral-500" dir="ltr">
            © {new Date().getFullYear()} SUNA · Digital Studio
          </p>
        </div>
      </div>
    </footer>
  );
}