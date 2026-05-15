import { cn } from "@/lib/utils";

interface SectionHeaderProps{
    title: string;
    subtitle?: string;
    align?: 'left' | 'center'
}

export function SectionHeader({title, align = 'left', subtitle}: SectionHeaderProps){
    return (
        <div className={cn('mb-12', align === 'center' ? 'text-center' : '')}>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-foreground text-balance">
                {title}
            </h2>
            {subtitle && (
                <p className={cn('mt-4 text-lg text-muted-foreground max-w-2xl text-pretty', align === 'center' ? 'mx-auto' : '')}>
                    {subtitle}
                </p>
            )}
        </div>
    )
}