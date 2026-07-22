"use client";

import { useState } from "react";
import { loginUser } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Input } from "@/components/ui-core";
import Navbar from "@/components/Navigation";
import { FadeIn } from "@/components/Animations";
import { Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await loginUser(formData);
    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col selection:bg-orange-500/30">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-6 pt-20">
        <FadeIn direction="up">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-[40px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <Card className="max-w-md w-[400px] border-white/5 bg-gray-900/80 backdrop-blur-3xl p-12">
              <div className="flex flex-col items-center mb-12">
                <div className="w-24 h-24 bg-white/[0.03] border border-white/10 rounded-3xl flex items-center justify-center mb-8">
                  <div className="w-10 h-10 rounded-full bg-orange-600 shadow-[0_0_30px_rgba(234,88,12,0.5)] animate-pulse" />
                </div>
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter text-center leading-none">
                  Вход <br /><span className="text-orange-600">Клиента</span>
                </h1>
                <p className="text-sm text-gray-500 mt-6 text-center font-medium leading-relaxed">
                  Используйте данные из вашей заявки для доступа к истории заказов.
                </p>
              </div>

              {error && (
                <div className="mb-8 p-5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest text-center rounded-2xl animate-in fade-in slide-in-from-top-2">
                  {error}
                </div>
              )}

              <form action={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 ml-2">Email или Телефон</label>
                  <Input 
                    name="identifier" 
                    required 
                    placeholder="example@mail.ru" 
                    className="h-16 text-center"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full h-20 text-sm"
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-6 w-6" />
                  ) : (
                    <>
                      Подтвердить
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-10 pt-10 border-t border-white/5 text-center">
                 <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                   Нужна помощь? <br />
                   <a href="/#contact" className="text-orange-600 hover:text-white transition-colors mt-2 inline-block italic">Связаться с поддержкой</a>
                 </p>
              </div>
            </Card>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
