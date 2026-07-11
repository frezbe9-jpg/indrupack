import Image from "next/image";
import Navbar, { Footer } from "@/components/Navigation";
import OrderForm from "@/components/OrderForm";
import PackagingQuiz from "@/components/PackagingQuiz";
import FefcoCatalog from "@/components/FefcoCatalog";
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
  Award
} from "lucide-react";
import { Card, CardContent } from "@/components/ui-core";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";

export default function Home() {
  const products = [
    {
      title: "Гофрокороба",
      description: "Индивидуальные решения для логистики и ритейла.",
      icon: Package,
      tags: ["Картон", "Упаковка"]
    },
    {
      title: "Гофрокартон",
      description: "Листовой картон марок Т-21, Т-23, П-32.",
      icon: Layers,
      tags: ["Сырье", "Листы"]
    },
    {
      title: "Сложная высечка",
      description: "Конструкции любой формы по вашим чертежам.",
      icon: Settings,
      tags: ["Дизайн", "Форма"]
    },
    {
      title: "Комплектующие",
      description: "Решетки и вкладыши для защиты товара.",
      icon: BarChart3,
      tags: ["Защита", "Детали"]
    }
  ];

  const features = [
    {
      title: "Собственное производство",
      description: "Полный контроль качества на каждом этапе изготовления.",
      icon: Factory
    },
    {
      title: "Быстрая логистика",
      description: "Доставка заказов по всей России точно в срок.",
      icon: Truck
    },
    {
      title: "Индивидуальный дизайн",
      description: "Разработка уникальной конструкции упаковки под ваш продукт.",
      icon: Zap
    },
    {
      title: "Эко-материалы",
      description: "Используем только перерабатываемое сырье высшего качества.",
      icon: Globe
    }
  ];

  return (
    <main className="min-h-screen bg-gray-950 selection:bg-orange-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950 z-10" />
          <Image
            src="/cardboard-hero.jpg"
            alt="Packaging warehouse"
            fill
            className="object-cover object-center scale-110"
            priority
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn direction="up">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 rounded-full border border-orange-900/50 bg-gray-900/80 px-5 py-2 text-xs font-black text-orange-600 uppercase tracking-[0.2em] mb-10 backdrop-blur-xl shadow-xl">
                  <Award className="w-4 h-4" />
                  №1 в Индивидуальной Упаковке
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] mb-10 tracking-tighter uppercase">
                  Грани <br />
                  <span className="text-orange-600">Совершенства</span> <br />
                  Упаковки
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed font-medium">
                  Мы превращаем обычный картон в надежную броню для вашего бизнеса. Работаем с объемами от 1 000 кв. м.
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
              </div>
            </FadeIn>

            <FadeIn direction="left">
               <PackagingQuiz />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
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

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            <Card className="md:col-span-2 md:row-span-2 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
              <Image 
                src="/manufacturing.jpg" 
                alt="Production" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute bottom-10 left-10 right-10 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h4 className="text-3xl font-black text-white uppercase mb-2">Производство 24/7</h4>
                <p className="text-orange-50 font-medium">Автоматизированные линии последнего поколения.</p>
              </div>
            </Card>
            
            {features.slice(0, 2).map((feature, i) => (
              <Card key={i} className="md:col-span-2 p-10 flex flex-col justify-between hover:border-orange-600/50 transition-colors bg-gray-900/50 border-gray-800">
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
            
            <Card className="md:col-span-1 p-10 flex flex-col justify-between bg-gray-900/50 border-gray-800 hover:bg-gray-900 transition-colors cursor-pointer">
               <Zap className="w-10 h-10 text-orange-600 mb-6" />
               <p className="text-lg font-black uppercase leading-tight text-white">Индивидуальный <br /> дизайн</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-40 bg-gray-900/30 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-10">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              Наш <span className="text-orange-600">Спектр</span>
            </h2>
            <div className="h-px flex-grow bg-gray-800 hidden lg:block mx-10" />
            <div className="flex gap-4">
               <div className="text-right">
                 <p className="text-2xl font-black text-white leading-none">100+</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Видов упаковки</p>
               </div>
            </div>
          </div>
          
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((item, idx) => (
                <StaggerItem key={idx}>
                  <Card className="h-full group hover:shadow-[0_30px_60px_-15px_rgba(234,88,12,0.1)] hover:-translate-y-4 border-gray-800 bg-gray-950 overflow-hidden">
                    <CardContent className="p-10">
                      <div className="w-16 h-16 bg-gray-900 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-orange-600 transition-colors duration-500">
                        <item.icon className="w-8 h-8 text-orange-600 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <div className="flex gap-2 mb-4">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-orange-600/50">{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{item.title}</h3>
                      <p className="text-gray-400 font-medium leading-relaxed mb-8">{item.description}</p>
                      <button className="text-sm font-black uppercase tracking-widest text-gray-400 group-hover:text-orange-600 transition-colors flex items-center gap-2">
                        Подробнее <ArrowRight className="w-4 h-4" />
                      </button>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* FEFCO Catalog Section */}
          <div id="fefco" className="scroll-mt-32">
            <FefcoCatalog />
          </div>
        </div>
      </section>

      {/* Advantages / Stats */}
      <section id="advantages" className="py-40 bg-gray-950 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <FadeIn direction="left">
              <div>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-12">
                  Почему <br />
                  <span className="text-orange-600">Партнеры</span> <br />
                  Выбирают Нас
                </h2>
                <div className="space-y-12">
                  <div className="flex gap-8 group">
                    <div className="text-4xl font-black text-gray-900 group-hover:text-orange-600 transition-colors duration-500">01</div>
                    <div>
                      <h4 className="text-xl font-black uppercase text-white mb-3 tracking-tight">Сертифицированное качество</h4>
                      <p className="text-lg text-gray-400 font-medium">Каждая партия проходит многоступенчатый контроль в собственной лаборатории.</p>
                    </div>
                  </div>
                  <div className="flex gap-8 group">
                    <div className="text-4xl font-black text-gray-900 group-hover:text-orange-600 transition-colors duration-500">02</div>
                    <div>
                      <h4 className="text-xl font-black uppercase text-white mb-3 tracking-tight">Скорость и масштабируемость</h4>
                      <p className="text-lg text-gray-400 font-medium">Выполняем срочные заказы объемом до 100 000 кв. м в неделю.</p>
                    </div>
                  </div>
                  <div className="flex gap-8 group">
                    <div className="text-4xl font-black text-gray-900 group-hover:text-orange-600 transition-colors duration-500">03</div>
                    <div>
                      <h4 className="text-xl font-black uppercase text-white mb-3 tracking-tight">Экономия на логистике</h4>
                      <p className="text-lg text-gray-400 font-medium">Оптимизируем размеры упаковки для максимально плотной загрузки транспорта.</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="right">
              <div className="relative">
                <div className="aspect-square bg-gray-900 rounded-[4rem] relative flex items-center justify-center overflow-hidden">
                   <div className="absolute top-0 right-0 w-full h-full opacity-10">
                      <div className="grid grid-cols-10 h-full">
                        {Array.from({length: 100}).map((_, i) => (
                          <div key={i} className="border-[0.5px] border-orange-600" />
                        ))}
                      </div>
                   </div>
                   <div className="relative z-10 text-center">
                     <div className="text-[12rem] font-black text-orange-600 leading-none tracking-tighter opacity-10 absolute inset-0 flex items-center justify-center select-none pointer-events-none">10</div>
                     <p className="text-9xl font-black text-white leading-none tracking-tighter mb-4">10</p>
                     <p className="text-xl font-black uppercase tracking-[0.5em] text-orange-600">Лет Опыта</p>
                   </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-40 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/cardboard-hero.jpg" alt="BG" fill className="object-cover" />
          <div className="absolute inset-0 bg-gray-950" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div>
              <h2 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase mb-12">
                Создадим <br />
                <span className="text-orange-600">Ваш Проект</span> <br />
                Вместе
              </h2>
              <div className="space-y-16">
                 <div>
                   <p className="text-gray-400 text-sm font-black uppercase tracking-widest mb-4">Наш адрес</p>
                   <p className="text-2xl font-black text-white uppercase tracking-tight">Москва, Индустриальный проезд, 14</p>
                 </div>
                 <div className="grid grid-cols-2 gap-10">
                   <div>
                     <p className="text-gray-400 text-sm font-black uppercase tracking-widest mb-4">Телефон</p>
                     <p className="text-xl font-black text-white">+7 (800) 000-00-00</p>
                   </div>
                   <div>
                     <p className="text-gray-400 text-sm font-black uppercase tracking-widest mb-4">Email</p>
                     <p className="text-xl font-black text-white">info@iru-pack.ru</p>
                   </div>
                 </div>
              </div>
            </div>
            
            <OrderForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
