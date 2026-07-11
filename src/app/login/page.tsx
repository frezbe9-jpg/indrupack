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
    <main className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-6 pt-32 pb-20">
        <FadeIn direction="up">
          <Card className="max-w-md w-full border-none shadow-2xl bg-white dark:bg-gray-900">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-black uppercase tracking-tighter">Личный Кабинет</CardTitle>
              <CardDescription className="text-base mt-2">
                Введите Email или Телефон, указанный при подаче заявки, чтобы войти.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-sm font-bold text-center">
                  {error}
                </div>
              )}
              <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Идентификатор</label>
                  <Input 
                    name="identifier" 
                    required 
                    placeholder="Email или +7..." 
                    className="rounded-2xl"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading} 
                  size="lg" 
                  className="w-full rounded-2xl uppercase font-black tracking-widest"
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <>
                      Войти
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </main>
  );
}
