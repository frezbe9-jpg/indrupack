import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "./ui-core";
import { StaggerContainer, StaggerItem } from "./Animations";

const fefcoStandards = [
  {
    code: "0201",
    title: "Стандартный",
    desc: "Наиболее распространённый тип. Клапаны сходятся встык — надёжная и экономичная конструкция.",
    icon: "M21 16V8L12 3L3 8V16L12 21L21 16ZM12 3V12M12 12L21 8M12 12L3 8",
  },
  {
    code: "0427",
    title: "Самосборный",
    desc: "Конструкция с ушками. Быстрая ручная сборка без клея — идеал для ритейла.",
    icon: "M3 8L12 13L21 8M3 16L12 21L21 16M12 13V21M12 13L21 8L12 3L3 8L12 13Z",
  },
  {
    code: "0203",
    title: "С перекрытием",
    desc: "Клапаны внахлест — усиленный низ для тяжёлых грузов и длительного хранения.",
    icon: "M12 21L21 16V8L12 13M12 21L3 16V8L12 13M12 13V3L21 8M12 3L3 8",
  },
  {
    code: "0300",
    title: "Телескоп",
    desc: "Крышка + дно (два отдельных элемента). Премиум-решение для подарочной упаковки.",
    icon: "M2 8L12 3L22 8L12 13L2 8ZM2 14L12 9L22 14L12 19L2 14Z",
  },
  {
    code: "0421",
    title: "С замком",
    desc: "Усиленные стенки и специальный замок без клея. Многоразовое использование.",
    icon: "M12 3L21 8V16L12 21L3 16V8L12 3ZM3 8L12 13M21 8L12 13",
  },
  {
    code: "0701",
    title: "Авто-дно",
    desc: "Автоматически складывается при открытии. Максимальная скорость упаковки на линии.",
    icon: "M12 2L3 7V17L12 22L21 17V7L12 2ZM12 12L3 7M12 12L21 7M12 12V22",
  },
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
                  <div className="w-16 h-16 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-600/20 group-hover:border-orange-500/50 transition-all duration-500">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 text-orange-500"
                    >
                      <path d={item.icon} />
                    </svg>
                  </div>
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
