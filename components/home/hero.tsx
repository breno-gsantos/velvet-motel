import Image from "next/image";
import { Button } from "@/components/ui/button";
import { heroButton } from "@/constants/data";
import Link from "next/link";

export function Hero(){
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <Image src='/hero.jpeg' alt="Suite" fill className="object-cover" priority sizes="100vw" />
                <div className="absolute inset-0 bg-linear-to-b from-background/70 via-background/50 to-background" />
            </div>

            <div className="relative z-10 mx-auto container px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-primary mb-6">Motel Premium</p>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-foreground text-balance">Momentos que <br />merecem ser vividos</h1>
                <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                    Descubra um novo conceito em hospedagem. Suítes exclusivas, experiências personalizadas 
                    e um ambiente pensado para criar memórias inesquecíveis.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    {heroButton.map(({href, label, variant}) => (
                        <Button key={href} size='lg' asChild variant={variant} className="max-w-45">
                            <Link href={href}>{label}</Link>
                        </Button>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    )
}