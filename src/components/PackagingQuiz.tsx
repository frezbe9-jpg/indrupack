"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from "./ui-core";
import { ChevronRight, ChevronLeft, Package, Shield, Truck, Check, Loader2 } from "lucide-react";
import { submitLead } from "@/app/actions";

interface Option {
  label: string;
  value: string;
  icon?: any;
}

interface Step {
  id: string;
  title: string;
  options: Option[];
}

const steps: Step[] = [
  {
    id: "product",
    title: "Что вы упаковываете?",
    options: [
      { label: "Хрупкие товары", value: "fragile", icon: Shield },
      { label: "Тяжелое оборудование", value: "heavy", icon: Package },
      { label: "Продукты питания", value: "food", icon: Truck },
      { label: "Мелкие товары", value: "small", icon: Package },
    ]
  },
  {
    id: "storage",
    title: "Условия хранения?",
    options: [
      { label: "Сухой склад", value: "dry" },
      { label: "Высокая влажность", value: "humid" },
      { label: "Заморозка", value: "cold" },
    ]
  },
  {
    id: "printing",
    title: "Нужна ли печать?",
    options: [
      { label: "Без печати", value: "no_print" },
      { label: "В 1-2 цвета", value: "1_2_colors" },
      { label: "Полноцветная", value: "full_color" },
    ]
  }
];

export default function PackagingQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelect = (value: string) => {
    const stepId = steps[currentStep].id;
    setAnswers({ ...answers, [stepId]: value });
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleContactSubmit = async (formData: FormData) => {
    setLoading(true);
    const quizSummary = JSON.stringify(answers);
    formData.append("quizResults", quizSummary);
    await submitLead(formData);
    setLoading(false);
    alert("Заявка с результатами теста отправлена!");
    window.location.reload();
  };

  return (
    <Card className="p-0 border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-[0_64px_128px_-32px_rgba(0,0,0,0.6)]">
      <CardHeader className="p-10 pb-0">
        <CardTitle className="text-3xl font-black uppercase tracking-tighter leading-none text-white">
          {!isFinished ? `Подбор ${currentStep + 1}/${steps.length}` : "Результат"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-10 pt-8">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">{steps[currentStep].title}</h3>
              <div className="grid grid-cols-1 gap-4">
                {steps[currentStep].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className="flex items-center gap-6 p-8 rounded-[32px] bg-white/[0.03] border border-white/5 hover:border-orange-500/50 hover:bg-white/[0.06] transition-all duration-500 text-left group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-orange-600/10 flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-500">
                      {option.icon ? <option.icon className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors duration-500" /> : <div className="w-3 h-3 rounded-full bg-orange-500 group-hover:bg-white" />}
                    </div>
                    <span className="text-lg font-bold text-gray-300 group-hover:text-white transition-colors duration-500">{option.label}</span>
                  </button>
                ))}
              </div>
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex items-center text-xs font-black uppercase tracking-[0.2em] text-gray-500 hover:text-orange-500 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> Назад
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <div className="p-8 bg-orange-600 rounded-[40px] shadow-2xl shadow-orange-600/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
                <h4 className="relative z-10 text-white font-black uppercase tracking-[0.3em] text-[10px] mb-4">Рекомендация эксперта</h4>
                <p className="relative z-10 text-2xl font-black text-white leading-tight uppercase tracking-tight">
                  {answers.product === "heavy" || answers.storage === "humid" 
                    ? "Пятислойный картон марки П-32 для максимальной защиты."
                    : "Трехслойный картон марки Т-23 — оптимальный выбор."}
                </p>
              </div>

              <form action={handleContactSubmit} className="space-y-6">
                <div className="space-y-4">
                   <Input name="name" placeholder="Ваше имя" required />
                   <Input name="phone" placeholder="Телефон" required />
                </div>
                <Button type="submit" disabled={loading} size="xl" className="w-full h-24">
                  {loading ? <Loader2 className="animate-spin h-8 w-8" /> : "Получить расчет"}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
