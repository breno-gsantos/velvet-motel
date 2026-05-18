import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SuiteActionBar } from "@/components/dashboard/suites/suite-action-bar";
import prisma from "@/lib/db";
import { suiteDTO } from "@/types";
import { Decimal } from "@prisma/client/runtime/client";

export default async function SuitesPage() {
  const suitesFromDb = await prisma.suite.findMany({
    include: {
      prices: true
    }
  })

  const suites: suiteDTO[] = suitesFromDb.map(suite => ({
    ...suite,
    prices: suite.prices.map(price => ({
      id: price.id,
      period: price.period,
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