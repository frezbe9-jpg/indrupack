"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Box, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { Button } from "./ui-core";

const links = [
  { name: "Каталог FEFCO", href: "/#fefco" },
  { name: "Производство", href: "/#factory" },
  { name: "База знаний", href: "/faq" },
  { name: "Контакты", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "py-4 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800" 
          : "py-6 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
            <Box className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-gray-900 dark:text-white leading-none uppercase tracking-tighter">
              ИРУ
            </span>
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em] leading-none mt-0.5">
              Упаковка
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-5 py-2 text-sm font-bold text-gray-400 hover:text-orange-500 transition-colors rounded-xl hover:bg-orange-950/30"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/login"
            className="px-5 py-2 text-sm font-bold text-gray-400 hover:text-orange-500 transition-colors rounded-xl hover:bg-orange-950/30"
          >
            Личный кабинет
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a 
            href="#contact"
            className="inline-flex items-center justify-center rounded-2xl text-sm font-bold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] bg-orange-600 text-white hover:bg-orange-700 shadow-[0_10px_20px_-10px_rgba(234,88,12,0.5)] h-12 px-6"
          >
            Заказать расчет
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-white"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-black text-white hover:text-orange-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-black text-white hover:text-orange-600 transition-colors"
              >
                Личный кабинет
              </Link>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded-2xl text-sm font-bold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] bg-orange-600 text-white hover:bg-orange-700 shadow-[0_10px_20px_-10px_rgba(234,88,12,0.5)] h-14 px-8 text-base"
              >
                Оставить заявку
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-20 border-t border-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center">
                <Box className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white leading-none uppercase tracking-tighter">
                  ИРУ
                </span>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-[0.2em] leading-none mt-1">
                  Индивидуальные решения
                </span>
              </div>
            </Link>
            <p className="text-lg max-w-md leading-relaxed">
              Лидер в производстве гофроупаковки премиум-класса. 
              Мы создаем не просто коробки, а надежную защиту для ваших продуктов.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Компания</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li><Link href="#products" className="hover:text-orange-500 transition-colors">Продукция</Link></li>
              <li><Link href="#advantages" className="hover:text-orange-500 transition-colors">Технологии</Link></li>
              <li><Link href="#factory" className="hover:text-orange-500 transition-colors">Производство</Link></li>
              <li><Link href="#contact" className="hover:text-orange-500 transition-colors">Контакты</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Связь</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li className="flex flex-col">
                <span className="text-[10px] text-gray-600 uppercase mb-1">Телефон</span>
                <a href="tel:+78000000000" className="text-white hover:text-orange-500">+7 (800) 000-00-00</a>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] text-gray-600 uppercase mb-1">Email</span>
                <a href="mailto:info@iru-pack.ru" className="text-white hover:text-orange-500">info@iru-pack.ru</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-900 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Индивидуальные Решения Упаковки</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
            <Link href="#" className="hover:text-white transition-colors">Условия работы</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


