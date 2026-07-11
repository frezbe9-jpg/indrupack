import { getAllLeads } from "@/app/actions";
import Navbar from "@/components/Navigation";
import AdminLeadRow from "@/components/AdminLeadRow";
import AdminLogin from "@/components/AdminLogin";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_access")?.value === process.env.ADMIN_SECRET;

  if (!isAdmin && process.env.NODE_ENV === "production") {
    return <AdminLogin />;
  }

  let leads: any[] = [];
  try {
    leads = await getAllLeads();
  } catch (e) {
    console.error(e);
  }

  return (
    <main className="min-h-screen bg-gray-950 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <FadeIn direction="up">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-12">
            Панель <span className="text-orange-600">Администратора</span>
          </h1>
        </FadeIn>

        {leads.length === 0 ? (
          <p className="text-gray-500 text-center py-20 text-white font-bold">Заявок пока нет</p>
        ) : (
          <StaggerContainer>
            <div className="space-y-6">
              {leads.map((lead) => (
                <StaggerItem key={lead.id}>
                  <AdminLeadRow lead={lead} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        )}
      </div>
    </main>
  );
}
