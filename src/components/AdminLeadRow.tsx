"use client";

import { useState } from "react";
import { updateLeadStatus, deleteLead } from "@/app/actions";
import { Button, Textarea, Card } from "./ui-core";
import { Loader2, Send, Phone, Mail, User, Package, Ruler, MessageSquare, Trash2 } from "lucide-react";

export default function AdminLeadRow({ 
  lead, 
  onUpdate, 
  onDelete 
}: { 
  lead: any; 
  onUpdate?: () => void; 
  onDelete?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [response, setResponse] = useState(lead.response || "");
  const [status, setStatus] = useState(lead.status || "new");

  const handleUpdate = async () => {
    setLoading(true);
    await updateLeadStatus(lead.id, status, response);
    setLoading(false);
    if (onUpdate) onUpdate();
  };

  const handleDelete = async () => {
    if (confirm("Вы уверены, что хотите удалить эту заявку?")) {
      setDeleteLoading(true);
      await deleteLead(lead.id);
      setDeleteLoading(false);
      if (onDelete) onDelete();
    }
  };

  const statusOptions = [
    { value: "new", label: "Новая" },
    { value: "processing", label: "В производстве" },
    { value: "shipped", label: "Отгружено" },
    { value: "completed", label: "Доставлено" }
  ];

  return (
    <Card className="p-0 border-white/10 bg-white/[0.03] backdrop-blur-3xl overflow-hidden mb-8">
      <div className="absolute top-0 left-0 w-1 h-full bg-orange-600" />
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Client Info */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-3">Клиент</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-bold">{lead.name}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">{lead.phone}</span>
                </div>
                {lead.email && (
                  <div className="flex items-center gap-3 text-gray-400">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">{lead.email}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/5">
               <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Дата создания</p>
               <p className="text-sm text-white font-bold">
                 {new Date(lead.createdAt).toLocaleString('ru-RU')}
               </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-3">Спецификация</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="font-bold">{lead.quantity} шт.</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Ruler className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">{lead.length}x{lead.width}x{lead.height} мм</span>
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5 inline-block text-[10px] font-black text-orange-400 uppercase tracking-wider">
                  {lead.cardboardGrade}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Сообщение</p>
              <p className="text-sm text-gray-300 italic leading-relaxed">
                {lead.message || "Нет комментария"}
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="lg:col-span-6 space-y-6 bg-white/[0.02] p-6 rounded-[24px] border border-white/5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Текущий статус</p>
                 <div className="flex gap-2 mt-2">
                    {statusOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setStatus(opt.value)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                          status === opt.value 
                            ? "bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-600/20" 
                            : "bg-white/5 border-white/5 text-gray-500 hover:text-gray-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                 </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleDelete} 
                  disabled={deleteLoading}
                  variant="outline"
                  className="h-12 px-4 rounded-2xl border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500"
                  size="sm"
                >
                  {deleteLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </Button>
                <Button 
                  onClick={handleUpdate} 
                  disabled={loading}
                  className="h-12 px-6 rounded-2xl"
                  size="sm"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4 mr-2" /> Сохранить</>}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Ответ клиенту (виден в ЛК)</label>
              <Textarea 
                placeholder="Напишите расчет стоимости или уточнения..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="min-h-[120px] bg-gray-900 border-white/10 text-white text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
