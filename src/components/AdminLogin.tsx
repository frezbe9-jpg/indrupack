"use client";

import { useState } from "react";
import { adminLogin } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from "@/components/ui-core";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await adminLogin(formData);
    setLoading(false);

    if (result.success) {
      router.refresh();
    } else {
      setError(result.error || "Ошибка");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <Card className="max-w-md w-full border-gray-800 bg-gray-900">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-orange-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-orange-600" />
          </div>
          <CardTitle className="text-2xl font-black uppercase tracking-tighter text-white">Админ-панель</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <Input 
              name="secret" 
              type="password" 
              placeholder="Введите секретный код" 
              className="bg-gray-800 border-gray-700"
              required 
            />
            {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
            <Button type="submit" className="w-full h-14" disabled={loading}>
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Войти"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
