import { formatPrice, menuCategories } from "@/lib/mock"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { SectionHeader } from "@/components/shared/section-header"
import { Button } from "../ui/button"
import Link from "next/link"
import Image from "next/image"

export function MenuPreview(){
    const featuredItems = menuCategories.flatMap((cat) => cat.items).slice(0, 4)

    return (
        <SectionWrapper className="bg-card">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <SectionHeader title="Gastronomia de Excelência" subtitle="Um cardápio elaborado para complementar sua experiência. Pratos sofisticados, bebidas premium e sobremesas irresistíveis." />
                    <div className="space-y-4">
                        {featuredItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 border border-border rounded-md">
                                <div>
                                    <h4 className="font-medium text-foreground">{item.name}</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                                </div>
                                <span className="text-sm font-medium text-primary ml-4">
                                    {formatPrice(item.price)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <Button variant='secondary' asChild>
                            <Link href='/cardapio'>
                                Ver Cardápio Completo
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                        src='https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80'
                        alt="Gastronomia"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>
            </div>
        </SectionWrapper>
    )
}