import { footerContactData, footerHoursData, footerNavData } from "@/constants/data";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href='/' className="inline-block">
              <span className="font-serif text-2xl font-medium text-foreground">
                Velvet Stay
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Experiências exclusivas de hospedagem em um ambiente sofisticado e discreto.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Navegação
            </h3>
            <ul className="space-y-3">
              {footerNavData.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Contato
            </h3>
            <ul className="space-y-3">
              {footerContactData.map(({ label, contact }) => (
                <li key={label} className="text-sm text-muted-foreground">
                  <span className="block text-foreground">{label}</span>
                  {contact}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Funcionamento
            </h3>
            <ul className="space-y-3">
              {footerHoursData.map(({ hour, label }) => (
                <li key={label} className="text-sm text-muted-foreground">
                  <span className="block text-foreground">{label}</span>
                  {hour}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Velvet Stay. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}