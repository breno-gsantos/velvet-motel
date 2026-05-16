import { MenuItemCard } from "@/components/cardapio/menu-item-card"
import { PageHeader } from "@/components/shared/page-header"
import { SectionWrapper } from "@/components/shared/section-wrapper"
import { menuCategories } from "@/lib/mock"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Cardápio | Velvet Stay',
  description: 'Conheça nosso cardápio exclusivo. Pratos sofisticados, bebidas premium e sobremesas irresistíveis para complementar sua experiência.',
}

export default function CardapioPage() {
  return (
    <main>
      <PageHeader
        title="Nosso Cardápio"
        description="Uma seleção gastronômica elaborada para complementar sua experiência. Todos os itens são servidos diretamente na sua suíte."
      />
      <SectionWrapper className="pt-0">
        <div className="space-y-16">
          {menuCategories.map((category) => (
            <div key={category.id}>
              <h2 className="font-serif text-2xl font-medium text-foreground mb-6 pb-4 border-b border-border">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-card">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl font-medium text-foreground mb-4">Informações Importantes</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
                Todos os pedidos são preparados na hora e entregues diretamente em sua suíte.
              </p>
              <p>
                O tempo médio de preparo é de 25 a 40 minutos, dependendo do pedido.
              </p>
              <p>
                Para restrições alimentares ou alergias, informe ao realizar o pedido.
              </p>
              <p className="text-foreground font-medium">
                Aceitamos pedidos até às 04h da manhã.
              </p>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}