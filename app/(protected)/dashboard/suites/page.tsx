import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SuiteActionBar } from "@/components/dashboard/suites/suite-action-bar";
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

export default async function SuitesPage() {
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

  return (
    <>
      <DashboardHeader title="Suítes" description="Gerencie as suítes do estabelecimento" />
      <div className="p-6">
        <SuiteActionBar suites={suites} />
      </div>
    </>
  )
}