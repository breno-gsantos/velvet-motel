'use server'

import prisma from "@/lib/db";
import { experienceSchema } from "@/lib/validations/experiences/schema"
import { ResponseAction } from "@/types";
import { revalidatePath } from "next/cache";

export async function createExperience(values: unknown): Promise<ResponseAction> {
  const validatedFields = experienceSchema.safeParse(values);

  if (!validatedFields.success) {
    return {success: false, error: 'Dados Inválidos'}
  }

  const { active, description, price, slug, title, thumbnail } = validatedFields.data;

  const experienceExists = await prisma.experience.findUnique({
    where: {
      slug
    }
  })

  if (experienceExists) {
    return {success: false, error: 'Já existe uma experiência com esse slug'}
  }

  try {
    await prisma.experience.create({
      data: {
        title,
        slug,
        description,
        active,
        price,
        thumbnail: thumbnail ?? ''
      }
    })

    revalidatePath('/dashboard/experiencias')
    return {success: true, message: 'Experiência criada com sucesso!'}
  } catch (error) {
    console.log(error);

    return {success: false, error: 'Erro ao criar experiência'}
  }
}