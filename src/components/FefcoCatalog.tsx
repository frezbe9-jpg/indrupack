"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "./ui-core";
import { StaggerContainer, StaggerItem } from "./Animations";
import { Package, ArrowUpRight } from "lucide-react";

const fefcoStandards = [
  { code: "0201", title: "Стандартный короб", desc: "Самый популярный тип: клапаны встык.", img: "📦" },
  { code: "0427", title: "Самосборный короб", desc: "Короб с «ушками», не требует скотча.", img: "🍱" },
  { code: "0203", title: "Короб с перекрытием", desc: "Клапаны полностью перекрывают друг друга.", img: "📥" },
  { code: "0300", title: "Телескопический", desc: "Состоит из двух частей: крышки и дна.", img: "📦" },
  { code: "0421", title: "Короб с замком", desc: "Усиленные боковые стенки, высокая прочность.", img: "🎁" },
  { code: "0701", title: "Авто-дно", desc: "Мгновенная сборка за счет склейки дна.", img: "🚀" }
];

export default function FefcoCatalog() {
  return (
    <div className="py-20">
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
          Каталог <span className="text-orange-600">FEFCO</span>
        </h2>
        <p className="text-xl text-gray-400 font-medium max-w-2xl leading-relaxed">
          Международные стандарты конструкций гофроупаковки. Выберите нужный код для точного заказа.
        </p>
      </div>

      <StaggerContainer>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fefcoStandards.map((item) => (
            <StaggerItem key={item.code}>
              <Card className="bg-gray-900 border-gray-800 hover:border-orange-600 group transition-all duration-500 cursor-pointer overflow-hidden relative">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-4xl font-black text-orange-600/20 group-hover:text-orange-600 transition-colors duration-500">
                      {item.code}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-gray-700 group-hover:text-orange-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <div className="text-5xl mb-6">{item.img}</div>
                  <h4 className="text-xl font-black text-white uppercase mb-2 tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
                <div className="absolute bottom-0 left-0 h-1 bg-orange-600 w-0 group-hover:w-full transition-all duration-700" />
              </Card>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </div>
  );
}
