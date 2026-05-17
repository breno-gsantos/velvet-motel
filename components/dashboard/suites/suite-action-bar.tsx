'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Suite } from "@/lib/generated/prisma/client";
import { formatPrice } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { Eye, MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"

type SuiteWithPrices = Suite & {
  prices: {
    id: string;
    period: string;
    price: number;
  }[]
}

interface Props {
  suites: SuiteWithPrices[]
}

export function SuiteActionBar({ suites }: Props) {
  const [search, setSearch] = useState<string>('');
  
  const filteredSuites = suites.filter((suite) => (
    suite.name.toLowerCase().includes(search.toLowerCase())
  ))

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar suítes..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-secondary pl-9 sm:w-80" />
        </div>
        <Button asChild>
          <Link href='/dashboard/suites/nova'>
            <Plus className="mr-2 size-4" />
            Nova Suíte
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-75">Suíte</TableHead>
              <TableHead>Capacidade</TableHead>
              <TableHead>Preços</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuites.map((suite) => (
              <TableRow key={suite.id} className="hover:bg-secondary/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-16 overflow-hidden rounded-lg">
                      {suite.thumbnail ? (
                        <Image src={suite.thumbnail} alt={suite.name} fill className="object-cover" sizes="64px" />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-secondary text-xs text-muted-foreground">
                          Sem imagem
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{suite.name}</p>
                      <p className="text-sm text-muted-foreground">{suite.amenities.length} comodidades</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-muted-foreground">
                    {suite.maxGuests} {suite.maxGuests === 1 ? 'pessoa' : 'pessoas'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <span className="text-muted-foreground">A partir de </span>
                    <span className="font-medium text-foreground">
                      {formatPrice(Math.min(...suite.prices.map((p) => p.price)))}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant='outline' className={cn('border', suite.active ? 'border-green-500/20 bg-green-500/10 text-green-500' : 'border-destructive/20 bg-destructive/10 text-destructive')}>
                    {suite.active ? 'Ativa' : 'Inativa'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon'>
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/suites/${suite.slug}`}>
                          <Eye className="mr-2 size-4" />
                          Visualizar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/suites/${suite.id}`}>
                          <Pencil className="mr-2 size-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 size-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredSuites.length === 0 && (
          <div className="flex flex-col items-center justify-center py-2">
            <p className="text-muted-foreground">Nenhuma suíte encontrada</p>
          </div>
        )}
      </div>
    </>
  )
}