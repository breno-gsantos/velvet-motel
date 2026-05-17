import { Button } from "@/components/ui/button";
import { BedDouble, CalendarCheck, Clock4, CreditCard, LayoutDashboard, LockKeyhole, Settings, ShieldCheck, Sparkles, UtensilsCrossed } from "lucide-react";
import { ComponentProps } from "react";

type ButtonVariants = ComponentProps<typeof Button>['variant'];

interface HeroButton{
    href: string;
    label: string;
    variant: ButtonVariants
}

interface CTAButton {
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

export const ctaButtonData: CTAButton[]  = [
    { href: '/reservas', label: 'Fazer Reserva', variant: 'default' },
    { href: '/localizacao', label: 'Como Chegar', variant: 'outline' },
]

export const footerNavData = [
  { href: '/suites', label: 'Suítes' },
  { href: '/experiencias', label: 'Experiências' },
  { href: '/cardapio', label: 'Cardápio' },
  { href: '/reservas', label: 'Reservas' },
]

export const footerContactData = [
  { label: 'Telefone', contact: '(13) 99999-9999' },
  { label: 'WhatsApp', contact: '(13) 99999-9999' },
  { label: 'E-mail', contact: 'contato@velvetstay.com.br' },
]

export const footerHoursData = [
  { label: 'Segunda a Quinta', hour: '18h às 06h' },
  { label: 'Sexta a Domingo', hour: '24 horas' },
  { label: 'Feriados', hour: '24 horas' },
]

export const experiencePageData = [
  { number: '1', title: 'Escolha', label: 'Selecione as experiências desejadas durante sua reserva' },
  { number: '2', title: 'Confirme', label: 'Nossa equipe entrará em contato para confirmar os detalhes' },
  { number: '3', title: 'Aproveite', label: 'Tudo estará preparado para sua chegada' },
]

export const sidebarLinks = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Suítes', href: '/dashboard/suites', icon: BedDouble },
  { label: 'Experiências', href: '/dashboard/experiencias', icon: Sparkles },
  { label: 'Cardápio', href: '/dashboard/cardapio', icon: UtensilsCrossed },
  { label: 'Reservas', href: '/dashboard/reservas', icon: CalendarCheck },
  { label: 'Configurações', href: '/dashboard/configuracoes', icon: Settings },
]

export const dashboardStats = {
  totalRevenue: 45890,
  monthlyRevenue: 12450,
  totalReservations: 234,
  pendingReservations: 12,
  confirmedToday: 5,
  occupancyRate: 78,
}

export const dashboardQuickActionsData = [
  { href: '/dashboard/suites/nova', label: 'Nova Suíte' },
  { href: '/dashboard/experiencias/nova', label: 'Nova Experiência' },
  { href: '/dashboard/cardapio/novo', label: 'Novo Item' },
  { href: '/dashboard/reservas', label: 'Ver Reservas' },
]