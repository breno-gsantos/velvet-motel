import { formatPrice, MenuItem } from "@/lib/mock";
import Image from "next/image";
import { Badge } from "../ui/badge";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div className="group flex gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-md bg-secondary">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-foreground">{item.name}</h3>
          {!item.available && (
            <Badge variant='secondary' className="text-xs">
              Indisponível
            </Badge>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        <p className="mt-2 text-sm font-medium text-primary">
          {formatPrice(item.price)}
        </p>
      </div>
    </div>
  )
}