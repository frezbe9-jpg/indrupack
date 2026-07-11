"use client";

import { useState } from "react";
import { updateLeadStatus } from "@/app/actions";
import { Button, Input, Textarea, Card } from "./ui-core";
import { Loader2, Send } from "lucide-react";

export default function AdminLeadRow({ lead }: { lead: any }) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(lead.response || "");
  const [status, setStatus] = useState(lead.status || "new");

  const handleUpdate = async () => {
    setLoading(true);
    await updateLeadStatus(lead.id, status, response);
    setLoading(false);
  };

  return (
    <Card className="p-6 bg-gray-900 border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-1">
          <p className="text-xs font-black text-orange-600 uppercase">Клиент</p>
          <p className="font-bold text-white">{lead.name}</p>
          <p className="text-sm text-gray-400">{lead.phone}</p>
          <p className="text-sm text-gray-400">{lead.email}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-black text-orange-600 uppercase">Детали</p>
          <p className="text-sm text-white font-bold">{lead.squareMeters} кв. м</p>
          <p className="text-xs text-gray-400 mt-2">Запрос:</p>
          <p className="text-sm text-gray-300">{lead.message || "Нет сообщения"}</p>
        </div>
          <div className="md:col-span-2 space-y-4">
          <div className="flex gap-4 items-center">
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              className="bg-white/10 border border-white/10 text-white text-sm rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-600 outline-none appearance-none cursor-pointer"
            >
              <option value="new" className="bg-gray-900">Новая</option>
              <option value="processing" className="bg-gray-900">В работе</option>
              <option value="completed" className="bg-gray-900">Завершена</option>
            </select>
            <Button 
              size="sm" 
              onClick={handleUpdate} 
              disabled={loading}
              className="h-10 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-orange-500/20 shadow-lg"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4 mr-2" /> Обновить</>}
            </Button>
          </div>
          <Textarea 
            placeholder="Ваш ответ клиенту..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="min-h-[100px] bg-white/[0.05] border-white/10 text-sm focus:ring-orange-500 rounded-2xl"
          />
        </div>
      </div>
    </Card>
  );
}
