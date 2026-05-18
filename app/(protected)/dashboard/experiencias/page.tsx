import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ExperienceActionBar } from "@/components/dashboard/experiencias/experience-action-bar";
import prisma from "@/lib/db";

export default async function ExperienciasPage() {
  const experiences = await prisma.experience.findMany();

  const formattedExperiences = experiences.map((experience) => ({
    ...experience,
    price: Number(experience.price)
  }))

  return (
    <>
      <DashboardHeader title="Experiências" description="Gerencie as experiências oferecidas" />
      <div className="p-6">
        <ExperienceActionBar experiences={formattedExperiences} />
      </div>
    </>
  )
}