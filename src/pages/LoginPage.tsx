import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, LogIn, AlertCircle, Loader2, Phone, Mail } from "lucide-react";
import { Button } from "../components/ui-core";
import { FadeIn } from "../components/Animations";
import { cn } from "../utils/cn";

// Demo data
const DEMO_USERS = [
  { email: "test@example.com", phone: "+79001234567", name: "Иван Петров", id: "user1" },
  { email: "demo@company.ru", phone: "+79009876543", name: "Мария Сидорова", id: "user2" },
];

export default function LoginPage() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!value.trim()) {
      setError("Введите email или номер телефона");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const user = DEMO_USERS.find(
      (u) => u.email === value.trim() || u.phone === value.trim()
    );

    if (user) {
      sessionStorage.setItem("iru_user", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      setError("Пользователь с таким email или телефоном не найден");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-6 selection:bg-orange-500/30">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <FadeIn direction="up">
        <div className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-orange-600 mb-6 shadow-2xl shadow-orange-600/40">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
              Личный кабинет
            </h1>
            <p className="text-gray-400 font-medium text-sm">
              Войдите, чтобы отслеживать ваши заказы
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl border border-white/[0.06] bg-gray-900/80 backdrop-blur-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-3">
                  Email или телефон
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-500">
                    {value.includes("@") ? (
                      <Mail className="w-4 h-4" />
                    ) : (
                      <Phone className="w-4 h-4" />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="mail@company.ru или +7 (900) 123-45-67"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      setError("");
                    }}
                    className={cn(
                      "flex h-14 w-full rounded-2xl border bg-white/5 pl-11 pr-5 py-3 text-sm text-white font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all",
                      error
                        ? "border-red-500/50 focus:ring-red-500/50"
                        : "border-white/10 focus:ring-orange-500/50 focus:border-orange-500/50"
                    )}
                  />
                </div>
                {error && (
                  <p className="flex items-center gap-1.5 text-red-400 text-xs font-medium mt-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {error}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full shadow-2xl shadow-orange-600/30 hover:-translate-y-0.5 transition-transform"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Проверяем...
                  </>
                ) : (
                  <>
                    Войти
                    <LogIn className="ml-3 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Demo hint */}
            <div className="mt-8 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Демо-доступ</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-600" />
                  <button
                    onClick={() => setValue("test@example.com")}
                    className="text-gray-400 text-xs font-medium hover:text-orange-500 transition-colors cursor-pointer"
                  >
                    test@example.com
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-600" />
                  <button
                    onClick={() => setValue("+79001234567")}
                    className="text-gray-400 text-xs font-medium hover:text-orange-500 transition-colors cursor-pointer"
                  >
                    +79001234567
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-600 text-xs font-medium mt-6">
            Для получения доступа оставьте заявку на сайте
          </p>
        </div>
      </FadeIn>
    </main>
  );
}
