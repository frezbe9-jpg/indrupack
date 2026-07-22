import {
  ShieldCheck,
  Truck,
  Clock,
  Settings,
  Layers,
  Package,
  BarChart3,
  Factory,
  ArrowRight,
  Zap,
  Globe,
  Award,
  Phone,
  CheckCheck,
} from "lucide-react";
import { Card } from "../components/ui-core";
import { FadeIn, StaggerContainer, StaggerItem } from "../components/Animations";
import PackagingQuiz from "../components/PackagingQuiz";
import FefcoCatalog from "../components/FefcoCatalog";
import OrderForm from "../components/OrderForm";

const products = [
  {
    title: "Гофрокороба",
    description: "Индивидуальные решения для логистики и ритейла. Любые размеры и марки картона.",
    icon: Package,
    tags: ["Картон", "Упаковка"],
  },
  {
    title: "Гофрокартон",
    description: "Листовой картон марок Т-21, Т-23, П-32 с доставкой на производство.",
    icon: Layers,
    tags: ["Сырьё", "Листы"],
  },
  {
    title: "Сложная высечка",
    description: "Конструкции любой формы по вашим чертежам и техническим заданиям.",
    icon: Settings,
    tags: ["Дизайн", "Форма"],
  },
  {
    title: "Комплектующие",
    description: "Решётки и вкладыши для надёжной защиты товара при транспортировке.",
    icon: BarChart3,
    tags: ["Защита", "Детали"],
  },
];

const features = [
  {
    title: "Собственное производство",
    description: "Полный контроль качества на каждом этапе изготовления.",
    icon: Factory,
  },
  {
    title: "Быстрая логистика",
    description: "Доставка заказов по всей России точно в срок.",
    icon: Truck,
  },
  {
    title: "Индивидуальный дизайн",
    description: "Разработка уникальной конструкции упаковки под ваш продукт.",
    icon: Zap,
  },
  {
    title: "Эко-материалы",
    description: "Используем только перерабатываемое сырьё высшего качества.",
    icon: Globe,
  },
];

const stats = [
  { value: "16+", label: "Лет на рынке" },
  { value: "2 500+", label: "Клиентов" },
  { value: "47 млн", label: "Коробок в год" },
  { value: "99%", label: "Вовремя" },
];

const advantages = [
  "Работаем с объёмами от 1 000 кв. м",
  "Собственный парк оборудования",
  "Разработка под ключ за 3 дня",
  "Доставка по всей России",
  "Гарантия качества на каждый заказ",
  "Персональный менеджер",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 selection:bg-orange-500/30">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/70 to-gray-950 z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80')`,
            }}
          />
        </div>

        {/* Decorative grid */}
        <div className="absolute inset-0 z-10 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="up">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 rounded-full border border-orange-900/50 bg-gray-900/80 px-5 py-2 text-xs font-black text-orange-500 uppercase tracking-[0.2em] mb-10 backdrop-blur-xl shadow-xl">
                  <Award className="w-4 h-4" />
                  №1 в Индивидуальной Упаковке
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] mb-10 tracking-tighter uppercase">
                  Грани <br />
                  <span className="text-orange-600">Совершенства</span> <br />
                  Упаковки
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed font-medium">
                  Мы превращаем обычный картон в надёжную броню для вашего бизнеса.
                  Работаем с объёмами от 1 000 кв. м.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-2xl text-lg font-black bg-orange-600 text-white px-10 h-20 shadow-[0_20px_40px_-15px_rgba(234,88,12,0.5)] hover:bg-orange-700 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-wider"
                  >
                    Начать проект
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </a>
                  <a
                    href="#fefco"
                    className="inline-flex items-center justify-center rounded-2xl text-lg font-black border-2 border-gray-800 bg-gray-950/50 backdrop-blur-md px-10 h-20 hover:bg-gray-900 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-wider text-white"
                  >
                    Каталог FEFCO
                  </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-6 mt-16 pt-16 border-t border-white/[0.06]">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-2xl md:text-3xl font-black text-white tracking-tighter">{s.value}</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <PackagingQuiz />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Bento Features */}
      <section id="factory" className="py-40 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn direction="up">
            <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase mb-6">
                  Технологии <span className="text-orange-600">Будущего</span>
                </h2>
                <p className="text-xl text-gray-400 font-medium leading-relaxed">
                  Используем передовое оборудование для создания упаковки, которая выдерживает любые испытания.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="text-6xl font-black text-orange-600 tracking-tighter leading-none">01 /</div>
                <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mt-2">Принципы</div>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Big image card */}
            <Card className="md:col-span-2 md:row-span-2 overflow-hidden group h-80 md:h-auto min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80')`,
                }}
              />
              <div className="absolute bottom-10 left-10 right-10 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h4 className="text-3xl font-black text-white uppercase mb-2">Производство 24/7</h4>
                <p className="text-orange-50 font-medium">Автоматизированные линии последнего поколения.</p>
              </div>
            </Card>

            {features.slice(0, 2).map((feature, i) => (
              <Card
                key={i}
                className="md:col-span-2 p-10 flex flex-col justify-between hover:border-orange-600/50 transition-colors bg-gray-900/50 border-gray-800"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-600 flex items-center justify-center text-white mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white uppercase mb-2 tracking-tight">{feature.title}</h4>
                  <p className="text-gray-400 font-medium">{feature.description}</p>
                </div>
              </Card>
            ))}

            <Card className="md:col-span-1 p-10 flex flex-col justify-between bg-orange-600 border-none text-white">
              <Globe className="w-10 h-10 mb-6" />
              <p className="text-lg font-black uppercase leading-tight">Глобальные <br /> стандарты</p>
            </Card>

            <Card className="md:col-span-1 p-10 flex flex-col justify-between bg-gray-900/50 border-gray-800 hover:border-orange-600/50 transition-colors">
              <Clock className="w-10 h-10 text-orange-600 mb-6" />
              <div>
                <p className="text-white font-black text-xl uppercase leading-tight mb-1">Срок от 3 дней</p>
                <p className="text-gray-500 font-medium text-sm">От ТЗ до отгрузки</p>
              </div>
            </Card>

            <Card className="md:col-span-2 p-10 flex flex-col justify-between bg-gray-900/50 border-gray-800 hover:border-orange-600/50 transition-colors">
              <ShieldCheck className="w-10 h-10 text-orange-600 mb-6" />
              <div>
                <p className="text-white font-black text-xl uppercase leading-tight mb-1">Гарантия качества</p>
                <p className="text-gray-500 font-medium text-sm">
                  Входной контроль сырья, контроль на каждом этапе производства и выходная проверка.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-40 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn direction="up">
            <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase mb-6">
                  Наша <span className="text-orange-600">Продукция</span>
                </h2>
                <p className="text-xl text-gray-400 font-medium leading-relaxed">
                  Полный спектр решений для производственных и логистических нужд вашего бизнеса.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="text-6xl font-black text-orange-600 tracking-tighter leading-none">02 /</div>
                <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mt-2">Продукция</div>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <StaggerItem key={product.title}>
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-orange-600/50 group transition-all duration-500 p-8 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center text-orange-600 mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                      <product.icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-black text-white uppercase mb-3 tracking-tight">{product.title}</h4>
                    <p className="text-gray-400 font-medium text-sm leading-relaxed flex-grow">{product.description}</p>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-black text-orange-600 bg-orange-600/10 border border-orange-600/20 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 h-0.5 bg-orange-600 w-0 group-hover:w-full transition-all duration-700" />
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-40 bg-gray-950 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="right">
              <div>
                <div className="text-6xl font-black text-orange-600 tracking-tighter leading-none mb-4">03 /</div>
                <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-10">Почему мы</div>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase mb-8">
                  Ваш надёжный <span className="text-orange-600">партнёр</span>
                </h2>
                <p className="text-xl text-gray-400 font-medium leading-relaxed mb-12">
                  С 2008 года мы производим гофроупаковку для сотен компаний — от малого бизнеса до крупных
                  промышленных холдингов.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  {advantages.map((adv) => (
                    <div key={adv} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-orange-600/20 border border-orange-600/30 flex items-center justify-center flex-shrink-0">
                        <CheckCheck className="w-3 h-3 text-orange-600" />
                      </div>
                      <span className="text-gray-300 font-medium">{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-3xl border border-white/[0.06] bg-gray-900/50 p-8 flex flex-col items-center text-center"
                  >
                    <div className="text-4xl md:text-5xl font-black text-orange-600 tracking-tighter mb-3">
                      {s.value}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FEFCO Catalog */}
      <section id="fefco" className="py-40 bg-gray-950 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-4">
              <div className="flex-shrink-0">
                <div className="text-6xl font-black text-orange-600 tracking-tighter leading-none">04 /</div>
                <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mt-2">FEFCO</div>
              </div>
            </div>
          </FadeIn>
          <FefcoCatalog />
        </div>
      </section>

      {/* Contact / Order Form */}
      <section id="contact" className="py-40 bg-gray-950 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <FadeIn direction="right">
              <div>
                <div className="text-6xl font-black text-orange-600 tracking-tighter leading-none mb-4">05 /</div>
                <div className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-10">Контакт</div>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase mb-8">
                  Оставьте <span className="text-orange-600">Заявку</span>
                </h2>
                <p className="text-xl text-gray-400 font-medium leading-relaxed mb-12">
                  Заполните форму — мы рассчитаем стоимость и свяжемся с вами в течение одного рабочего дня.
                </p>

                {/* Contact details */}
                <div className="space-y-6">
                  <a
                    href="tel:+78001234567"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white font-black text-lg tracking-tight">+7 (800) 123-45-67</p>
                      <p className="text-gray-500 text-sm font-medium">Звонок бесплатный</p>
                    </div>
                  </a>
                </div>

                {/* Process steps */}
                <div className="mt-16 space-y-6">
                  <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Как это работает</h3>
                  {[
                    { num: "01", title: "Заявка", desc: "Заполните форму с параметрами" },
                    { num: "02", title: "Расчёт", desc: "Менеджер подберёт оптимальное решение" },
                    { num: "03", title: "Производство", desc: "Изготавливаем в срок от 3 дней" },
                    { num: "04", title: "Доставка", desc: "Привезём прямо на ваш склад" },
                  ].map((step) => (
                    <div key={step.num} className="flex items-center gap-5">
                      <span className="text-orange-600 font-black text-2xl tracking-tighter w-10 flex-shrink-0">{step.num}</span>
                      <div className="h-px flex-1 bg-white/[0.06]" />
                      <div className="text-right">
                        <p className="text-white font-black text-sm uppercase tracking-wider">{step.title}</p>
                        <p className="text-gray-500 text-xs font-medium mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="rounded-3xl border border-white/[0.06] bg-gray-900/50 p-10">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
                  Форма заявки
                </h3>
                <OrderForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
