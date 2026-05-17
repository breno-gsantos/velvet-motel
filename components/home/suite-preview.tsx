import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { suites } from "@/lib/mock";
import { SuiteCard } from "@/components/ui/suite-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/db";
import { Decimal } from "@prisma/client/runtime/client";

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
  }[]
}

export async function SuitePreview() {
    const suitesFromDb = await prisma.suite.findMany({
    include: {
      prices: true
    }
  })

  const suites: SuiteWithPrices[] = suitesFromDb.map(suite => ({
    ...suite,
    prices: suite.prices.map(price => ({
      id: price.id,
      period: price.period.toString(),
      price: (price.price as Decimal).toNumber()
    }))
  }))

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