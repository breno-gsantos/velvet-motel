import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { NewExperienceForm } from "@/components/dashboard/experiencias/form/new-experience-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewExperiencePage() {
  return (
    <>
      <DashboardHeader title="Nova Experiência" description="Adicione uma nova experiência ao catálogo" />

      <div className="p-6">
        <div className="mb-6">
          <Button variant='ghost' size='sm' asChild>
            <Link href='/dashboard/experiencias'>
              <ArrowLeft className="size-4" />
              Voltar para Experiências
            </Link>
          </Button>
        </div>

        <NewExperienceForm />
      </div>
    </>
  )
}