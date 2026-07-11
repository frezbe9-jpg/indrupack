import { getUserLeads, logoutUser } from "@/app/actions";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from "@/components/ui-core";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";
import { Box, LogOut, Clock, MessageCircle, Package, Calendar } from "lucide-react";

export default async function DashboardPage() {
  const leadsData = await getUserLeads();

  if (!leadsData) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none mb-4">
              Мои <span className="text-orange-600">Заявки</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">История ваших обращений и ответы от нашей команды.</p>
          </div>
          <form action={logoutUser}>
            <Button variant="outline" className="rounded-2xl gap-2 font-bold uppercase tracking-widest text-xs">
              <LogOut className="w-4 h-4" />
              Выйти
            </Button>
          </form>
        </div>

        {leadsData.length === 0 ? (
          <Card className="p-20 text-center border-dashed border-2 border-gray-200 dark:border-gray-800">
            <Box className="w-20 h-20 text-gray-200 dark:text-gray-800 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">У вас пока нет заявок</h3>
            <p className="text-gray-500">Вернитесь на главную страницу, чтобы отправить первый запрос.</p>
            <a 
              href="/"
              className="mt-8 inline-flex items-center justify-center rounded-2xl text-sm font-bold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] bg-orange-600 text-white hover:bg-orange-700 shadow-[0_10px_20px_-10px_rgba(234,88,12,0.5)] h-12 px-6"
            >
              На главную
            </a>
          </Card>
        ) : (
          <StaggerContainer>
            <div className="grid grid-cols-1 gap-8">
              {leadsData.map((lead) => (
                <StaggerItem key={lead.id}>
                  <Card className="overflow-hidden border-none shadow-xl bg-white dark:bg-gray-900 transition-all hover:shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-4">
                      <div className="p-8 lg:border-r border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-6">
                          <div className={`w-3 h-3 rounded-full ${
                            lead.status === 'new' ? 'bg-orange-500 animate-pulse' : 'bg-green-500'
                          }`} />
                          <span className="text-xs font-black uppercase tracking-widest text-gray-500">
                            {lead.status === 'new' ? 'В обработке' : 'Обработано'}
                          </span>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-sm font-bold text-gray-900 dark:text-white">
                            <Calendar className="w-4 h-4 text-orange-600" />
                            {new Date(lead.createdAt!).toLocaleDateString('ru-RU')}
                          </div>
                          <div className="flex items-center gap-3 text-sm font-bold text-gray-900 dark:text-white">
                            <Package className="w-4 h-4 text-orange-600" />
                            {lead.squareMeters} кв. м
                          </div>
                        </div>
                      </div>

                      <div className="col-span-3 p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <MessageCircle className="w-4 h-4 text-gray-400" />
                              <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Ваше сообщение</h4>
                            </div>
                            <p className="text-gray-900 dark:text-white font-medium leading-relaxed">
                              {lead.message || "Без описания"}
                            </p>
                          </div>

                          <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-3xl border border-orange-100 dark:border-orange-900/30">
                            <div className="flex items-center gap-2 mb-4">
                              <Box className="w-4 h-4 text-orange-600" />
                              <h4 className="text-xs font-black uppercase tracking-widest text-orange-600">Ответ компании</h4>
                            </div>
                            <p className="text-gray-900 dark:text-white font-bold leading-relaxed italic">
                              {lead.response || "Ваша заявка принята и ожидает обработки специалистом. Мы скоро свяжемся с вами!"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        )}
      </div>
    </main>
  );
}
