import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { EditSuiteForm } from "@/components/dashboard/suites/forms/edit-suite-form";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { DashboardSuiteDTO } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function EditSuitePage({ params }: Props) {
  const { id } = await params;

  const suite = await prisma.suite.findUnique({
    where: {
      id
    },
    include: {
      prices: true,
      images: true
    }
  })

  if (!suite) {
    notFound()
  }

  const serializedSuite: DashboardSuiteDTO = {
    ...suite,
    prices: suite.prices.map(price => ({
      ...price,
      price: Number(price.price)
    }))
  }

  return (
    <>
      <DashboardHeader title={`Editar ${suite.name}`} description="Atualize as informações da suíte" />
      <div className="p-6">
        <div className="mb-6">
          <Button variant='ghost' size='sm' asChild>
            <Link href='/dashboard/suites'>
              <ArrowLeft className="mr-2 size-4" />
              Voltar para Suítes
            </Link>
          </Button>
        </div>

        <EditSuiteForm suite={serializedSuite} />
      </div>
    </>
  )
}