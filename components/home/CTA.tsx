import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Button } from "@/components/ui/button";
import { ctaButtonData } from "@/constants/data";
import Link from "next/link";

export function CTA(){
    return (
        <SectionWrapper>
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/20 via-card to-card border border-border">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                    <div className="absolute inset-0 bg-linear-to-l from-primary to-transparent" />
                </div>
                <div className="relative px-8 py-16 sm:px-16 sm:py-24 text-center">
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground text-balance">
                        Pronto para uma experiência única?
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
                        Reserve agora e descubra o que significa viver momentos de puro luxo e privacidade.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        {ctaButtonData.map(({ href, label, variant }) => (
                            <Button key={href} size='lg' variant={variant} className="min-w-50" asChild>
                                <Link href={href}>
                                    {label}
                                </Link>
                        </Button>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}