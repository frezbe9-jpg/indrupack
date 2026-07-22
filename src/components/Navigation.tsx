import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, Menu, X, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { cn } from "../utils/cn";

const links = [
  { name: "Производство", href: "/#factory" },
  { name: "Продукция", href: "/#products" },
  { name: "FEFCO", href: "/#fefco" },
  { name: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (location.pathname !== "/") {
        window.location.href = href;
        return;
      }
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-gray-950/90 backdrop-blur-xl border-b border-white/[0.06] py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/30 group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-black text-lg tracking-tight leading-none block">ИРУ</span>
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.15em] leading-none">Упаковка</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              link.href.startsWith("/#") ? (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
            >
              Кабинет
            </Link>
            <button
              onClick={() => handleNavClick("/#contact")}
              className="inline-flex items-center justify-center rounded-2xl text-sm font-bold bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-600/30 h-12 px-6 transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider"
            >
              Заявка
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-gray-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          {links.map((link) => (
            link.href.startsWith("/#") ? (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-2xl font-black text-white hover:text-orange-600 transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-black text-white hover:text-orange-600 transition-colors"
              >
                {link.name}
              </Link>
            )
          ))}
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-black text-white hover:text-orange-600 transition-colors"
          >
            Личный кабинет
          </Link>
          <button
            onClick={() => handleNavClick("/#contact")}
            className="mt-4 inline-flex items-center justify-center rounded-2xl text-sm font-bold bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-600/30 h-14 px-8 transition-all active:scale-95 uppercase tracking-wider"
          >
            Оставить заявку
          </button>
        </div>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/[0.06] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-white font-black text-lg tracking-tight block">ИРУ</span>
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.15em]">Индивидуальные Решения Упаковки</span>
              </div>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
              Производство гофроупаковки и картонных коробок с 2008 года. Работаем с объемами от 1 000 кв. м.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Навигация</h4>
            <ul className="space-y-4">
              {["Производство", "Продукция", "Каталог FEFCO", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white font-medium transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 font-medium text-sm">+7 (800) 123-45-67</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 font-medium text-sm">info@iru-pack.ru</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 font-medium text-sm">Москва, ул. Промышленная, 15</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-medium">
            © 2024 ИРУ — Индивидуальные Решения Упаковки. Все права защищены.
          </p>
          <p className="text-gray-600 text-xs font-medium uppercase tracking-wider">
            Производство гофроупаковки с 2008 года
          </p>
        </div>
      </div>
    </footer>
  );
}
