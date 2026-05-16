'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LogOut, Menu } from "lucide-react";
import { sidebarLinks } from "@/constants/data";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <aside className={cn('fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300', collapsed ? 'w-18' : 'w-64')}>
      <div className="h-16 flex items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link href='/dashboard' className="flex items-center gap-2">
            <span className="font-serif text-xl font-semibold text-primary">
              Velvet Stay
            </span>
          </Link>
        )}
        <Button variant='ghost' size='icon' onClick={() => setCollapsed(!collapsed)} className="ml-auto text-muted-foreground hover:text-foreground">
          {collapsed ? <Menu className="size-5" /> : <ChevronLeft className="size-5" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {sidebarLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground', collapsed && 'justify-center px-2'
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className="size-5 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href='/'
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
            collapsed && 'justify-center px-2'
          )}
          title={collapsed ? 'Voltar ao site' : undefined}
        >
          <LogOut className="size-5 shrink-0" />
          {!collapsed && <span>Voltar ao Site</span>}
        </Link>
      </div>
    </aside>
  )
}