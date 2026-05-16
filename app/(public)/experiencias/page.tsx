import { PageHeader } from "@/components/shared/page-header"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { ExperienceCard } from "@/components/ui/experience-card"
import { experiencePageData } from "@/constants/data"
import { experiences } from "@/lib/mock"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Experiências | Velvet Stay',
  description: 'Descubra experiências exclusivas para tornar sua visita ainda mais especial. Jantares românticos, spa, decoração especial e muito mais.',
}

export default function ExperienciasPage() {
  return (
    <main>
      <PageHeader
        title="Experiências Exclusivas"
        description="Personalize sua estadia com nossos serviços especiais. Cada experiência foi pensada para criar momentos únicos e memoráveis."
      />
      <SectionWrapper className="pt=0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </SectionWrapper>
      <SectionWrapper className="bg-card">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl font-medium text-foreground mb-4">Como funciona?</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            As experiências podem ser adicionadas no momento da reserva ou solicitadas
            diretamente na recepção. Recomendamos reservar com antecedência para garantir
            disponibilidade, especialmente em finais de semana e feriados.
          </p>

          <div className="grid sm:grid-cols-3 gap-8">
            {experiencePageData.map(({ label, number, title }) => (
              <div key={number}>
                <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-semibold">{number}</span>
                </div>
                <h3 className="font-medium text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}