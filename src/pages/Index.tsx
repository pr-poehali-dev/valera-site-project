import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { label: "Главная", href: "#home" },
  { label: "Обо мне", href: "#about" },
  { label: "Навыки", href: "#skills" },
  { label: "Опыт", href: "#experience" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Контакты", href: "#contacts" },
];

const SKILLS = [
  { name: "Стратегическое планирование", level: 95 },
  { name: "Управление проектами", level: 90 },
  { name: "Финансовый анализ", level: 85 },
  { name: "Переговоры и продажи", level: 92 },
  { name: "Корпоративное право", level: 78 },
  { name: "Развитие бизнеса", level: 88 },
];

const EXPERIENCE = [
  {
    period: "2020 — н.в.",
    title: "Генеральный директор",
    company: "ООО «ПримерГрупп»",
    desc: "Руководство компанией численностью 120+ сотрудников. Рост выручки на 340% за 4 года.",
  },
  {
    period: "2015 — 2020",
    title: "Коммерческий директор",
    company: "АО «ИнвестХолдинг»",
    desc: "Формирование коммерческой стратегии. Вывод на рынок 3 новых продуктовых направлений.",
  },
  {
    period: "2010 — 2015",
    title: "Руководитель отдела",
    company: "ЗАО «Регион Финанс»",
    desc: "Построение отдела продаж с нуля. Команда 25 человек, выполнение плана 105–130%.",
  },
];

const PORTFOLIO = [
  {
    title: "Реструктуризация бизнеса",
    tag: "Консалтинг",
    desc: "Полная реорганизация производственного предприятия: оптимизация процессов, сокращение издержек на 22%.",
  },
  {
    title: "Выход на рынок СНГ",
    tag: "Развитие",
    desc: "Открытие представительств в 4 странах, формирование дистрибьюторской сети и локальных команд.",
  },
  {
    title: "Инвестиционный проект",
    tag: "Финансы",
    desc: "Привлечение раунда финансирования на 150 млн руб., структурирование сделки, сопровождение до закрытия.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <section id={id} ref={ref} className={`relative z-10 ${className}`}>
      <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        {children}
      </div>
    </section>
  );
}

export default function Index() {
  const [active, setActive] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map(n => n.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50" style={{ background: "hsl(220 15% 8% / 0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-light tracking-widest text-gold uppercase">В. Гилев</span>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(n => (
              <a
                key={n.href}
                href={n.href}
                className={`nav-link text-xs tracking-widest uppercase transition-colors ${active === n.href ? "text-gold active" : "text-muted-foreground hover:text-foreground"}`}
              >
                {n.label}
              </a>
            ))}
          </div>

          <button className="md:hidden text-muted-foreground hover:text-foreground" onClick={() => setMenuOpen(v => !v)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border/50 px-6 py-4 flex flex-col gap-4" style={{ background: "hsl(220 15% 8% / 0.97)" }}>
            {NAV_ITEMS.map(n => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}
                className={`text-xs tracking-widest uppercase ${active === n.href ? "text-gold" : "text-muted-foreground"}`}>
                {n.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative z-10 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, hsl(42, 70%, 62%) 0%, transparent 70%)" }} />
          <div className="absolute top-0 left-0 w-px h-full" style={{ background: "linear-gradient(to bottom, transparent, rgba(197,163,87,0.2), transparent)" }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 grid md:grid-cols-2 gap-16 items-center w-full">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6 opacity-0 animate-fade-in animate-delay-100" style={{ animationFillMode: "forwards" }}>
              Профессиональная визитка
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-6xl md:text-7xl font-light leading-[1.05] mb-6 opacity-0 animate-fade-in-up animate-delay-200" style2={{ animationFillMode: "forwards" }}>
              Валерий<br />
              <span className="text-gold italic">Гилев</span>
            </h1>
            <div className="w-16 h-px bg-gold mb-6 opacity-0 animate-fade-in animate-delay-300" style={{ animationFillMode: "forwards" }} />
            <p className="text-muted-foreground text-sm leading-relaxed tracking-wide max-w-md mb-10 opacity-0 animate-fade-in-up animate-delay-400" style={{ animationFillMode: "forwards" }}>
              Топ-менеджер с 15-летним опытом в стратегическом управлении, развитии бизнеса и привлечении инвестиций. Ориентирован на результат.
            </p>
            <div className="flex gap-4 opacity-0 animate-fade-in-up animate-delay-500" style={{ animationFillMode: "forwards" }}>
              <a href="#contacts"
                className="px-7 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-80"
                style={{ background: "hsl(42, 70%, 62%)", color: "hsl(220, 15%, 8%)" }}>
                Связаться
              </a>
              <a href="#about"
                className="px-7 py-3 text-xs tracking-widest uppercase font-medium border border-gold/40 text-gold hover:border-gold transition-all duration-300">
                Узнать больше
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 opacity-0 animate-fade-in-up animate-delay-600" style={{ animationFillMode: "forwards" }}>
            {[
              { value: "15+", label: "Лет опыта" },
              { value: "340%", label: "Рост выручки" },
              { value: "120+", label: "Сотрудников" },
              { value: "4", label: "Страны присутствия" },
            ].map(s => (
              <div key={s.label} className="border border-border/60 p-6 hover:border-gold/40 transition-colors duration-300"
                style={{ background: "hsl(220, 14%, 11%)" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl font-light text-gold mb-2">{s.value}</div>
                <div className="text-xs text-muted-foreground tracking-wide uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Scroll</span>
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, hsl(42, 70%, 62%), transparent)" }} />
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" className="py-24 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-1">
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">01</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl font-light mb-4">Обо<br /><em>мне</em></h2>
              <div className="w-10 h-px bg-gold" />
            </div>
            <div className="md:col-span-2 space-y-5 text-sm text-muted-foreground leading-relaxed">
              <p>
                Валерий Гилев — опытный управленец с глубокими компетенциями в области корпоративного управления, стратегического развития и операционного менеджмента. За 15 лет профессиональной карьеры прошёл путь от линейного руководителя до генерального директора крупного холдинга.
              </p>
              <p>
                Специализируется на трансформации бизнеса в условиях высокой неопределённости, построении эффективных команд и масштабировании компаний. Имеет успешный опыт работы на рынках России и СНГ.
              </p>
              <p>
                Убеждён, что долгосрочный успех строится на прозрачности, профессиональной этике и постоянном развитии людей внутри организации.
              </p>
              <div className="flex flex-wrap gap-8 pt-4">
                {[
                  { icon: "GraduationCap", text: "МГУ, Экономический факультет" },
                  { icon: "MapPin", text: "Москва, Россия" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2 text-xs text-foreground/70">
                    <Icon name={item.icon as "GraduationCap" | "MapPin"} size={14} className="text-gold" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" className="py-24 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">02</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl font-light mb-4">Навыки<br /><em>и компетенции</em></h2>
              <div className="w-10 h-px bg-gold" />
            </div>
            <div className="md:col-span-2 space-y-6">
              {SKILLS.map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground/80">{skill.name}</span>
                    <span className="text-xs text-gold font-medium">{skill.level}%</span>
                  </div>
                  <div className="h-px relative overflow-hidden" style={{ background: "hsl(220, 12%, 18%)" }}>
                    <div
                      className="absolute top-0 left-0 h-full transition-all duration-1000"
                      style={{ width: `${skill.level}%`, transitionDelay: `${i * 100}ms`, background: "hsl(42, 70%, 62%)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" className="py-24 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">03</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl font-light mb-4">Опыт<br /><em>работы</em></h2>
              <div className="w-10 h-px bg-gold" />
            </div>
            <div className="md:col-span-2 space-y-0">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="relative pl-6 pb-10 border-l border-border/40 last:border-transparent">
                  <div className="absolute left-[-4px] top-1 w-2 h-2 rounded-full" style={{ background: "hsl(42, 70%, 62%)" }} />
                  <p className="text-xs tracking-widest text-gold uppercase mb-1">{exp.period}</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-normal mb-1">{exp.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">{exp.company}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PORTFOLIO */}
      <Section id="portfolio" className="py-24 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">04</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl font-light mb-4">Ключевые <em>проекты</em></h2>
            <div className="w-10 h-px bg-gold" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PORTFOLIO.map((p, i) => (
              <div key={i} className="border border-border/60 p-8 hover:border-gold/40 transition-all duration-300 group"
                style={{ background: "hsl(220, 14%, 11%)" }}>
                <span className="inline-block text-xs tracking-widest uppercase text-gold border border-gold/30 px-3 py-1 mb-6">{p.tag}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-xl font-normal mb-4 group-hover:text-gold transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACTS */}
      <Section id="contacts" className="py-24 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3">05</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl font-light mb-4">Контакты</h2>
              <div className="w-10 h-px bg-gold mb-8" />
              <div className="space-y-5">
                {[
                  { icon: "Mail", label: "Email", value: "v.gilev@example.com" },
                  { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                  { icon: "MapPin", label: "Город", value: "Москва, Россия" },
                  { icon: "Linkedin", label: "LinkedIn", value: "linkedin.com/in/vgilev" },
                ].map(c => (
                  <div key={c.label} className="flex items-start gap-3">
                    <Icon name={c.icon as "Mail" | "Phone" | "MapPin" | "Linkedin"} size={14} className="text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground tracking-wide uppercase mb-0.5">{c.label}</p>
                      <p className="text-sm text-foreground/80">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 border border-border/60 p-8" style={{ background: "hsl(220, 14%, 11%)" }}>
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-10">
                  <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center">
                    <Icon name="Check" size={20} className="text-gold" />
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl font-light">Сообщение отправлено</h3>
                  <p className="text-sm text-muted-foreground">Валерий свяжется с вами в ближайшее время.</p>
                  <button onClick={() => setSent(false)} className="text-xs text-gold uppercase tracking-widest hover:underline mt-2">
                    Отправить ещё
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl font-light mb-6">Быстрое обращение</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Ваше имя</label>
                      <input
                        required
                        value={formData.name}
                        onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                        placeholder="Иван Петров"
                        className="w-full border px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
                        style={{ background: "hsl(220, 15%, 8%)", borderColor: "hsl(220, 12%, 18%)", color: "hsl(40, 20%, 92%)" }}
                        onFocus={e => e.target.style.borderColor = "hsl(42, 70%, 62%, 0.6)"}
                        onBlur={e => e.target.style.borderColor = "hsl(220, 12%, 18%)"}
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Email</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                        placeholder="ivan@company.ru"
                        className="w-full border px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
                        style={{ background: "hsl(220, 15%, 8%)", borderColor: "hsl(220, 12%, 18%)", color: "hsl(40, 20%, 92%)" }}
                        onFocus={e => e.target.style.borderColor = "hsl(42, 70%, 62%, 0.6)"}
                        onBlur={e => e.target.style.borderColor = "hsl(220, 12%, 18%)"}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Сообщение</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                      placeholder="Опишите ваш запрос или предложение..."
                      className="w-full border px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none transition-colors resize-none"
                      style={{ background: "hsl(220, 15%, 8%)", borderColor: "hsl(220, 12%, 18%)", color: "hsl(40, 20%, 92%)" }}
                      onFocus={e => e.target.style.borderColor = "hsl(42, 70%, 62%, 0.6)"}
                      onBlur={e => e.target.style.borderColor = "hsl(220, 12%, 18%)"}
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-80"
                    style={{ background: "hsl(42, 70%, 62%)", color: "hsl(220, 15%, 8%)" }}
                  >
                    Отправить сообщение
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-border/40 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-lg text-gold/70 tracking-widest uppercase">В. Гилев</span>
          <p className="text-xs text-muted-foreground tracking-wide">© 2024 Валерий Гилев. Все права защищены.</p>
          <div className="flex gap-3">
            {[
              { icon: "Linkedin", href: "#" },
              { icon: "Mail", href: "mailto:v.gilev@example.com" },
              { icon: "Phone", href: "tel:+79990000000" },
            ].map(s => (
              <a key={s.icon} href={s.href}
                className="w-8 h-8 border border-border/60 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 transition-all duration-300">
                <Icon name={s.icon as "Linkedin" | "Mail" | "Phone"} size={13} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
