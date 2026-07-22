import { getUserLeads, logoutUser } from "@/app/actions";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navigation";
import { Card, CardContent, Button } from "@/components/ui-core";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";
import { Box, LogOut, Package, Ruler, Calendar, MessageSquare, CheckCircle2, Truck, Factory, Clock } from "lucide-react";

const statusConfig = {
  new: { label: "Заявка принята", color: "bg-blue-500", icon: Clock, progress: 25 },
  processing: { label: "В производстве", color: "bg-orange-500", icon: Factory, progress: 50 },
  shipped: { label: "Отгружено", color: "bg-amber-500", icon: Truck, progress: 75 },
  completed: { label: "Доставлено", color: "bg-green-500", icon: CheckCircle2, progress: 100 },
};

export default async function DashboardPage() {
  const leadsData = await getUserLeads();

  if (!leadsData) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-950 pb-32 selection:bg-orange-500/30">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-40">
        <FadeIn direction="down">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                Мои <span className="text-orange-600">Заказы</span>
              </h1>
              <p className="text-xl text-gray-400 font-medium max-w-2xl">
                Отслеживайте статус ваших заявок и процесс производства в реальном времени.
              </p>
            </div>
            <form action={logoutUser}>
              <button 
                type="submit"
                className="flex items-center gap-3 px-6 h-14 rounded-2xl bg-white/5 border border-white/10 text-gray-400 font-black uppercase tracking-widest text-[10px] hover:bg-white/10 hover:text-white transition-all active:scale-95"
              >
                <LogOut className="w-4 h-4" />
                Выход из кабинета
              </button>
            </form>
          </div>
        </FadeIn>

        {leadsData.length === 0 ? (
          <FadeIn direction="up">
            <Card className="p-24 text-center border-dashed border-2 border-white/10 bg-transparent">
              <Box className="w-24 h-24 text-white/5 mx-auto mb-10" />
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">У вас пока нет активных заказов</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-10 font-medium leading-relaxed">
                Все поданные вами заявки на расчет будут отображаться здесь автоматически.
              </p>
              <a 
                href="/#contact"
                className="inline-flex items-center justify-center h-16 px-10 rounded-2xl bg-orange-600 text-white font-black uppercase tracking-widest text-sm hover:bg-orange-500 transition-all active:scale-95"
              >
                Оформить первую заявку
              </a>
            </Card>
          </FadeIn>
        ) : (
          <StaggerContainer>
            <div className="space-y-12">
              {leadsData.map((lead) => {
                const currentStatus = statusConfig[lead.status as keyof typeof statusConfig] || statusConfig.new;
                const StatusIcon = currentStatus.icon;

                return (
                  <StaggerItem key={lead.id}>
                    <Card className="overflow-hidden border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-2xl hover:bg-white/[0.04] transition-all duration-500">
                      <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* Summary Column */}
                        <div className="lg:col-span-3 p-10 border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.01]">
                          <div className="flex items-center gap-4 mb-10">
                             <div className={`w-12 h-12 rounded-2xl ${currentStatus.color} flex items-center justify-center shadow-lg shadow-${currentStatus.color.split('-')[1]}-500/20`}>
                                <StatusIcon className="w-6 h-6 text-white" />
                             </div>
                             <div>
                               <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">Статус</p>
                               <p className="text-lg font-black text-white uppercase tracking-tighter leading-none">{currentStatus.label}</p>
                             </div>
                          </div>

                          <div className="space-y-8">
                             <div className="flex gap-4">
                                <Calendar className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                <div>
                                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Дата заявки</p>
                                   <p className="text-sm font-bold text-white">{new Date(lead.createdAt!).toLocaleDateString('ru-RU')}</p>
                                </div>
                             </div>
                             <div className="flex gap-4">
                                <Package className="w-5 h-5 text-orange-600 flex-shrink-0" />
                                <div>
                                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Тираж</p>
                                   <p className="text-sm font-bold text-white">{lead.quantity} шт.</p>
                                </div>
                             </div>
                          </div>
                        </div>

                        {/* Tracking Column */}
                        <div className="lg:col-span-9 p-10 space-y-12">
                          {/* Progress Bar */}
                          <div>
                            <div className="flex justify-between items-center mb-6">
                               <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Прогресс исполнения</p>
                               <span className="text-xs font-black text-orange-600">{currentStatus.progress}%</span>
                            </div>
                            <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                               <div 
                                 className={`h-full ${currentStatus.color} rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(234,88,12,0.3)]`}
                                 style={{ width: `${currentStatus.progress}%` }}
                               />
                            </div>
                            <div className="grid grid-cols-4 mt-6">
                               {Object.entries(statusConfig).map(([key, cfg]) => (
                                 <div key={key} className={`text-[8px] font-black uppercase tracking-widest text-center ${lead.status === key ? 'text-white' : 'text-gray-700'}`}>
                                   {cfg.label}
                                 </div>
                               ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                             <div className="space-y-6">
                                <div>
                                   <div className="flex items-center gap-3 mb-4">
                                      <Ruler className="w-4 h-4 text-orange-600" />
                                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Характеристики</p>
                                   </div>
                                   <div className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 space-y-3">
                                      <p className="text-sm font-medium text-gray-400">Габариты: <span className="text-white font-bold">{lead.length}x{lead.width}x{lead.height} мм</span></p>
                                      <p className="text-sm font-medium text-gray-400">Материал: <span className="text-white font-bold">{lead.cardboardGrade}</span></p>
                                      {lead.fefcoCode && <p className="text-sm font-medium text-gray-400">Конструкция: <span className="text-white font-bold">FEFCO {lead.fefcoCode}</span></p>}
                                   </div>
                                </div>
                             </div>

                             <div className="space-y-6">
                                <div>
                                   <div className="flex items-center gap-3 mb-4">
                                      <MessageSquare className="w-4 h-4 text-orange-600" />
                                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Ответ технолога</p>
                                   </div>
                                   <div className="p-8 bg-orange-600 rounded-3xl shadow-xl shadow-orange-600/10 relative overflow-hidden group">
                                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
                                      <p className="relative z-10 text-white font-bold leading-relaxed italic text-sm">
                                         {lead.response || "Ваша заявка на расчете. Наши специалисты свяжутся с вами для уточнения деталей в течение рабочего дня."}
                                      </p>
                                   </div>
                                </div>
                             </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        )}
      </div>
    </main>
  );
}
