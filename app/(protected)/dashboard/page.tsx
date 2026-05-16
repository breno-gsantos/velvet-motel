import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { formatPrice } from "@/lib/mock";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Dashboard" description="Visão geral do seu negócio" />
      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Receita do Mês" value={formatPrice()} />
        </div>
      </div>
    </>
    
  )
}