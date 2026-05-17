import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { NewSuiteForm } from "@/components/dashboard/suites/forms/new-suite-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewSuitePage() {
  return (
    <>
      <DashboardHeader title="Nova Suíte" description="Adicione uma nova suíte ao catálogo" />
      <div className="p-6">
        <div className="mb-6">
          <Button variant='ghost' size='sm' asChild>
            <Link href='/dashboard/suites'>
              <ArrowLeft className="mr-2 size-4" />
              Voltar para Suítes
            </Link>
          </Button>
        </div>

        <NewSuiteForm />
      </div>
    </>
  )
}