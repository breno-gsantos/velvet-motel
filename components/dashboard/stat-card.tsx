import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean
  }
  className?: string
}

export function StatCard({ icon: Icon, title, value, className, description, trend }: Props) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{value}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 pt-1">
              <span className={cn('text-xs font-medium', trend.isPositive ? 'text-green-500' : 'text-destructive')}>
                {trend.isPositive ? '+' : ''}{trend.value}% 
              </span>
              <span className="text-xs text-muted-foreground">vs mês anterior</span>
            </div>
          )}
        </div>
        <div className="size-10 flex items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
      </div>
    </div>
  )
}