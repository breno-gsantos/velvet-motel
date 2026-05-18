import { formatPrice } from "@/lib/mock"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Experience } from "@/lib/generated/prisma/client"

type ExperienceWithNumberPrice = Omit<Experience, 'price'> & {
    price: number;
}

interface ExperienceCardProps {
    experience: ExperienceWithNumberPrice
}

export function ExperienceCard({experience}: ExperienceCardProps){
    return (
        <div className="group relative overflow-hidden rounded-lg bg-card border border-border">
            <div className="relative aspect-16/10 overflow-hidden">
                <Image src={experience.thumbnail} alt={experience.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
            </div>
            <div className="p-6">
                <h3 className="font-serif text-xl font-medium text-foreground">{experience.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">{experience.description}</p>
                <div className="mt-6 flex items-center justify-between">
                    <span className="text-lg font-medium text-primary">
                        {formatPrice(experience.price)}
                    </span>
                    <Button variant='secondary' size='sm' asChild>
                        <Link href={`/reservas?experiencia=${experience.slug}`}>
                            Adicionar
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}