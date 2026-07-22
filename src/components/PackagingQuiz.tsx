import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle2, RotateCcw, Package } from "lucide-react";
import { cn } from "../utils/cn";

type Answers = {
  product: string;
  weight: string;
  storage: string;
  quantity: string;
};

const questions = [
  {
    id: "product",
    question: "Что вы упаковываете?",
    options: [
      { value: "food", label: "Продукты питания", emoji: "🍎" },
      { value: "electronics", label: "Электроника", emoji: "📱" },
      { value: "heavy", label: "Тяжёлые грузы", emoji: "⚙️" },
      { value: "cosmetics", label: "Косметика/товары", emoji: "🧴" },
    ],
  },
  {
    id: "weight",
    question: "Масса единицы товара?",
    options: [
      { value: "light", label: "До 1 кг", emoji: "🪶" },
      { value: "medium", label: "1–5 кг", emoji: "📦" },
      { value: "heavy", label: "5–20 кг", emoji: "🔩" },
      { value: "very_heavy", label: "Свыше 20 кг", emoji: "🏗️" },
    ],
  },
  {
    id: "storage",
    question: "Условия хранения и транспортировки?",
    options: [
      { value: "dry", label: "Сухой склад", emoji: "🏬" },
      { value: "humid", label: "Влажная среда", emoji: "💧" },
      { value: "outdoor", label: "Уличные условия", emoji: "🌧️" },
      { value: "refrigerated", label: "Холодильник", emoji: "❄️" },
    ],
  },
  {
    id: "quantity",
    question: "Планируемый тираж?",
    options: [
      { value: "small", label: "1 000 – 5 000 шт", emoji: "📋" },
      { value: "medium", label: "5 000 – 20 000 шт", emoji: "📊" },
      { value: "large", label: "20 000 – 100 000 шт", emoji: "🏭" },
      { value: "xlarge", label: "Свыше 100 000 шт", emoji: "🚀" },
    ],
  },
];

function getRecommendation(answers: Answers) {
  const isHeavy = answers.product === "heavy" || answers.weight === "very_heavy";
  const isWet = answers.storage === "humid" || answers.storage === "outdoor";
  const isBig = answers.quantity === "large" || answers.quantity === "xlarge";

  if (isHeavy && isWet) {
    return {
      fefco: "0203",
      grade: "П-32 (пятислойный)",
      desc: "Максимальная прочность и влагостойкость. Идеал для тяжёлых грузов во влажных условиях.",
      color: "from-red-600 to-orange-600",
    };
  } else if (isHeavy) {
    return {
      fefco: "0201",
      grade: "Т-24 (трёхслойный усиленный)",
      desc: "Высокая прочность на сжатие. Надёжная защита тяжёлых и габаритных изделий.",
      color: "from-orange-600 to-amber-500",
    };
  } else if (isBig) {
    return {
      fefco: "0701",
      grade: "Т-23 (трёхслойный)",
      desc: "Автоматическое дно для скоростных линий упаковки. Выгодно при больших тиражах.",
      color: "from-blue-600 to-cyan-500",
    };
  } else {
    return {
      fefco: "0427",
      grade: "Т-21 (трёхслойный)",
      desc: "Самосборная конструкция — оптимальный выбор по соотношению цены и качества.",
      color: "from-green-600 to-emerald-500",
    };
  }
}

export default function PackagingQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [done, setDone] = useState(false);

  const currentQ = questions[step];

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setDone(true), 300);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
  };

  const result = done ? getRecommendation(answers as Answers) : null;

  return (
    <div className="rounded-3xl border border-white/10 bg-gray-900/80 backdrop-blur-xl p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center">
          <Package className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-black text-sm uppercase tracking-widest">Подбор упаковки</p>
          <p className="text-gray-500 text-xs font-medium">Ответьте на 4 вопроса</p>
        </div>
        {!done && (
          <div className="ml-auto text-orange-600 font-black text-2xl tracking-tighter">
            {step + 1}/{questions.length}
          </div>
        )}
      </div>

      {/* Progress */}
      {!done && (
        <div className="flex gap-2 mb-8">
          {questions.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-500",
                i <= step ? "bg-orange-600" : "bg-white/10"
              )}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-black text-white mb-6 leading-tight">
              {currentQ.question}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {currentQ.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="flex flex-col items-start gap-2 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-orange-600/20 hover:border-orange-600/50 transition-all text-left active:scale-95 cursor-pointer group"
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors leading-tight">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <h3 className="text-xl font-black text-white">Рекомендация готова!</h3>
            </div>

            <div className={cn("rounded-2xl p-6 mb-6 bg-gradient-to-br", result?.color)}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/70 text-xs font-black uppercase tracking-widest">Конструкция</span>
                <span className="text-white font-black text-3xl">FEFCO {result?.fefco}</span>
              </div>
              <p className="text-white font-black text-lg mb-1">{result?.grade}</p>
              <p className="text-white/80 text-sm font-medium leading-relaxed">{result?.desc}</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 mb-6">
              <p className="text-orange-500 text-xs font-black uppercase tracking-widest mb-2">
                Рекомендация эксперта
              </p>
              <p className="text-gray-300 text-sm font-medium leading-relaxed">
                {(answers.product === "heavy" || answers.storage === "humid")
                  ? "Пятислойный картон марки П-32 для максимальной защиты."
                  : "Трёхслойный картон марки Т-23 — оптимальный выбор."}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm font-bold cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Начать заново
              </button>
              <a
                href="#contact"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-orange-600 text-white hover:bg-orange-700 transition-all text-sm font-black uppercase tracking-wider"
              >
                Оформить заявку
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
