import { PageHeader } from "@/components/shared/page-header"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { SuiteCard } from "@/components/ui/suite-card"
import prisma from "@/lib/db"
import { suiteDTO } from "@/types"

export default async function SuitesPage() {
  const suitesRaw = await prisma.suite.findMany({
    include: {
      prices: true
    }
  })

  const suites: suiteDTO[] = suitesRaw.map((suite) => ({
    ...suite,
    prices: suite.prices.map((price) => ({
      ...price,
      price: price.price.toNumber()
    }))
  }))

  return (
    <main>
      <PageHeader
        title="Nossas Suítes"
        description="Cada suíte foi cuidadosamente projetada para oferecer o máximo em conforto, privacidade
        e sofisticação. Escolha o ambiente perfeito para o seu momento especial."
      />
      <SectionWrapper className="pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {suites.map((suite) => (
            <SuiteCard key={suite.id} suite={suite} />
          ))}
        </div>
      </SectionWrapper>
    </main>
  )
}