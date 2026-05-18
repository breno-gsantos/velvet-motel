import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { EditExperienceForm } from "@/components/dashboard/experiencias/form/edit-experience-form"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/db"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function EditExperiencePage({ params }: Props) {
  const { id } = await params

  const experience = await prisma.experience.findUnique({
    where: { id }
  })

  if (!experience) {
    notFound()
  }

  const formattedExperience = {
    ...experience,
    price: Number(experience.price)
  }

  return (
    <>
      <DashboardHeader title={`Editar ${experience.title}`} description="Atualize as informações da experiência" />

      <div className="p-6">
        <div className="mb-6">
          <Button variant='ghost' size='sm' asChild>
            <Link href='/dashboard/experiencias'>
              <ArrowLeft className="mr-2 size-4" />
              Voltar para Experiências
            </Link>
          </Button>
        </div>

        <EditExperienceForm experience={formattedExperience} />
      </div>
    </>
  )
}