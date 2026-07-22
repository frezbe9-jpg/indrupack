"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui-core";
import Navbar from "@/components/Navigation";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-red-500/10 rounded-3xl flex items-center justify-center mb-8">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>
      <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
        Что-то пошло не так
      </h1>
      <p className="text-gray-400 max-w-md mb-12 font-medium">
        Произошла непредвиденная ошибка на сервере. Мы уже работаем над её устранением.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} size="lg">
          Попробовать снова
        </Button>
        <Button variant="outline" onClick={() => window.location.href = "/"} size="lg">
          На главную
        </Button>
      </div>
    </main>
  );
}
