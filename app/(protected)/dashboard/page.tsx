import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dashboardQuickActionsData, dashboardStats } from "@/constants/data";
import { formatPrice, mockReservations, periodLabels, suites } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { AlertCircle, BedDouble, CalendarCheck, Clock, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";

const statusColors = {
  PENDING: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  CONFIRMED: 'bg-green-500/10 text-green-500 border-green-500/20',
  CANCELLED: 'bg-destructive/10 text-destructive border-destructive/20',
}

const statusLabels = {
  PENDING: 'Pendente',
  CONFIRMED: 'Confirmada',
  CANCELLED: 'Cancelada',
}

export default function DashboardPage() {
  const recentReservations = mockReservations.slice(0, 5);
  const pendingReservations = mockReservations.filter((r) => r.status === 'PENDING')

  return (
    <>
      <DashboardHeader title="Dashboard" description="Visão geral do seu negócio" />
      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Receita do Mês"
            value={formatPrice(dashboardStats.monthlyRevenue)}
            icon={DollarSign}
            trend={{value: 12, isPositive: true}}
          />
          <StatCard
            title="Reservas Totais"
            value={formatPrice(dashboardStats.totalReservations)}
            icon={CalendarCheck}
            trend={{value: 8, isPositive: true}}
          />
          <StatCard
            title="Taxa de Ocupação"
            value={`${dashboardStats.occupancyRate}%`}
            icon={TrendingUp}
            trend={{value: 5, isPositive: true}}
          />
          <StatCard
            title="Reservas Pendentes"
            value={dashboardStats.pendingReservations}
            icon={Clock}
            description="Aguardando confirmação"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Reservas Recentes</h2>
                <p className="text-sm text-muted-foreground">Últimas reservas realizadas</p>
              </div>
              <Button variant='outline' size='sm' asChild>
                <Link href='/dashboard/reservas'>Ver Todas</Link>
              </Button>
            </div>

            <div className="divide-y divide-border">
              {recentReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-secondary/50">
                  <div className="flex items-center gap-4">
                    <div className="size-10 flex items-center justify-center rounded-full bg-primary/10">
                      <BedDouble className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{reservation.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {periodLabels[reservation.period]} - {' '}
                        {new Date(reservation.checkIn).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant='outline' className={cn('border', statusColors[reservation.status])}>
                      {statusLabels[reservation.status]}
                    </Badge>
                    <span className="font-medium text-foreground">
                      {formatPrice(reservation.totalPrice)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {pendingReservations.length > 0 && (
              <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="size-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-foreground">
                      {pendingReservations.length} reservas pendentes
                    </p>
                    <p className="text-sm text-muted-foreground">Aguardando confirmação</p>
                  </div>
                </div>
                <Button variant='outline' size='sm' className="mt-3 w-full border-yellow/30 text-yellow-500 hover:bg-yellow-500/10">
                  <Link href='/dashboard/reservas?status=pending'>
                    Ver pendentes
                  </Link>
                </Button>
              </div>
            )}
            
            <div className="rounded-xl border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <h3 className="font-semibold text-foreground">Suítes</h3>
              </div>
              <div className="divide-y divide-border">
                {suites.slice(0, 4).map((suite) => (
                  <div key={suite.id} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${suite.thumbnail})` }} />
                      <span className="text-sm font-medium text-foreground">{suite.name}</span>
                    </div>
                    <Badge variant='outline' className={cn('border', suite.active ? 'border-green-500/20 bg-green-500/10 text-green-500' : 'border-destructive/20 bg-destructive/10 text-destructive')}>
                      {suite.active ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="border-t border-border p-3">
                <Button variant='ghost' size='sm' className="w-full" asChild>
                  <Link href='/dashboard/suites'>Gerenciar Suítes</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-3 font-semibold text-foreground">Ações Rápidas</h3>
              <div className="grid grid-cols-2 gap-2">
                {dashboardQuickActionsData.map((item) => (
                  <Button key={item.href} variant='outline' size='sm'>
                    <Link href={item.href}>
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}