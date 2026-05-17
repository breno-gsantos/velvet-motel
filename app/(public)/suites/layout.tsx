import { Metadata } from "next"
import React from "react"

interface Props{
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Suítes | Velvet Stay',
  description: 'Conheça nossas suítes exclusivas. Ambientes luxuosos projetados para proporcionar privacidade, conforto e experiências inesquecíveis.',
}

export default function SuitesPageLayout({ children }: Props) {
  return (
    <>
      {children}
    </>
  )
}