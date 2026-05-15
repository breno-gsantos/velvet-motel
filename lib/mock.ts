// Types
export type Period = 'TWO_HOURS' | 'FOUR_HOURS' | 'TWELVE_HOURS' | 'OVERNIGHT'
export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED'

export interface User {
  id: string
  name: string
  email: string
  password: string
}

export interface SuiteImage {
  id: string
  url: string
}

export interface SuitePrice {
  id: string
  price: number
  period: Period
}

export interface SuiteReservation {
  id: string
  customerName: string
  customerPhone: string
  customerEmail: string
  checkIn: Date
  checkOut: Date
  totalPrice: number
  period: Period
  status: ReservationStatus
  observations?: string
}

export interface Suite {
  id: string
  name: string
  slug: string
  description: string
  thumbnail: string
  maxGuests: number
  active: boolean
  images: SuiteImage[]
  prices: SuitePrice[]
  reservations: SuiteReservation[]
  amenities: string[]
}

export interface Experience {
  id: string
  title: string
  slug: string
  description: string
  thumbnail: string
  price: number
  active: boolean
}

export interface MenuItem {
  id: string
  name: string
  description: string
  image: string
  price: number
  available: boolean
}

export interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}

// Period labels
export const periodLabels: Record<Period, string> = {
  TWO_HOURS: '2 Horas',
  FOUR_HOURS: '4 Horas',
  TWELVE_HOURS: '12 Horas',
  OVERNIGHT: 'Pernoite',
}

// Mock Suites
export const suites: Suite[] = [
  {
    id: '1',
    name: 'Suíte Velvet',
    slug: 'suite-velvet',
    description: 'Nossa suíte signature oferece uma experiência única de luxo e conforto. Com decoração sofisticada em tons de veludo, banheira de hidromassagem para dois e vista panorâmica, a Suíte Velvet é perfeita para momentos inesquecíveis.',
    thumbnail: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    maxGuests: 2,
    active: true,
    amenities: ['Hidromassagem', 'Smart TV 65"', 'Som Ambiente', 'Frigobar Premium', 'Iluminação Cênica', 'Ar Condicionado Split'],
    images: [
      { id: '1-1', url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80' },
      { id: '1-2', url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80' },
      { id: '1-3', url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80' },
    ],
    prices: [
      { id: 'p1-1', price: 189, period: 'TWO_HOURS' },
      { id: 'p1-2', price: 289, period: 'FOUR_HOURS' },
      { id: 'p1-3', price: 489, period: 'TWELVE_HOURS' },
      { id: 'p1-4', price: 689, period: 'OVERNIGHT' },
    ],
    reservations: [],
  },
  {
    id: '2',
    name: 'Suíte Noir',
    slug: 'suite-noir',
    description: 'Elegância em preto e dourado. A Suíte Noir combina modernidade com sensualidade, apresentando uma piscina privativa aquecida, sauna seca e um ambiente intimista com iluminação personalizável.',
    thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    maxGuests: 2,
    active: true,
    amenities: ['Piscina Privativa', 'Sauna Seca', 'Smart TV 75"', 'Pole Dance', 'Espelho no Teto', 'Frigobar Premium'],
    images: [
      { id: '2-1', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80' },
      { id: '2-2', url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80' },
      { id: '2-3', url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80' },
    ],
    prices: [
      { id: 'p2-1', price: 249, period: 'TWO_HOURS' },
      { id: 'p2-2', price: 389, period: 'FOUR_HOURS' },
      { id: 'p2-3', price: 589, period: 'TWELVE_HOURS' },
      { id: 'p2-4', price: 789, period: 'OVERNIGHT' },
    ],
    reservations: [],
  },
  {
    id: '3',
    name: 'Suíte Royale',
    slug: 'suite-royale',
    description: 'O ápice do luxo e exclusividade. A Suíte Royale oferece mais de 80m² de puro requinte, com jacuzzi dupla, lareira eletrônica, área lounge separada e serviço de mordomo disponível 24 horas.',
    thumbnail: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    maxGuests: 4,
    active: true,
    amenities: ['Jacuzzi Dupla', 'Lareira', 'Área Lounge', 'Serviço de Mordomo', 'Adega Climatizada', 'Home Theater'],
    images: [
      { id: '3-1', url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80' },
      { id: '3-2', url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80' },
      { id: '3-3', url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80' },
    ],
    prices: [
      { id: 'p3-1', price: 389, period: 'TWO_HOURS' },
      { id: 'p3-2', price: 589, period: 'FOUR_HOURS' },
      { id: 'p3-3', price: 889, period: 'TWELVE_HOURS' },
      { id: 'p3-4', price: 1189, period: 'OVERNIGHT' },
    ],
    reservations: [],
  },
  {
    id: '4',
    name: 'Suíte Zen',
    slug: 'suite-zen',
    description: 'Inspirada na tranquilidade oriental. A Suíte Zen proporciona uma experiência de relaxamento completa com ofurô japonês, jardim zen privativo e aromaterapia personalizada.',
    thumbnail: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80',
    maxGuests: 2,
    active: true,
    amenities: ['Ofurô Japonês', 'Jardim Zen', 'Aromaterapia', 'Tatami', 'Meditação Guiada', 'Chá Cerimonial'],
    images: [
      { id: '4-1', url: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80' },
      { id: '4-2', url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80' },
      { id: '4-3', url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80' },
    ],
    prices: [
      { id: 'p4-1', price: 219, period: 'TWO_HOURS' },
      { id: 'p4-2', price: 339, period: 'FOUR_HOURS' },
      { id: 'p4-3', price: 539, period: 'TWELVE_HOURS' },
      { id: 'p4-4', price: 739, period: 'OVERNIGHT' },
    ],
    reservations: [],
  },
]

// Mock Experiences
export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Jantar Romântico',
    slug: 'jantar-romantico',
    description: 'Uma experiência gastronômica exclusiva servida na privacidade da sua suíte. Menu degustação de 5 pratos harmonizado com vinhos selecionados, preparado pelo nosso chef executivo.',
    thumbnail: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    price: 450,
    active: true,
  },
  {
    id: '2',
    title: 'Spa a Dois',
    slug: 'spa-a-dois',
    description: 'Relaxamento completo com massagem tântrica para casais, banho de ofurô com pétalas de rosa e aromaterapia. Inclui espumante e frutas.',
    thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    price: 380,
    active: true,
  },
  {
    id: '3',
    title: 'Decoração Especial',
    slug: 'decoracao-especial',
    description: 'Transforme sua suíte em um cenário de sonhos. Pétalas de rosa, velas aromáticas, balões personalizados e mensagem especial de boas-vindas.',
    thumbnail: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
    price: 250,
    active: true,
  },
  {
    id: '4',
    title: 'Café da Manhã Premium',
    slug: 'cafe-da-manha-premium',
    description: 'Comece o dia com um café da manhã servido na suíte. Croissants frescos, frutas selecionadas, ovos beneditinos e champagne para brindar.',
    thumbnail: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80',
    price: 180,
    active: true,
  },
  {
    id: '5',
    title: 'Sessão Fotográfica',
    slug: 'sessao-fotografica',
    description: 'Eternize seus momentos especiais com uma sessão fotográfica profissional sensual e artística. Inclui 20 fotos editadas em alta resolução.',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    price: 590,
    active: true,
  },
  {
    id: '6',
    title: 'Kit Romance',
    slug: 'kit-romance',
    description: 'O complemento perfeito para sua estadia. Espumante Chandon, chocolates belgas, frutas vermelhas e um bouquet de rosas.',
    thumbnail: 'https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=800&q=80',
    price: 290,
    active: true,
  },
]

// Mock Menu Categories
export const menuCategories: MenuCategory[] = [
  {
    id: '1',
    name: 'Entradas',
    items: [
      {
        id: 'm1',
        name: 'Carpaccio de Wagyu',
        description: 'Finas fatias de wagyu com rúcula selvagem, lascas de parmesão e azeite trufado',
        image: 'https://images.unsplash.com/photo-1608039829572-9b0172f7413f?w=400&q=80',
        price: 89,
        available: true,
      },
      {
        id: 'm2',
        name: 'Ostras Frescas',
        description: 'Meia dúzia de ostras frescas com limão siciliano e mignonette',
        image: 'https://images.unsplash.com/photo-1606685618893-3a4355bd0947?w=400&q=80',
        price: 120,
        available: true,
      },
      {
        id: 'm3',
        name: 'Burrata com Presunto',
        description: 'Burrata cremosa com presunto de parma e tomates confitados',
        image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=80',
        price: 78,
        available: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Pratos Principais',
    items: [
      {
        id: 'm4',
        name: 'Filé Mignon ao Molho de Vinho',
        description: 'Filé mignon grelhado com redução de vinho tinto, risoto de funghi e aspargos',
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80',
        price: 145,
        available: true,
      },
      {
        id: 'm5',
        name: 'Lagosta Thermidor',
        description: 'Lagosta gratinada com molho cremoso, servida com arroz de jasmim',
        image: 'https://images.unsplash.com/photo-1553247407-23251ce81f59?w=400&q=80',
        price: 280,
        available: true,
      },
      {
        id: 'm6',
        name: 'Salmão em Crosta de Ervas',
        description: 'Salmão selvagem com crosta de ervas finas, purê de batata doce e legumes baby',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80',
        price: 125,
        available: true,
      },
    ],
  },
  {
    id: '3',
    name: 'Sobremesas',
    items: [
      {
        id: 'm7',
        name: 'Fondant de Chocolate',
        description: 'Fondant de chocolate belga 70% com sorvete de baunilha de Madagascar',
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80',
        price: 48,
        available: true,
      },
      {
        id: 'm8',
        name: 'Crème Brûlée',
        description: 'Clássico crème brûlée com baunilha Bourbon e açúcar caramelizado',
        image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&q=80',
        price: 42,
        available: true,
      },
      {
        id: 'm9',
        name: 'Morangos com Champagne',
        description: 'Morangos frescos flambados com champagne e chantilly',
        image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=400&q=80',
        price: 58,
        available: true,
      },
    ],
  },
  {
    id: '4',
    name: 'Bebidas',
    items: [
      {
        id: 'm10',
        name: 'Champagne Moët & Chandon',
        description: 'Garrafa 750ml do clássico champagne francês',
        image: 'https://images.unsplash.com/photo-1594372365401-3b5ff14edf73?w=400&q=80',
        price: 450,
        available: true,
      },
      {
        id: 'm11',
        name: 'Vinho Tinto Reserva',
        description: 'Seleção premium de vinhos tintos argentinos e chilenos',
        image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80',
        price: 180,
        available: true,
      },
      {
        id: 'm12',
        name: 'Drinks Autorais',
        description: 'Coquetéis exclusivos preparados pelo nosso mixologista',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80',
        price: 65,
        available: true,
      },
    ],
  },
]

// Helper functions
export function getSuiteBySlug(slug: string): Suite | undefined {
  return suites.find((suite) => suite.slug === slug)
}

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((exp) => exp.slug === slug)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}
