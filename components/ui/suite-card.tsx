import { formatPrice, Suite } from "@/lib/mock";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface SuiteCardProps {
    suite: Suite
}

export function SuiteCard({suite}: SuiteCardProps){
    const lowestPrice = Math.min(...suite.prices.map((p) => p.price))

    return (
        <Link href={`/suites/${suite.slug}`} className="group block">
            <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-secondary">
                <Image src={suite.thumbnail} alt={suite.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant='secondary' className="bg-primary/90 text-primary-foreground border-0">
                            Até {suite.maxGuests} pessoas
                        </Badge>
                    </div>
                    <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                        {suite.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        A partir de <span className="text-foreground font-medium">{formatPrice(lowestPrice)}</span>
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {suite.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                    {suite.amenities.slice(0, 3).map((amenity) => (
                        <span key={amenity} className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">
                            {amenity}
                        </span>
                    ))}
                    {suite.amenities.length > 3 && (
                        <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">
                            +{suite.amenities.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    )
}