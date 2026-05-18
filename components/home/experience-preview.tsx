import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { ExperienceCard } from "@/components/ui/experience-card";
import { Button } from "../ui/button";
import Link from "next/link";
import prisma from "@/lib/db";

export async function ExperiencePreview() {
    const experiences = await prisma.experience.findMany();

    const formattedExperiences = experiences.map((experience) => ({
        ...experience,
        price: Number(experience.price)
    }))

    const featuredExperiences = formattedExperiences.slice(0, 3)

    return (
        <SectionWrapper>
            <SectionHeader title="Experiências Exclusivas" subtitle="Torne sua visita ainda mais especial com nossos serviços personalizados." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredExperiences.map((experience) => (
                    <ExperienceCard key={experience.id} experience={experience} />
                ))}
            </div>
            <div className="mt-12 text-center">
                <Button variant='outline' size='lg' asChild>
                    <Link href='/experiencias'>
                        Ver Todas as Experiências
                    </Link>
                </Button>
            </div>
        </SectionWrapper>
    )
}