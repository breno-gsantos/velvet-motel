'use client'

import { editSuite } from "@/actions/suites/edit-suite"
import { uploadMenuImage } from "@/actions/suites/upload-image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Prisma, ReservationPeriod, Suite, SuiteImage, SuitePrice } from "@/lib/generated/prisma/client"
import { periodLabels } from "@/lib/mock"
import { SuiteFormData, suiteSchema } from "@/lib/validations/suites/schemas"
import { DashboardSuiteDTO } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Save, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface Props {
  suite: DashboardSuiteDTO
}

export function EditSuiteForm({ suite }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const [newAmenity, setNewAmenity] = useState<string>(''); 

  const form = useForm<SuiteFormData>({
    resolver: zodResolver(suiteSchema),
    defaultValues: {
      name: suite.name,
      slug: suite.slug,
      description: suite.description,
      maxGuests: suite.maxGuests,
      active: suite.active,
      prices: suite.prices.map(price => ({
        period: price.period,
        price: price.price
      })),
      amenities: suite.amenities,
      
      images: suite.images.map(image => image.url)
    }
  })

  const { control, handleSubmit, formState, reset, clearErrors, setError, watch, setValue } = form;

  const amenities = watch('amenities');

  function addAmenity() {
    if (!newAmenity.trim()) return;

    setValue('amenities', [
      ...amenities,
      newAmenity.trim()
    ]);

    setNewAmenity('')
  }

  async function onSubmit(values: SuiteFormData) {
    try {
      let uploadedUrls: string[] = [];

      if (files.length > 0) {
        const uploads = await Promise.all(
          files.map(async(file) => {
            const formData = new FormData();

            formData.append('image', file)

            return await uploadMenuImage(formData)
          })
        )

        uploadedUrls = uploads
      }

      values.images = uploadedUrls.length > 0 ? uploadedUrls : suite.images.map(image => image.url)

      const response = await editSuite(values, suite.id);

      if(!response.success){
        setError('root', {
          type: 'manual',
          message: response.error
        })

        toast.error(formState.errors.root?.message);

        return;
      }

      clearErrors('root')

      toast.success(response.message)
      reset()
      router.push('/dashboard/suites');
    } catch (error) {
      console.log(error);

      setError('root', {
        type: 'manual',
        message: 'Erro inesperado no servidos'
      })

      toast.error(formState.errors.root?.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Informações Básicas</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField control={control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Suíte</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Suíte Premium" className="bg-secondary" {...field} disabled={formState.isSubmitting} />
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
                        <Input placeholder="suite-premium" className="bg-secondary" {...field} disabled={formState.isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <p className="text-xs text-muted-foreground">
                    Será usado na URL: /suites/{watch('slug') || 'slug'}
                  </p>
                </div>

                <div className="grid gap-2">
                  <FormField control={control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Descreva as características e diferenciais da suíte..." className="bg-secondary min-h-30" {...field} disabled={formState.isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid gap-2">
                  <FormField control={control} name="maxGuests" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacidade Máxima</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} className="w-32 bg-secondary" disabled={formState.isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Preços por Período</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {suite.prices.map((price, index) => (
                  <div key={price.id} className="grid gap-2">
                    <FormField control={control} name={`prices.${index}.price`} render={({ field }) => (
                      <FormItem>
                        <FormLabel>{periodLabels[price.period]}</FormLabel>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            R$
                          </span>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              step={0.01}
                              value={field.value}
                              onChange={(e) => {
                                const value = e.target.value

                                field.onChange(value === '' ? '' : Number(value))
                              }} className="bg-secondary pl-10" disabled={formState.isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Comodidades</h2>
              <div className="mb-4 flex gap-2">
                <Input placeholder="Adicionar comodidade..." value={newAmenity} onChange={(e) => setNewAmenity(e.target.value)} disabled={formState.isSubmitting} />

                <Button type="button" variant='outline' onClick={addAmenity}>
                  <Plus className="size-4" />
                </Button>
              </div>

              {amenities.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity, index) => (
                    <Badge
                      key={index}
                      variant='outline'
                      className="group cursor-pointer border-border bg-secondary py-1.5 pl-3 pr-2 transition-colors hover:border-destructive/50 hover:bg-destructive/10"
                      onClick={() => {
                        setValue('amenities', amenities.filter((_, i) => i !== index))
                      }}
                    >
                      <span className="mr-1">{amenity}</span>
                      <X className="size-3 text-muted-foreground group-hover:text-destructive" />
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhuma comodidade encontrada
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Status</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Suíte Ativa</p>
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

            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Imagens</h2>
              <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50">
                <div className="text-center">
                  <Upload className="mx-auto size-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Arraste imagens aqui
                  </p>

                  {files.length > 0 && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {files.length} imagem(ns) selecionada (s)
                    </p>
                  )}
                </div>
              </div>

              <Input
                ref={inputRef}
                type="file"
                multiple accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files || [])

                  setFiles(selectedFiles)
                }}
              />
                  
              <Button type="button" variant="outline" className="mt-4 w-full" onClick={() => inputRef.current?.click()}>
                <Upload className="mr-2 size-4" />
                Selecionar Imagens
              </Button>
            </div>

            <Button type="submit" className="w-full">
              <Save className="mr-2 size-4" />
              Atualizar Suite
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}