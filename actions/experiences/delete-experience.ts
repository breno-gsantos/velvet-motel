'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function deleteExperience(id: string) {
  try {
    const experienceExists = await prisma.experience.findUnique({
      where: { id }
    })

    if (!experienceExists) {
      return {success: false, error: 'Experiência não encontrada'}
    }

    await prisma.experience.delete({
      where: { id }
    })

    revalidatePath('/dashboard/experiencias')
    revalidatePath('/experiencias')

    return {success: true, message: 'Experiêcia deletada com sucesso!'}
  } catch (error) {
    console.log(error)

    return {success: false, error: 'Erro ao deletar experiência'}
  }
}