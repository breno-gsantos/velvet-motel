import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { suites } from "@/lib/mock";
import { SuiteCard } from "@/components/ui/suite-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SuitePreview(){
    const featuredSuites = suites.slice(0, 3)

    return (
        <SectionWrapper>
            <SectionHeader title="Suítes Exclusivas" subtitle="Cada ambiente foi cuidadosamente projetado para proporcionar o máximo em conforto, privacidade e sofisticação." />
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredSuites.map((suite) => (
                        <SuiteCard key={suite.id} suite={suite} />
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Button variant='outline' size='lg' asChild>
                        <Link href='/suites'>
                            Ver Todas Suítes
                        </Link>
                    </Button>
                </div>
        </SectionWrapper>
    )
}