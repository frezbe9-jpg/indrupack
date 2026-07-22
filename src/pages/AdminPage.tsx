import { useState, useEffect } from "react";
import {
  Shield,
  LogOut,
  Package,
  Trash2,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Search,
  Eye,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";
import { Badge, Button } from "../components/ui-core";
import { FadeIn, StaggerContainer, StaggerItem } from "../components/Animations";

const ADMIN_SECRET = "admin123";

type OrderStatus = "new" | "processing" | "shipped" | "completed";

type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string;
  fefcoCode: string;
  length: number;
  width: number;
  height: number;
  quantity: number;
  cardboardGrade: string;
  message: string;
  status: OrderStatus;
  response: string;
  createdAt: string;
};

const statusConfig: Record<OrderStatus, { label: string; badgeVariant: "info" | "warning" | "default" | "success" }> = {
  new: { label: "Новая", badgeVariant: "info" },
  processing: { label: "В работе", badgeVariant: "warning" },
  shipped: { label: "Отгружено", badgeVariant: "default" },
  completed: { label: "Завершено", badgeVariant: "success" },
};

const INITIAL_LEADS: Lead[] = [
  {
    id: 1001,
    name: "Иван Петров",
    phone: "+79001234567",
    email: "test@example.com",
    fefcoCode: "0201",
    length: 300,
    width: 200,
    height: 150,
    quantity: 5000,
    cardboardGrade: "Т-23",
    message: "Нужна упаковка для электроники, желательно с печатью логотипа.",
    status: "processing",
    response: "Ваш заказ принят в производство. Расчётная дата отгрузки — 15 января 2025 г.",
    createdAt: "2025-01-08",
  },
  {
    id: 1002,
    name: "Мария Сидорова",
    phone: "+79009876543",
    email: "demo@company.ru",
    fefcoCode: "0201",
    length: 400,
    width: 300,
    height: 200,
    quantity: 15000,
    cardboardGrade: "Т-23",
    message: "Упаковка для продуктов питания.",
    status: "shipped",
    response: "Ваш заказ отгружен сегодня. Трек-номер: СДЭ-8472619.",
    createdAt: "2025-01-05",
  },
  {
    id: 1003,
    name: "ООО «Стройматериалы»",
    phone: "+74951234567",
    email: "zakaz@stroy.ru",
    fefcoCode: "0300",
    length: 600,
    width: 400,
    height: 400,
    quantity: 2000,
    cardboardGrade: "П-32",
    message: "Необходима прочная упаковка для керамической плитки.",
    status: "new",
    response: "",
    createdAt: "2025-01-10",
  },
  {
    id: 1004,
    name: "ИП Козлов Д.А.",
    phone: "+79161234567",
    email: "kozlov@mail.ru",
    fefcoCode: "0427",
    length: 200,
    width: 200,
    height: 200,
    quantity: 50000,
    cardboardGrade: "Т-21",
    message: "Подарочная упаковка для сезонной акции, нужна флексопечать.",
    status: "completed",
    response: "Заказ успешно доставлен. Спасибо за сотрудничество!",
    createdAt: "2024-12-28",
  },
  {
    id: 1005,
    name: "Алексей Новиков",
    phone: "+79251234567",
    email: "",
    fefcoCode: "0701",
    length: 350,
    width: 250,
    height: 200,
    quantity: 8000,
    cardboardGrade: "Т-23",
    message: "Авто-сборная коробка для интернет-магазина.",
    status: "new",
    response: "",
    createdAt: "2025-01-11",
  },
];

function LeadRow({ lead, onStatusChange, onResponseSave, onDelete }: {
  lead: Lead;
  onStatusChange: (id: number, status: OrderStatus) => void;
  onResponseSave: (id: number, response: string) => void;
  onDelete: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [response, setResponse] = useState(lead.response);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    onResponseSave(lead.id, response);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-white/[0.06] bg-gray-900/50 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-orange-600/10 border border-orange-600/20 flex items-center justify-center flex-shrink-0">
            <Package className="w-5 h-5 text-orange-600" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-white font-black text-sm">#{lead.id}</span>
              <span className="text-white font-bold text-sm truncate">{lead.name}</span>
              <Badge variant={statusConfig[lead.status].badgeVariant}>
                {statusConfig[lead.status].label}
              </Badge>
            </div>
            <span className="text-gray-500 text-xs font-medium">
              {lead.phone} · FEFCO {lead.fefcoCode} · {lead.quantity.toLocaleString()} шт · {lead.createdAt}
            </span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5">
              <div className="h-px bg-white/[0.06]" />

              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: "Телефон", value: lead.phone },
                  { label: "Email", value: lead.email || "—" },
                  { label: "FEFCO", value: `FEFCO ${lead.fefcoCode}` },
                  { label: "Материал", value: lead.cardboardGrade },
                  { label: "Размеры", value: `${lead.length}×${lead.width}×${lead.height} мм` },
                  { label: "Тираж", value: `${lead.quantity.toLocaleString()} шт` },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-3">
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-white text-sm font-bold">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Message */}
              {lead.message && (
                <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-4">
                  <p className="text-gray-600 text-[10px] font-black uppercase tracking-wider mb-1">Сообщение клиента</p>
                  <p className="text-gray-300 text-sm font-medium">{lead.message}</p>
                </div>
              )}

              {/* Status */}
              <div>
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-wider mb-2">Статус заказа</p>
                <select
                  value={lead.status}
                  onChange={(e) => onStatusChange(lead.id, e.target.value as OrderStatus)}
                  className="h-11 w-full md:w-64 rounded-2xl border border-white/10 bg-gray-800 px-4 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer"
                >
                  <option value="new">Новая заявка</option>
                  <option value="processing">В производстве</option>
                  <option value="shipped">Отгружено</option>
                  <option value="completed">Завершено</option>
                </select>
              </div>

              {/* Response */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-orange-600" />
                  <p className="text-gray-600 text-[10px] font-black uppercase tracking-wider">Ответ клиенту</p>
                </div>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Напишите ответ для клиента..."
                  rows={3}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white font-medium placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none"
                />
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-orange-600 text-white text-xs font-black uppercase tracking-wider hover:bg-orange-700 transition-all cursor-pointer disabled:opacity-70"
                  >
                    {saving ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Сохраняем...</>
                    ) : saved ? (
                      <><CheckCircle2 className="w-3.5 h-3.5" /> Сохранено!</>
                    ) : (
                      <>Сохранить ответ</>
                    )}
                  </button>
                  <button
                    onClick={() => onDelete(lead.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-red-900/40 text-red-500 text-xs font-black uppercase tracking-wider hover:bg-red-950/30 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    if (code === ADMIN_SECRET) {
      sessionStorage.setItem("iru_admin", "true");
      onLogin();
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <FadeIn direction="up">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gray-800 border border-white/10 mb-6">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Админ-панель</h1>
            <p className="text-gray-500 font-medium text-sm">Введите секретный код для доступа</p>
          </div>

          <div className="rounded-3xl border border-white/[0.06] bg-gray-900/80 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-3">
                  Секретный код
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setError(false); }}
                  className={cn(
                    "flex h-14 w-full rounded-2xl border bg-white/5 px-5 text-sm text-white font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all",
                    error
                      ? "border-red-500/50 focus:ring-red-500/50"
                      : "border-white/10 focus:ring-orange-500/50 focus:border-orange-500/50"
                  )}
                />
                {error && (
                  <p className="text-red-400 text-xs font-medium mt-2">Неверный код доступа</p>
                )}
              </div>
              <Button type="submit" size="lg" disabled={loading} className="w-full">
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Проверяем...</> : "Войти"}
              </Button>
            </form>
            <p className="text-center text-gray-600 text-xs mt-4">Демо-код: admin123</p>
          </div>
        </div>
      </FadeIn>
    </main>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<"all" | OrderStatus>("all");

  useEffect(() => {
    if (sessionStorage.getItem("iru_admin") === "true") setAuthed(true);
  }, []);

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const handleLogout = () => {
    sessionStorage.removeItem("iru_admin");
    setAuthed(false);
  };

  const handleStatusChange = (id: number, status: OrderStatus) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const handleResponseSave = (id: number, response: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, response } : l)));
  };

  const handleDelete = (id: number) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const filtered = leads.filter((l) => {
    const matchStatus = activeStatus === "all" || l.status === activeStatus;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      l.name.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.email.toLowerCase().includes(q) ||
      String(l.id).includes(q);
    return matchStatus && matchSearch;
  });

  const counts = {
    all: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    processing: leads.filter((l) => l.status === "processing").length,
    shipped: leads.filter((l) => l.status === "shipped").length,
    completed: leads.filter((l) => l.status === "completed").length,
  };

  return (
    <main className="min-h-screen bg-gray-950 pb-20 selection:bg-orange-500/30">
      {/* Admin Nav */}
      <div className="border-b border-white/[0.06] bg-gray-950/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gray-800 border border-white/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-white font-black text-sm uppercase tracking-wider">Админ-панель ИРУ</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white text-xs font-bold cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Выйти
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        {/* Stats */}
        <FadeIn direction="up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Всего заявок", value: counts.all, icon: BarChart3, color: "text-white" },
              { label: "Новых", value: counts.new, icon: Clock, color: "text-blue-400" },
              { label: "В работе", value: counts.processing, icon: TrendingUp, color: "text-orange-400" },
              { label: "Завершено", value: counts.completed, icon: CheckCircle2, color: "text-green-400" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/[0.06] bg-gray-900/50 p-6">
                <stat.icon className={cn("w-6 h-6 mb-3", stat.color)} />
                <div className={cn("text-4xl font-black tracking-tighter mb-1", stat.color)}>{stat.value}</div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Search + Filters */}
        <FadeIn direction="up" delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Поиск по имени, телефону, ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-11 pr-5 rounded-2xl border border-white/10 bg-gray-900/50 text-white text-sm font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "new", "processing", "shipped", "completed"] as ("all" | OrderStatus)[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveStatus(s)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer",
                    activeStatus === s
                      ? "bg-orange-600 text-white"
                      : "border border-white/10 text-gray-400 hover:text-white bg-gray-900/50"
                  )}
                >
                  {s === "all" ? "Все" : statusConfig[s].label}
                  <span className="ml-1.5 opacity-70">{s === "all" ? counts.all : counts[s]}</span>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Leads */}
        {filtered.length > 0 ? (
          <StaggerContainer>
            <div className="space-y-3">
              {filtered.map((lead) => (
                <StaggerItem key={lead.id}>
                  <LeadRow
                    lead={lead}
                    onStatusChange={handleStatusChange}
                    onResponseSave={handleResponseSave}
                    onDelete={handleDelete}
                  />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        ) : (
          <div className="text-center py-20">
            <Eye className="w-16 h-16 text-gray-800 mx-auto mb-4" />
            <p className="text-gray-400 font-bold text-lg">Заявки не найдены</p>
            <p className="text-gray-600 text-sm mt-2">Попробуйте изменить фильтры</p>
          </div>
        )}
      </div>
    </main>
  );
}
