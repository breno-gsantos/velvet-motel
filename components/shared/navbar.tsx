import { navLinks } from "@/constants/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar(){
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 md:px-6">
            <nav className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="h-20 flex items-center justify-between">
                    <Link href='/' className="flex items-center gap-2">
                        <span className="font-serif text-2xl font-medium tracking-tight text-foreground">
                            Velvet Stay
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(({href, label}) => (
                            <Link key={href} href={href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                {label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button asChild>
                            <Link href='/reservas' className="hidden sm:inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                                Reservar Agora
                            </Link>
                        </Button>
                    </div>
                </div>
            </nav>
        </header>
    )
}