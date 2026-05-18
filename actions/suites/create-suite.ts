'use server'

import prisma from "@/lib/db";
import { suiteSchema } from "@/lib/validations/suites/schemas"
import { ResponseAction } from "@/types";
import { revalidatePath } from "next/cache";

export async function createSuite(values: unknown): Promise<ResponseAction> {
  const validatedFields = suiteSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten())
    return {success: false, error: 'Dados Inválidos'}
  }

  const { active, amenities, description, images, maxGuests, name, prices, slug } = validatedFields.data;

  const suiteExists = await prisma.suite.findUnique({
    where: {
      slug
    }
  })

  if (suiteExists) {
    return {success: false, error: 'Já existe uma suíte com esse slug'}
  }

  try {
    await prisma.suite.create({
      data: {
        name,
        slug,
        description,
        thumbnail: images[0] ?? '',
        maxGuests,
        active,
        amenities,

        prices: {
          create: prices.map((price) => ({
            period: price.period,
            price: price.price
          }))
        },

        images: {
          create: images.map((url) => ({
            url
          }))
        }
      }
    })

    revalidatePath('/dashboard/suites')
    return {success: true, message: 'Suíte criada com sucesso!'}
  } catch (error) {
    console.log(error);

    return {success: false, error: 'Erro ao criar suíte'}
  }
}