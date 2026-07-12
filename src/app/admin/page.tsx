import { getAllLeads } from "@/app/actions";
import Navbar from "@/components/Navigation";
import AdminLeadRow from "@/components/AdminLeadRow";
import AdminLogin from "@/components/AdminLogin";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";
import { cookies } from "next/headers";
import { Card, CardContent } from "@/components/ui-core";
import { LayoutDashboard, Inbox, Activity, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminSecret = process.env.ADMIN_SECRET;
  const adminCookie = cookieStore.get("admin_access")?.value;
  
  const isAdmin = adminSecret && adminCookie === adminSecret;

  if (!isAdmin) {
    return <AdminLogin />;
  }

  let leads: any[] = [];
  try {
    leads = await getAllLeads();
  } catch (e) {
    console.error(e);
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
              <p className="text-gray-400 font-medium">Система управления заказами и взаимодействием с клиентами.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Система Online</span>
            </div>
          </div>
        </FadeIn>

        {/* Stats Grid */}
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

        {leads.length === 0 ? (
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
                    <AdminLeadRow lead={lead} />
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
