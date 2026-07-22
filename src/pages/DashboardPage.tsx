import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  LogOut,
  CheckCircle2,
  Truck,
  RotateCcw,
  FileText,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Badge } from "../components/ui-core";
import { FadeIn, StaggerContainer, StaggerItem } from "../components/Animations";

type OrderStatus = "new" | "processing" | "shipped" | "completed";

type Order = {
  id: number;
  fefcoCode: string;
  length: number;
  width: number;
  height: number;
  quantity: number;
  cardboardGrade: string;
  status: OrderStatus;
  response: string;
  message: string;
  createdAt: string;
};

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; icon: React.ElementType; progress: number; badgeVariant: "info" | "warning" | "default" | "success" }
> = {
  new: {
    label: "Новая заявка",
    color: "text-blue-400",
    icon: FileText,
    progress: 25,
    badgeVariant: "info",
  },
  processing: {
    label: "В производстве",
    color: "text-orange-400",
    icon: RotateCcw,
    progress: 50,
    badgeVariant: "warning",
  },
  shipped: {
    label: "Отгружено",
    color: "text-yellow-400",
    icon: Truck,
    progress: 75,
    badgeVariant: "default",
  },
  completed: {
    label: "Доставлено",
    color: "text-green-400",
    icon: CheckCircle2,
    progress: 100,
    badgeVariant: "success",
  },
};

// Demo orders for different users
const DEMO_ORDERS: Record<string, Order[]> = {
  user1: [
    {
      id: 1001,
      fefcoCode: "0201",
      length: 300,
      width: 200,
      height: 150,
      quantity: 5000,
      cardboardGrade: "Т-23",
      status: "processing",
      response:
        "Ваш заказ принят в производство. Расчётная дата отгрузки — 15 января 2025 г. Напоминаем, что наш менеджер свяжется с вами за день до отгрузки.",
      message: "Нужна упаковка для электроники, желательно с печатью логотипа.",
      createdAt: "2025-01-08",
    },
    {
      id: 1002,
      fefcoCode: "0427",
      length: 500,
      width: 400,
      height: 300,
      quantity: 2000,
      cardboardGrade: "П-32",
      status: "completed",
      response:
        "Заказ успешно доставлен на ваш склад 28 декабря. Спасибо за сотрудничество! Будем рады видеть вас снова.",
      message: "Упаковка для тяжёлого промышленного оборудования.",
      createdAt: "2024-12-20",
    },
    {
      id: 1003,
      fefcoCode: "0300",
      length: 150,
      width: 150,
      height: 100,
      quantity: 10000,
      cardboardGrade: "Т-21",
      status: "new",
      response: "",
      message: "Подарочная упаковка для косметики.",
      createdAt: "2025-01-10",
    },
  ],
  user2: [
    {
      id: 2001,
      fefcoCode: "0201",
      length: 400,
      width: 300,
      height: 200,
      quantity: 15000,
      cardboardGrade: "Т-23",
      status: "shipped",
      response:
        "Ваш заказ отгружен сегодня. Трек-номер: СДЭ-8472619. Ожидаемая дата доставки — 12 января 2025 г.",
      message: "Упаковка для продуктов питания.",
      createdAt: "2025-01-05",
    },
  ],
};

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const config = statusConfig[order.status];

  return (
    <div className="rounded-3xl border border-white/[0.06] bg-gray-900/50 overflow-hidden transition-all hover:border-white/10">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-7 text-left cursor-pointer"
      >
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center">
            <Package className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-white font-black text-base">Заказ #{order.id}</span>
              <Badge variant={config.badgeVariant}>{config.label}</Badge>
            </div>
            <span className="text-gray-500 text-xs font-medium">
              FEFCO {order.fefcoCode} · {order.quantity.toLocaleString()} шт · {order.createdAt}
            </span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>

      {/* Progress Bar */}
      <div className="px-7 pb-4">
        <div className="flex items-center justify-between mb-2">
          {(["new", "processing", "shipped", "completed"] as OrderStatus[]).map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  statusConfig[s].progress <= config.progress
                    ? "bg-orange-600"
                    : "bg-gray-700"
                )}
              />
              {i < 3 && (
                <div
                  className={cn(
                    "h-px w-12 md:w-20 lg:w-28 transition-colors",
                    statusConfig[s].progress < config.progress ? "bg-orange-600" : "bg-gray-700"
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-gray-600 mt-1">
          <span>Принята</span>
          <span>Производство</span>
          <span>Отгрузка</span>
          <span>Доставка</span>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-7 space-y-6">
              <div className="h-px bg-white/[0.06]" />

              {/* Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Конструкция", value: `FEFCO ${order.fefcoCode}` },
                  { label: "Материал", value: order.cardboardGrade },
                  { label: "Габариты", value: `${order.length}×${order.width}×${order.height} мм` },
                  { label: "Тираж", value: `${order.quantity.toLocaleString()} шт` },
                ].map((spec) => (
                  <div key={spec.label} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                    <p className="text-gray-500 text-xs font-black uppercase tracking-wider mb-1">{spec.label}</p>
                    <p className="text-white font-bold text-sm">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Message */}
              {order.message && (
                <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500 text-xs font-black uppercase tracking-wider">Ваши пожелания</span>
                  </div>
                  <p className="text-gray-300 text-sm font-medium leading-relaxed">{order.message}</p>
                </div>
              )}

              {/* Response */}
              <div className="rounded-2xl border border-orange-900/30 bg-orange-950/20 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-500 text-xs font-black uppercase tracking-wider">Ответ технолога</span>
                </div>
                <p className="text-gray-300 text-sm font-medium leading-relaxed">
                  {order.response ||
                    "Ваша заявка на расчёте. Наши специалисты свяжутся с вами для уточнения деталей в течение рабочего дня."}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string; id: string } | null>(null);
  const [activeStatus, setActiveStatus] = useState<"all" | OrderStatus>("all");

  useEffect(() => {
    const stored = sessionStorage.getItem("iru_user");
    if (!stored) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  if (!user) return null;

  const orders = DEMO_ORDERS[user.id] || [];
  const filtered =
    activeStatus === "all" ? orders : orders.filter((o) => o.status === activeStatus);

  const counts = {
    all: orders.length,
    new: orders.filter((o) => o.status === "new").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    completed: orders.filter((o) => o.status === "completed").length,
  };

  const handleLogout = () => {
    sessionStorage.removeItem("iru_user");
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-gray-950 pt-10 pb-20 selection:bg-orange-500/30">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <FadeIn direction="up">
          <div className="flex items-center justify-between mb-12 pt-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/30">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-black text-lg tracking-tight">Личный кабинет</p>
                <p className="text-gray-500 text-sm font-medium">{user.name} · {user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm font-bold cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Выйти
            </button>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn direction="up" delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Всего заказов", value: counts.all, color: "text-white" },
              { label: "Новых", value: counts.new, color: "text-blue-400" },
              { label: "В работе", value: counts.processing, color: "text-orange-400" },
              { label: "Завершено", value: counts.completed, color: "text-green-400" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/[0.06] bg-gray-900/50 p-6 text-center"
              >
                <div className={cn("text-4xl font-black tracking-tighter mb-1", stat.color)}>
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn direction="up" delay={0.15}>
          <div className="flex flex-wrap gap-3 mb-8">
            {(["all", "new", "processing", "shipped", "completed"] as ("all" | OrderStatus)[]).map(
              (s) => (
                <button
                  key={s}
                  onClick={() => setActiveStatus(s)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer",
                    activeStatus === s
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                      : "border border-white/10 text-gray-400 hover:text-white hover:border-white/20 bg-gray-900/50"
                  )}
                >
                  {s === "all" ? "Все" : statusConfig[s].label}
                  <span className="ml-2 text-[10px] opacity-70">
                    {s === "all" ? counts.all : counts[s]}
                  </span>
                </button>
              )
            )}
          </div>
        </FadeIn>

        {/* Orders */}
        {filtered.length > 0 ? (
          <StaggerContainer>
            <div className="space-y-4">
              {filtered.map((order) => (
                <StaggerItem key={order.id}>
                  <OrderCard order={order} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        ) : (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-800 mx-auto mb-4" />
            <p className="text-gray-400 font-bold text-lg">Нет заказов</p>
            <p className="text-gray-600 text-sm mt-2">В этой категории пока нет заказов</p>
          </div>
        )}

        {/* New Order CTA */}
        <div className="mt-16 rounded-3xl border border-orange-900/30 bg-orange-950/20 p-10 text-center">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
            Новый заказ
          </h3>
          <p className="text-gray-400 font-medium mb-8">
            Разместите новую заявку — ответим в течение одного рабочего дня.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center rounded-2xl text-sm font-black bg-orange-600 text-white px-8 h-14 shadow-lg shadow-orange-600/30 hover:bg-orange-700 transition-all hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider"
          >
            Оставить заявку
          </a>
        </div>
      </div>
    </main>
  );
}
