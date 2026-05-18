'use server'

import prisma from "@/lib/db"
import { ResponseAction } from "@/types"
import { revalidatePath } from "next/cache"

export async function deleteSuite(id: string): Promise<ResponseAction> {
  try {
    const suiteExists = prisma.suite.findUnique({
      where: { id }
    })

    if (!suiteExists) {
      return {success: false, error: 'Suíte não encontrada'}
    }

    await prisma.suite.delete({
      where: { id }
    })

    revalidatePath('/dashboard/suites');

    return {success: true, message: 'Suíte deletada com sucesso!'}
  } catch (error) {
    console.log(error);

    return {success: false, error: 'Erro ao deletar suíte'}
  }
}