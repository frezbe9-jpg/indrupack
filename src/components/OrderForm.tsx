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

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Объем заказа (кв. м) *</label>
                <Input
                  name="squareMeters"
                  type="number"
                  min="1000"
                  defaultValue="1000"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Сообщение</label>
                <Textarea
                  name="message"
                  placeholder="Опишите ваши требования к упаковке..."
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
