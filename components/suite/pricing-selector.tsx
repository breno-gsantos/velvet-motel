'use client'

import { ReservationPeriod, SuitePrice } from "@/lib/generated/prisma/client";
import { formatPrice, Period, periodLabels } from "@/lib/mock"
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PricingPrice {
  id: string;
  period: ReservationPeriod;
  price: number
}

interface PricingSelectorProps {
  prices: PricingPrice[]
  onSelect?: (price: PricingPrice) => void;
  selectedPeriod?: Period;
}

export function PricingSelector({ prices, onSelect, selectedPeriod }: PricingSelectorProps) {
  const [selected, setSelected] = useState<Period | undefined>(selectedPeriod);

  function handleSelect(price: PricingPrice) {
    setSelected(price.period)
    onSelect?.(price)
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {prices.map((price) => (
        <button
          key={price.id}
          onClick={() => handleSelect(price)}
          className={cn(
            'cursor-pointer flex flex-col items-center justify-center rounded-lg border-2 p-4 transition-all',
            selected === price.period
              ? 'border-primary bg-primary/10 text-foreground'
              : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
          )}
        > 
          <span className="text-sm font-medium">{periodLabels[price.period]}</span>
          <span className={cn('mt-1 text-lg font-semibold', selected === price.period ? 'text-primary' : '')}>
            {formatPrice(price.price)}
          </span>
        </button>
      ))}
    </div>
  )
}