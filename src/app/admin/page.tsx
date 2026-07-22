"use client";

import { useState, useEffect } from "react";
import { adminLogin as adminLoginAction, getAllLeads, adminLogout } from "@/app/actions";
import Navbar from "@/components/Navigation";
import AdminLeadRow from "@/components/AdminLeadRow";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";
import { Card, Button, Input } from "@/components/ui-core";
import { 
  LayoutDashboard, Inbox, Activity, CheckCircle2, LogOut, 
  Lock, Loader2, Shield 
} from "lucide-react";

const SESSION_KEY = "iru_admin_session";
const SESSION_MAX_AGE = 30 * 60 * 1000; // 30 минут

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Проверка сессии при загрузке
  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session) {
      const parsed = JSON.parse(session);
      const isExpired = Date.now() - parsed.timestamp > SESSION_MAX_AGE;
      if (!isExpired) {
        setIsAuthenticated(true);
        loadLeads();
      } else {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const loadLeads = async () => {
    setDataLoading(true);
    try {
      const data = await getAllLeads();
      setLeads(data);
    } catch (e) {
      console.error(e);
      // Если сервер вернул Unauthorized - разлогиниваем
      setIsAuthenticated(false);
      sessionStorage.removeItem(SESSION_KEY);
    }
    setDataLoading(false);
  };

  const handleLogin = async (formData: FormData) => {
    setLoginLoading(true);
    setError(null);
    const result = await adminLoginAction(formData);
    setLoginLoading(false);

    if (result.success) {
      // Сохраняем в sessionStorage (очищается при закрытии вкладки)
      sessionStorage.setItem(
        SESSION_KEY, 
        JSON.stringify({ timestamp: Date.now() })
      );
      setIsAuthenticated(true);
      loadLeads();
    } else {
      setError(result.error || "Ошибка входа");
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setLeads([]);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-950 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-6 py-20">
          <FadeIn direction="up">
            <Card className="max-w-md w-full border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-red-600" />
              <div className="p-12">
                <div className="flex flex-col items-center mb-10">
                  <div className="w-20 h-20 bg-orange-600/10 rounded-3xl flex items-center justify-center mb-6 border border-orange-600/20">
                    <Shield className="w-10 h-10 text-orange-600" />
                  </div>
                  <h1 className="text-3xl font-black text-white uppercase tracking-tighter text-center leading-none">
                    Контроль <br /><span className="text-orange-600">Доступа</span>
                  </h1>
                  <p className="text-sm text-gray-500 mt-4 text-center font-medium">
                    Введите код доступа для входа в систему управления.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold text-center">
                    {error}
                  </div>
                )}

                <form action={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">
                      Секретный код
                    </label>
                    <Input
                      name="secret"
                      type="password"
                      placeholder="••••••••••••"
                      required
                      autoFocus
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={loginLoading} 
                    className="w-full h-16"
                    size="lg"
                  >
                    {loginLoading ? (
                      <Loader2 className="animate-spin w-6 h-6" />
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Войти в систему
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-[10px] text-gray-600 text-center mt-6 uppercase tracking-widest font-bold">
                  Сессия истекает через 30 минут
                </p>
              </div>
            </Card>
          </FadeIn>
        </div>
      </main>
    );
  }

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    processing: leads.filter(l => l.status === 'processing' || l.status === 'shipped').length,
    completed: leads.filter(l => l.status === 'completed').length,
  };

  return (
    <main className="min-h-screen bg-gray-950 pb-20 selection:bg-orange-500/30">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                Control <span className="text-orange-600">Center</span>
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <p className="text-gray-400 font-medium">Система управления заказами.</p>
                <button 
                  onClick={handleLogout}
                  className="text-[10px] font-black uppercase text-orange-600 hover:text-white transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" /> Завершить сессию
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Система Online</span>
            </div>
          </div>
        </FadeIn>

        <StaggerContainer>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { label: "Всего заявок", value: stats.total, icon: LayoutDashboard, color: "text-blue-500" },
              { label: "Ожидают", value: stats.new, icon: Inbox, color: "text-orange-500" },
              { label: "В работе", value: stats.processing, icon: Activity, color: "text-amber-500" },
              { label: "Завершено", value: stats.completed, icon: CheckCircle2, color: "text-green-500" },
            ].map((stat, i) => (
              <StaggerItem key={i}>
                <Card className="bg-white/[0.02] border-white/5 p-6 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <stat.icon className="w-20 h-20" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">{stat.label}</p>
                  <p className={`text-4xl font-black ${stat.color} tracking-tighter`}>{stat.value}</p>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {dataLoading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-10 h-10 text-orange-600 animate-spin mx-auto" />
          </div>
        ) : leads.length === 0 ? (
          <div className="py-20 text-center">
             <Inbox className="w-16 h-16 text-gray-800 mx-auto mb-6" />
             <p className="text-gray-500 text-xl font-bold uppercase tracking-widest">Входящих заявок нет</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-4 mb-8 px-2">
               <div className="h-px flex-grow bg-white/5" />
               <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-600">Список последних обращений</h2>
               <div className="h-px flex-grow bg-white/5" />
            </div>
            <StaggerContainer>
              <div className="space-y-6">
                {leads.map((lead) => (
                  <StaggerItem key={lead.id}>
                    <AdminLeadRow lead={lead} onUpdate={loadLeads} onDelete={loadLeads} />
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        )}
      </div>
    </main>
  );
}
