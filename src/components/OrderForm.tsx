"use client";

import { useState } from "react";
import { submitLead } from "@/app/actions";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  Button, 
  Input, 
  Textarea 
} from "./ui-core";
import { FadeIn } from "./Animations";

export default function OrderForm() {
  const [status, setStatus] = useState<{ success?: string; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setStatus(null);
    const result = await submitLead(formData);
    setLoading(false);
    setStatus(result);
    if (result.success) {
      const form = document.getElementById("order-form") as HTMLFormElement;
      if (form) form.reset();
    }
  }

  return (
    <FadeIn direction="right">
      <Card className="border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] bg-white/5 backdrop-blur-3xl overflow-hidden p-0">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600" />
        <div className="p-12">
          <CardHeader className="p-0 pb-12">
            <CardTitle className="text-5xl font-black uppercase tracking-tighter leading-[0.85] text-white">
              Запрос <br />
              <span className="text-orange-500">На Расчет</span>
            </CardTitle>
            <CardDescription className="text-xl mt-8 leading-relaxed text-gray-400 font-medium">
              Минимальный заказ от 1 000 кв. метров. <br /> Ответим в течение 15 минут.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {status?.success && (
              <div className="mb-12 p-8 bg-green-500/10 border border-green-500/20 text-green-400 rounded-[32px] flex items-center gap-6 animate-in fade-in slide-in-from-top-6 duration-700">
                <CheckCircle2 className="w-10 h-10 flex-shrink-0" />
                <p className="font-bold text-lg">{status.success}</p>
              </div>
            )}

            {status?.error && (
              <div className="mb-12 p-8 bg-red-500/10 border border-red-500/20 text-red-400 rounded-[32px] flex items-center gap-6 animate-in fade-in slide-in-from-top-6 duration-700">
                <AlertCircle className="w-10 h-10 flex-shrink-0" />
                <p className="font-bold text-lg">{status.error}</p>
              </div>
            )}

            <form id="order-form" action={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Ваше имя *</label>
                <Input
                  name="name"
                  type="text"
                  required
                  placeholder="Иванов Александр"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Телефон *</label>
                  <Input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Email</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="alex@company.ru"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Длина (мм) *</label>
                  <Input name="length" type="number" required placeholder="300" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Ширина (мм) *</label>
                  <Input name="width" type="number" required placeholder="200" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Высота (мм) *</label>
                  <Input name="height" type="number" required placeholder="150" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Тираж (шт.) *</label>
                  <Input
                    name="quantity"
                    type="number"
                    min="10"
                    defaultValue="1000"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Марка картона</label>
                  <select 
                    name="cardboardGrade"
                    className="flex h-16 w-full rounded-3xl border border-white/10 bg-white/[0.03] px-8 text-base text-white outline-none focus:ring-2 focus:ring-orange-500/50 appearance-none cursor-pointer transition-all"
                  >
                    <option value="Т-21" className="bg-gray-900">Т-21 (Эконом)</option>
                    <option value="Т-22" className="bg-gray-900">Т-22 (Стандарт)</option>
                    <option value="Т-23" className="bg-gray-900" selected>Т-23 (Усиленный)</option>
                    <option value="Т-24" className="bg-gray-900">Т-24 (Премиум)</option>
                    <option value="П-32" className="bg-gray-900">П-32 (Пятислойный)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Дополнительно</label>
                <Textarea
                  name="message"
                  placeholder="Укажите код FEFCO (если знаете) или другие пожелания..."
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                size="xl"
                className="w-full h-24 text-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-4 h-8 w-8 animate-spin" />
                    Отправка
                  </>
                ) : (
                  <>
                    Отправить запрос
                    <Send className="ml-4 h-8 w-8" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </div>
      </Card>
    </FadeIn>
  );
}
