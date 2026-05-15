import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { featuresData } from "@/constants/data";

export function Features(){
    return (
        <SectionWrapper className="bg-card">
            <SectionHeader title="Por que nos escolher?" subtitle="Compromisso com excelência em cada detalhe da sua experiência." align="center" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {featuresData.map(({title, description, icon: Icon}) => (
                    <div key={title} className="text-center">
                        <div className="inline-flex items-center justify-center size-16 rounded-lg bg-primary/10 text-primary mb-6">
                            <Icon className="" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    )
}