import z from "zod";

const suitePriceSchema = z.object({
  period: z.enum(['TWO_HOURS', 'FOUR_HOURS', 'TWELVE_HOURS', 'OVERNIGHT']),
  price: z.number().min(1)
})

export const newSuiteSchema = z.object({
  name: z.string().min(5, 'Nome Obrigatório').max(50),
  slug: z.string().min(1, 'Slug Obrigatório').max(50),
  description: z.string().min(5, 'Descrição Obrigatória').max(500),
  maxGuests: z.number('Máximo de hóspedes deve ser um número').int().min(1),
  active: z.boolean(),
  prices: z.array(suitePriceSchema),
  amenities: z.array(z.string()),
  images: z.array(z.url())
});

export type NewSuiteFormData = z.infer<typeof newSuiteSchema>;

