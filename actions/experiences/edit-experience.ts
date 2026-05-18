'use server'

import prisma from "@/lib/db";
import { experienceSchema } from "@/lib/validations/experiences/schema"
import { revalidatePath } from "next/cache";
import { deleteImage } from "../delete-image";

export async function updateExperience(values: unknown, id: string) {
  const validatedFields = experienceSchema.safeParse(values);

  if (!validatedFields.success) {
    return {success: false, error: 'Dados Inválidos'}
  }

  const { title, slug, description, active, price, thumbnail } = validatedFields.data;

  const experienceExists = await prisma.experience.findFirst({
    where: {
      slug,
      NOT: {
        id
      }
    }
  });

  if (experienceExists) {
    return {sucess: false, error: 'Já existe uma experiência com esse slug'}
  }

  const currentExperience = await prisma.experience.findUnique({
    where: { id }
  });

  if (!currentExperience) {
    return {success: false, error: 'Experiência não encontrada'}
  }

  if (thumbnail && currentExperience.thumbnail && thumbnail !== currentExperience.thumbnail) {
    await deleteImage(currentExperience.thumbnail)
  }

  try {
    await prisma.experience.update({
      where: { id },
      
      data: {
        title,
        slug,
        description,
        active,
        price,
        thumbnail
      }
    });

    revalidatePath('/dashboard/experiencias')
    revalidatePath(`/dashboard/experiencias/${id}`)
    revalidatePath('/experiencias')

    return {success: true, message: 'Experiência atualizada com sucesso!'}
  } catch (error) {
    console.log(error);

    return {success: false, error: 'Erro ao atualizar experiência'}
  }
}