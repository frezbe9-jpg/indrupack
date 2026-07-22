import { Button } from "@/components/ui-core";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-orange-500/10 rounded-3xl flex items-center justify-center mb-8">
        <Search className="w-12 h-12 text-orange-500" />
      </div>
      <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
        Страница не найдена
      </h1>
      <p className="text-gray-400 max-w-md mb-12 font-medium">
        К сожалению, запрашиваемая вами страница не существует или была перемещена.
      </p>
      <a 
        href="/"
        className="inline-flex items-center justify-center rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96] bg-orange-600 text-white hover:bg-orange-500 shadow-[0_0_0_1px_rgba(234,88,12,0.4),0_20px_40px_-10px_rgba(234,88,12,0.3)] h-16 px-10"
      >
        Вернуться на главную
      </a>
    </main>
  );
}
