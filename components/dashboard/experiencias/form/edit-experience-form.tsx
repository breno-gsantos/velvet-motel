'use client'

import { updateExperience } from "@/actions/experiences/edit-experience";
import { uploadMenuImage } from "@/actions/suites/upload-image";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Experience } from "@/lib/generated/prisma/client"
import { ExperienceFormData, experienceSchema } from "@/lib/validations/experiences/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ExperienceWithNumberPrice = Omit<Experience, 'price'> & {
  price: number;
}

interface Props {
  experience: ExperienceWithNumberPrice
}

export function EditExperienceForm({ experience }: Props) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const previewUrl = imageFile ? URL.createObjectURL(imageFile) : experience.thumbnail || null;
  
  const router = useRouter();

  const form = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: experience.title,
      description: experience.description,
      slug: experience.slug,
      active: experience.active,
      price: experience.price ?? undefined,
      thumbnail: experience.thumbnail
    }
  });

  const { control, formState, handleSubmit, setError, clearErrors, reset } = form;

  async function onSubmit(values: ExperienceFormData) {
    try {
      let imageUrl = experience.thumbnail;
            
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
      
        imageUrl = await uploadMenuImage(formData);
      }
      
      const response = await updateExperience(
        {
          ...values,
          thumbnail: imageUrl
        },
        experience.id
      )

      if (!response.success) {
        setError('root', {
          type: 'manual',
          message: response.error
        })

        toast.error(response.error)
        return;
      }

      clearErrors('root');

      toast.success(response.message)
      reset()
      router.push('/dashboard/experiencias')
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Erro Interno no servidor'
      })

      toast.error(formState.errors.root?.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Informações da Experiência</h2>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <FormField control={control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Jantar Romântico" className="bg-secondary" {...field} disabled={formState.isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid gap-2">
              <FormField control={control} name="slug" render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (URL)</FormLabel>
                  <FormControl>
                    <Input placeholder="jantar-romantico" className="bg-secondary" {...field} disabled={formState.isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid gap-2">
              <FormField control={control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descreva o que está incluso na experiência..." className="min-h-30 bg-secondary" {...field} disabled={formState.isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid gap-2">
              <FormField control={control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço (R$)</FormLabel>
                  <div className="relative w-48">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      R$
                    </span>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={0.01}
                        value={field.value ?? ''}
                        placeholder="250,00"
                        onChange={(e) => {
                          const value = e.target.value;

                          field.onChange(
                            value === '' ? undefined : Number(value)
                          );
                        }}
                        className="bg-secondary pl-10"
                        disabled={formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )} />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
              <div>
                <p className="font-medium text-foreground">Experiência Ativa</p>
                <p className="text-sm text-muted-foreground">Visível no site público</p>
              </div>
              <FormField control={control} name="active" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Imagem de Capa
          </h2>
          <div className="relative flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50">
            {previewUrl ? (
              <Image src={previewUrl} alt="Preview" className="object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            ) : (
              <div className="text-center">
                <Upload className="mx-auto size-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Sem Imagem</p>
              </div>
            )}
          </div>
          <Input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              setImageFile(file)
            }}
          />

          <Button type="button" variant='outline' className="mt-4 w-full" onClick={() => inputRef.current?.click()}>
            <Upload className="mr-2 size-4" />
            Selecionar Imagem
          </Button>
        </div>

        <div className="flex gap-3">
          <Button type="submit">
            <Save className="mr-2 size-4" />
            Atualizar Experiência
          </Button>
          <Button type="button" variant='outline' asChild>
            <Link href='/dashboard/experiencias'>
              Cancelar
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}