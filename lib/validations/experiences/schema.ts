import z from "zod";

export const experienceSchema = z.object({
  title: z.string().min(2, 'Título obrigatório').max(50),
  slug: z.string().min(1, 'Slug obrigatório').max(50),
  description: z.string().min(5, 'Descrição obrigatória').max(500),
  price: z.number().min(1),
  active: z.boolean(),
  thumbnail: z.url().optional()
})

export type ExperienceFormData = z.infer<typeof experienceSchema>;