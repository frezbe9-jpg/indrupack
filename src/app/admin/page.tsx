"use client";

import { useState, useEffect } from "react";
import { adminLogin as adminLoginAction, getAllLeads, adminLogout } from "@/app/actions";
import Navbar from "@/components/Navigation";
import AdminLeadRow from "@/components/AdminLeadRow";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";
import { Card, Button, Input } from "@/components/ui-core";
import { 
  LogOut, 
  Lock, 
  Loader2, 
  Shield, 
  Inbox,
  Search,
  Filter
} from "lucide-react";

const SESSION_KEY = "iru_admin_session";
const SESSION_MAX_AGE = 30 * 60 * 1000; // 30 минут

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session) {
      const parsed = JSON.parse(session);
      if (Date.now() - parsed.timestamp < SESSION_MAX_AGE) {
        setIsAuthenticated(true);
        loadLeads();
      } else sessionStorage.removeItem(SESSION_KEY);
    }
    setLoading(false);
  }, []);

  const loadLeads = async () => {
    setDataLoading(true);
    try {
      const data = await getAllLeads();
      setLeads(data);
    } catch (e) {
      setIsAuthenticated(false);
      sessionStorage.removeItem(SESSION_KEY);
    }
    setDataLoading(false);
  };

  const handleLogin = async (formData: FormData) => {
    setLoginLoading(true);
    const result = await adminLoginAction(formData);
    setLoginLoading(false);
    if (result.success) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ timestamp: Date.now() }));
      setIsAuthenticated(true);
      loadLeads();
    } else setError(result.error || "Ошибка");
  };

  if (loading) return <main className="min-h-screen bg-gray-950 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-orange-600" /></main>;

  if (!isAuthenticated) return (
    <main className="min-h-screen bg-gray-950 flex flex-col selection:bg-orange-500/30">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-6 pt-20">
        <FadeIn direction="up">
          <Card className="max-w-md w-[380px] border-white/5 bg-white/[0.02] backdrop-blur-3xl p-10">
            <div className="flex flex-col items-center mb-10">
              <div className="w-16 h-16 bg-orange-600/10 border border-orange-600/20 rounded-2xl flex items-center justify-center mb-6"><Shield className="w-8 h-8 text-orange-600" /></div>
              <h1 className="text-2xl font-black text-white uppercase tracking-tighter text-center">Admin Access</h1>
            </div>
            {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase text-center rounded-xl">{error}</div>}
            <form action={handleLogin} className="space-y-6">
              <Input name="secret" type="password" placeholder="S E C R E T" required className="text-center" />
              <Button type="submit" disabled={loginLoading} className="w-full h-16">{loginLoading ? <Loader2 className="animate-spin w-6 h-6" /> : "Authorize"}</Button>
            </form>
          </Card>
        </FadeIn>
      </div>
    </main>
  );

  const filteredLeads = leads.filter(l => {
    const searchStr = search.toLowerCase();
    const matchesSearch = l.name.toLowerCase().includes(searchStr) || 
                          l.phone.includes(searchStr) || 
                          (l.email && l.email.toLowerCase().includes(searchStr));
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    processing: leads.filter(l => l.status === 'processing').length,
    completed: leads.filter(l => l.status === 'completed').length,
  };

  return (
    <main className="min-h-screen bg-gray-950 pb-20 selection:bg-orange-500/30">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-16 items-start">
          <div className="flex-grow">
            <h1 className="text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">Command <br /><span className="text-orange-600">Center</span></h1>
            <div className="flex items-center gap-4">
              <p className="text-gray-400 font-medium">B2B Lead Management System</p>
              <button onClick={() => { adminLogout(); sessionStorage.removeItem(SESSION_KEY); setIsAuthenticated(false); }} className="text-[10px] font-black uppercase text-orange-600 hover:text-white transition-all flex items-center gap-1"><LogOut className="w-3 h-3" /> Terminate Session</button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
            {[{v: stats.total, l: "Total"}, {v: stats.new, l: "New", c: "text-orange-500"}, {v: stats.processing, l: "Active", c: "text-blue-500"}, {v: stats.completed, l: "Done", c: "text-green-500"}].map((s, i) => (
              <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col justify-center min-w-[100px]">
                <p className={`text-3xl font-black leading-none mb-2 ${s.c || "text-white"}`}>{s.v}</p>
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-600 leading-none">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           <div className="lg:col-span-3 space-y-8">
              <Card className="p-8 bg-white/[0.01] border-white/5 space-y-8 sticky top-32">
                 <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                       <Search className="w-3 h-3" />
                       <label className="text-[10px] font-black uppercase tracking-widest leading-none">Search Leads</label>
                    </div>
                    <Input placeholder="Client info..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-12 text-sm px-4" />
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                       <Filter className="w-3 h-3" />
                       <label className="text-[10px] font-black uppercase tracking-widest leading-none">Status Filter</label>
                    </div>
                    <div className="flex flex-col gap-2">
                       {["all", "new", "processing", "shipped", "completed"].map(f => (
                         <button key={f} onClick={() => setStatusFilter(f)} className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase text-left transition-all duration-300 ${statusFilter === f ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" : "bg-white/5 text-gray-500 hover:bg-white/10"}`}>{f}</button>
                       ))}
                    </div>
                 </div>
              </Card>
           </div>
           
           <div className="lg:col-span-9 space-y-6">
              {dataLoading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-6">
                  <Loader2 className="w-12 h-12 animate-spin text-orange-600" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Synchronizing Data...</p>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="py-40 text-center flex flex-col items-center">
                  <Inbox className="w-16 h-16 mb-8 text-gray-800" />
                  <p className="text-xs font-black uppercase text-gray-600 tracking-[0.4em]">Queue Empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredLeads.map(lead => (
                    <AdminLeadRow key={lead.id} lead={lead} onUpdate={loadLeads} onDelete={loadLeads} />
                  ))}
                </div>
              )}
           </div>
        </div>
      </div>
    </main>
  );
}
