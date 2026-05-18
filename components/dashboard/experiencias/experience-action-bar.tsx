'use client'

import { deleteExperience } from "@/actions/experiences/delete-experience";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Experience } from "@/lib/generated/prisma/client";
import { formatPrice } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { DashboardExperienceDTO } from "@/types";
import { Eye, MoreHorizontal, Pencil, Plus, Search, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  experiences: DashboardExperienceDTO[]
}

export function ExperienceActionBar({ experiences }: Props) {
  const [search, setSearch] = useState<string>('')

  const filteredExperiences = experiences.filter((exp) =>
    exp.title.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(id: string) {
    try {
      const response = await deleteExperience(id);
  
      if (!response.success) {
        toast.error(response.error)
        return;
      }
  
      toast.success(response.message)
    } catch (error) {
      toast.error('Erro Interno do Servidor')
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar experiências..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-secondary pl-9 sm:w-80" />
        </div>
        <Button asChild>
          <Link href='/dashboard/experiencias/nova'>
            <Plus className="mr-2 size-4" />
            Nova Experiência
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredExperiences.map((experience) => (
          <div key={experience.id} className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/30">
            <div className="relative aspect-video overflow-hidden">
              <div className="h-full w-full transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={experience.thumbnail}
                  alt={experience.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="absolute right-2 top-2">
                <Badge variant='outline' className={cn('border bg-background/80 backdrop-blur-sm', experience.active ? 'border-green-500/20 text-green-500' : 'border-destructive/20 text-destructive')}>
                  {experience.active ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{experience.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{experience.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon' className="shrink-0">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href='/experiencias'>
                        <Eye className="mr-2 size-4" />
                        Visualizar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/experiencias/${experience.id}`}>
                        <Pencil className="mr-2 size-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                          <Trash className="mr-2 size-4" />
                          Excluir
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir Experiência?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Essa ação não pode ser desfeita. Isso removerá
                            permanentemente a experiência e todas as informações relacionadas.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(experience.id)} className="bg-destructive hover:bg-destructive/90">Excluir Experiência</AlertDialogAction>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="text-lg font-bold text-primary">
                  {formatPrice(Number(experience.price))}
                </span>
                <Button variant='outline' size='sm' asChild>
                  <Link href={`/dashboard/experiencias/${experience.id}`}>
                    Editar
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredExperiences.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-12">
          <p className="text-muted-foreground">Nenhuma Experiência encontrada</p>
        </div>
      )}
    </>
  )
}