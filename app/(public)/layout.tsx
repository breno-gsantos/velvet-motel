import { Footer } from "@/components/shared/footer"
import { Navbar } from "@/components/shared/navbar"

interface Props {
  children: React.ReactNode
}

export default function PublicLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}