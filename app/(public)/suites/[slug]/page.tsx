import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Gallery } from "@/components/suite/gallery";
import { PricingSelector } from "@/components/suite/pricing-selector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { formatPrice, getSuiteBySlug } from "@/lib/mock";
import { Decimal } from "@prisma/client/runtime/client";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SuiteWithPrices{
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  maxGuests: number;
  active: boolean;
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
  prices: {
    id: string;
    period: string;
    price: number;
  }
}

interface SuiteDetailsPageProps {
  params: {
    slug: string;
  }
}

export default async function SuiteDetailsPage({ params }: SuiteDetailsPageProps) {
  const { slug } = await params

  const suiteFromDb = await prisma.suite.findUnique({
    where: {
      slug
    },
    include: {
      images: true,
      prices: true
    }
  })

  if (!suiteFromDb) {
    notFound()
  }

  const suite = {
    ...suiteFromDb,
    prices: suiteFromDb.prices.map((price) => ({
      id: price.id,
      period: price.period,
      price: price.price.toNumber(),
    })),
  }


  const lowestPrice = Math.min(...suite.prices.map((p) => p.price))

  return (
    <main>
      <SectionWrapper>
        <div className="grid lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3">
            <Gallery images={suite.images} alt={suite.description} />
          </div>

          <div className="lg:col-span-2">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant='secondary' className="bg-primary/10 text-primary border-0">
                  Até {suite.maxGuests} pessoas
                </Badge>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-foreground">
                {suite.name}
              </h1>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {suite.description}
              </p>

              <div className="mt-8">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  Comodidades
                </h3>
                <div className="flex flex-wrap gap-2">
                  {suite.amenities.map((amenity) => (
                    <span key={amenity} className="inline-flex items-center rounded-md bg-secondary px-3 py-1.5 text-sm text-muted-foreground">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  Escolha um período
                </h3>
                <PricingSelector prices={suite.prices} />
              </div>

              <div className="mt-8 space-y-4">
                <Button size='lg' className="w-full" asChild>
                  <Link href={`/reservation?suite=${suite.slug}`}>
                    Reservar a partir de {formatPrice(lowestPrice)}
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Pagamento na chegada. Cancelamento gratuito até 24h antes
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}