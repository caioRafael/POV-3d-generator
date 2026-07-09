"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePreview } from "@/components/feature/preview-context"

const parametersSchema = z.object({
    nameText: z.string().min(1, "Informe um texto"),
    textSize: z.number().positive("Deve ser maior que 0"),
    textHeight: z.number().positive("Deve ser maior que 0"),
    textColor: z.string().min(1, "Informe uma cor"),
    baseHeight: z.number().positive("Deve ser maior que 0"),
    baseColor: z.string().min(1, "Informe uma cor"),
})

type Parameters = z.infer<typeof parametersSchema>

const defaultValues: Parameters = {
    nameText: "3Dev",
    textSize: 40,
    textHeight: 10,
    textColor: "black",
    baseHeight: 30,
    baseColor: "red",
}

export function ParameterForm() {
    const { refreshPreview } = usePreview()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Parameters>({
        resolver: zodResolver(parametersSchema),
        defaultValues,
    })

    async function onSubmit(data: Parameters) {
        const response = await fetch("/api/preview", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })

        const result = await response.json()
        console.log(result)

        refreshPreview()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="nameText">Texto</Label>
                <Input id="nameText" {...register("nameText")} />
                {errors.nameText && (
                    <p className="text-sm text-destructive">{errors.nameText.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="textSize">Tamanho do texto</Label>
                <Input id="textSize" type="number" {...register("textSize", { valueAsNumber: true })} />
                {errors.textSize && (
                    <p className="text-sm text-destructive">{errors.textSize.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="textHeight">Altura do texto</Label>
                <Input id="textHeight" type="number" {...register("textHeight", { valueAsNumber: true })} />
                {errors.textHeight && (
                    <p className="text-sm text-destructive">{errors.textHeight.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="textColor">Cor do texto</Label>
                <Input id="textColor" {...register("textColor")} />
                {errors.textColor && (
                    <p className="text-sm text-destructive">{errors.textColor.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="baseHeight">Altura da base</Label>
                <Input id="baseHeight" type="number" {...register("baseHeight", { valueAsNumber: true })} />
                {errors.baseHeight && (
                    <p className="text-sm text-destructive">{errors.baseHeight.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="baseColor">Cor da base</Label>
                <Input id="baseColor" {...register("baseColor")} />
                {errors.baseColor && (
                    <p className="text-sm text-destructive">{errors.baseColor.message}</p>
                )}
            </div>

            <Button type="submit">Gerar</Button>
        </form>
    )
}
