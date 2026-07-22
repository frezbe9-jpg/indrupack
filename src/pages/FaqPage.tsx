import { useState } from "react";
import { ChevronDown, Search, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { FadeIn, StaggerContainer, StaggerItem } from "../components/Animations";

const categories = [
  { id: "all", label: "Все вопросы" },
  { id: "materials", label: "Материалы" },
  { id: "order", label: "Заказ" },
  { id: "delivery", label: "Доставка" },
  { id: "design", label: "Дизайн" },
];

const faqs = [
  {
    category: "materials",
    question: "Какие марки картона вы используете?",
    answer:
      "Мы работаем с трёхслойным (Т-21, Т-23, Т-24) и пятислойным (П-32, П-33) гофрокартоном. Выбор марки зависит от массы товара, условий хранения и требований к прочности. Наш менеджер поможет подобрать оптимальный вариант.",
  },
  {
    category: "materials",
    question: "Чем отличается трёхслойный картон от пятислойного?",
    answer:
      "Трёхслойный (Т) состоит из двух плоских слоёв и одного гофрированного — подходит для лёгких и средних грузов. Пятислойный (П) имеет два гофрированных слоя — значительно прочнее и используется для тяжёлых, хрупких и ценных товаров.",
  },
  {
    category: "materials",
    question: "Есть ли у вас экологичные материалы?",
    answer:
      "Да, весь наш картон производится из вторичного сырья и подлежит повторной переработке. Мы сертифицированы по стандартам FSC и активно снижаем углеродный след производства.",
  },
  {
    category: "order",
    question: "Какой минимальный тираж заказа?",
    answer:
      "Минимальный тираж зависит от типа упаковки: для стандартных размеров — от 500 штук, для нестандартных конструкций и высечки — от 1 000 штук. При меньших объёмах возможно производство по предварительному согласованию.",
  },
  {
    category: "order",
    question: "Как происходит расчёт стоимости?",
    answer:
      "Стоимость рассчитывается индивидуально и зависит от: размеров коробки, марки картона, конструкции FEFCO, тиража, наличия печати и покрытия. После получения заявки наш менеджер пришлёт коммерческое предложение в течение 24 часов.",
  },
  {
    category: "order",
    question: "Можно ли заказать образцы перед основным тиражом?",
    answer:
      "Да, мы производим пробные образцы. Стоимость образцов включается в стоимость основного заказа при его оформлении. Срок изготовления образцов — 1–2 рабочих дня.",
  },
  {
    category: "order",
    question: "Нужны ли технические чертежи для заказа?",
    answer:
      "Нет. Нам достаточно указать габариты (Д × Ш × В в мм), тираж и желаемый код FEFCO. Если у вас есть собственные чертежи или макеты — мы примем их в любом формате (PDF, DXF, AI, CDR).",
  },
  {
    category: "delivery",
    question: "В какие регионы вы доставляете?",
    answer:
      "Мы осуществляем доставку по всей России. Работаем со всеми ведущими транспортными компаниями (СДЭК, Деловые линии, ПЭК и др.), а также организуем доставку собственным транспортом в пределах Москвы и Московской области.",
  },
  {
    category: "delivery",
    question: "Каковы сроки производства и доставки?",
    answer:
      "Стандартные сроки производства: 3–7 рабочих дней в зависимости от объёма и сложности. Доставка по Москве — 1 день, по России — 3–14 дней в зависимости от региона. Мы всегда предупреждаем о сроках заранее.",
  },
  {
    category: "design",
    question: "Можете разработать конструкцию упаковки с нуля?",
    answer:
      "Да! Наш конструкторский отдел разрабатывает уникальные конструкции под технические требования клиента. Мы создаём 3D-модели, макеты и тестируем их на прочность перед запуском в серию.",
  },
  {
    category: "design",
    question: "Что такое стандарты FEFCO?",
    answer:
      "FEFCO (Европейская федерация производителей гофрокартона) разработала международный каталог стандартных конструкций упаковки. Каждый тип имеет числовой код (например, 0201). Использование кодов FEFCO позволяет точно описать конструкцию и избежать разночтений при заказе.",
  },
  {
    category: "design",
    question: "Возможна ли флексографическая печать на коробках?",
    answer:
      "Да, мы выполняем одно- и многоцветную флексографическую печать. Доступна печать водными и УФ-красками. Поддерживаем форматы макетов: PDF, AI, CDR. Максимальное количество цветов — 6.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-300",
        open ? "border-orange-600/40 bg-orange-600/5" : "border-white/[0.06] bg-gray-900/50 hover:border-white/10"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-7 text-left cursor-pointer"
      >
        <span className="text-white font-bold text-base pr-8 leading-snug">{question}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-orange-600 flex-shrink-0 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-7">
              <div className="h-px bg-white/[0.06] mb-5" />
              <p className="text-gray-400 font-medium leading-relaxed text-sm">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "all" || f.category === activeCategory;
    const matchSearch =
      search.trim() === "" ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen bg-gray-950 pt-32 pb-32 selection:bg-orange-500/30">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn direction="up">
          <div className="mb-16">
            <div className="inline-flex items-center gap-3 rounded-full border border-orange-900/50 bg-gray-900/80 px-5 py-2 text-xs font-black text-orange-500 uppercase tracking-[0.2em] mb-8">
              <BookOpen className="w-4 h-4" />
              База знаний
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
              Часто задаваемые <span className="text-orange-600">вопросы</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium leading-relaxed">
              Всё, что нужно знать о гофроупаковке, материалах и процессе заказа в одном месте.
            </p>
          </div>
        </FadeIn>

        {/* Search */}
        <FadeIn direction="up" delay={0.1}>
          <div className="relative mb-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Поиск по вопросам..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-14 pr-5 rounded-2xl border border-white/10 bg-gray-900/50 text-white font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all text-sm"
            />
          </div>
        </FadeIn>

        {/* Category Tabs */}
        <FadeIn direction="up" delay={0.15}>
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer",
                  activeCategory === cat.id
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                    : "border border-white/10 text-gray-400 hover:text-white hover:border-white/20 bg-gray-900/50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* FAQ Items */}
        {filtered.length > 0 ? (
          <StaggerContainer>
            <div className="space-y-4">
              {filtered.map((faq, i) => (
                <StaggerItem key={i}>
                  <FaqItem question={faq.question} answer={faq.answer} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-400 font-medium text-lg">Ничего не найдено</p>
            <p className="text-gray-600 text-sm mt-2">Попробуйте другой запрос</p>
          </div>
        )}

        {/* CTA */}
        <FadeIn direction="up" delay={0.3}>
          <div className="mt-20 rounded-3xl border border-orange-900/30 bg-orange-950/20 p-10 text-center">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
              Не нашли ответ?
            </h3>
            <p className="text-gray-400 font-medium mb-8">
              Напишите нам — ответим на любой вопрос об упаковке в течение одного рабочего дня.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-2xl text-sm font-black bg-orange-600 text-white px-8 h-14 shadow-lg shadow-orange-600/30 hover:bg-orange-700 transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider"
            >
              Задать вопрос
            </a>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
