'use server'

import prisma from "@/lib/db";
import { suiteSchema } from "@/lib/validations/suites/schemas"
import { revalidatePath } from "next/cache";

export async function editSuite(values: unknown, suiteId: string) {
  const validatedFields = suiteSchema.safeParse(values);

  if (!validatedFields.success) {
    return {success: false, error: 'Dados Inválidos'}
  }

  const { name, active, amenities, description, images, maxGuests, prices, slug } = validatedFields.data

  const suiteExists = await prisma.suite.findFirst({
    where: {
      slug,
      NOT: {
        id: suiteId
      }
    }
  });

  if (suiteExists) {
    return {success: false, error: 'Já existe uma suíte com esse slug'}
  }

  try {
    await prisma.suite.update({
      where: {
        id: suiteId
      },

      data: {
        name,
        slug,
        description,
        thumbnail: images[0] ?? '',
        maxGuests,
        active,
        amenities,

        prices: {
          deleteMany: {},

          create: prices.map((price) => ({
            period: price.period,
            price: price.price
          }))
        },

        images: {
          deleteMany: {},

          create: images.map((url) => ({
            url
          }))
        }
      }
    });

    revalidatePath('/dashboard/suites');
    revalidatePath(`/dashboard/suites/${suiteId}`)

    return {success: true, message: 'Suíte atualizada com sucesso!'}
  } catch (error) {
    console.log(error);

    return {success: false, error: 'Erro ao atualizar suíte'}
  }
}