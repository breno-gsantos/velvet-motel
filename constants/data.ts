import { Button } from "@/components/ui/button";
import { Clock4, CreditCard, LockKeyhole, ShieldCheck } from "lucide-react";
import { ComponentProps } from "react";

type ButtonVariants = ComponentProps<typeof Button>['variant'];

interface HeroButton{
    href: string;
    label: string;
    variant: ButtonVariants
}

export const heroButton: HeroButton[]  = [
    { href: '/reservas', label: 'Reservar Agora', variant: 'default' },
    { href: '/suites', label: 'Conhecer Suites', variant: 'secondary' },
]

export const navLinks = [
    { href: '/suites', label: 'Suítes' },
    { href: '/experiencias', label: 'Experiências' },
    { href: '/cardapio', label: 'Cardápio' },
    { href: '/localizacao', label: 'Localização' },
]

export const featuresData = [
    {
      title: 'Privacidade Total',
      description: 'Garagem privativa com acesso direto à suíte, sem passar por recepção.',
      icon: LockKeyhole
    },
    {
      title: 'Atendimento 24h',
      description: 'Equipe disponível a qualquer momento para atender suas necessidades.',
      icon: Clock4
    },
    {
      title: 'Higienização Premium',
      description: 'Protocolos rigorosos de limpeza e higienização em todas as suítes.',
      icon: ShieldCheck 
    },
    {
      title: 'Pagamento Discreto',
      description: 'Múltiplas formas de pagamento com total sigilo na fatura.',
      icon: CreditCard 
    },
]