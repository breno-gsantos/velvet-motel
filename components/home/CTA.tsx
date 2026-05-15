import { SectionWrapper } from "@/components/shared/section-wrapper";

export function CTA(){
    return (
        <SectionWrapper>
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/20 via-card to-card border border-border">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                    <div className="absolute inset-0 bg-linear-to-l from-primary to-transparent" />
                </div>
            </div>
        </SectionWrapper>
    )
}