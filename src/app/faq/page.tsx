import Navbar, { Footer } from "@/components/Navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";
import { Card, CardContent } from "@/components/ui-core";
import { HelpCircle, ChevronRight } from "lucide-react";

const faqs = [
  {
    question: "Чем отличается картон марки Т от марки П?",
    answer: "Марка Т — это трехслойный гофрокартон (два плоских слоя и один гофрированный), самый популярный для коробок. Марка П — пятислойный (три плоских и два гофрированных), используется для сверхтяжелых грузов и оборудования."
  },
  {
    question: "Какой минимальный тираж для заказа?",
    answer: "Мы специализируемся на оптовых поставках. Минимальный объем заказа составляет 1 000 квадратных метров полотна."
  },
  {
    question: "Занимаетесь ли вы печатью на упаковке?",
    answer: "Да, мы выполняем флексопечать (до 3-х цветов). Это позволяет брендировать вашу продукцию и сделать её узнаваемой на полке."
  },
  {
    question: "Как быстро происходит изготовление?",
    answer: "Стандартный срок производства составляет от 3 до 7 рабочих дней в зависимости от сложности конструкции и наличия сырья."
  },
  {
    question: "Предоставляете ли вы образцы?",
    answer: "Конечно. Перед запуском основной партии мы изготавливаем тестовый образец (плоттерная резка) для проверки размеров и прочности конструкции."
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-40 pb-32">
        <FadeIn direction="up">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
              База <span className="text-orange-600">Знаний</span>
            </h1>
            <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
              Все, что нужно знать о гофроупаковке, материалах и процессе заказа в одном месте.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <StaggerItem key={idx}>
                <Card className="bg-gray-900 border-gray-800 hover:border-orange-600/50 transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-orange-600/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 transition-colors">
                        <HelpCircle className="w-6 h-6 text-orange-600 group-hover:text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-orange-600 transition-colors">
                          {faq.question}
                        </h3>
                        <p className="text-gray-400 font-medium leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <FadeIn direction="up" delay={0.4}>
          <div className="mt-20 p-10 bg-orange-600 rounded-[2rem] text-center">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Не нашли ответа на свой вопрос?</h2>
            <p className="text-orange-100 font-bold mb-8">Свяжитесь с нашим технологом напрямую для бесплатной консультации.</p>
            <a 
              href="/#contact" 
              className="inline-flex items-center justify-center h-16 px-10 bg-white text-orange-600 font-black rounded-2xl uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95"
            >
              Задать вопрос
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </FadeIn>
      </div>
      <Footer />
    </main>
  );
}
