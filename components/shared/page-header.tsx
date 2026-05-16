interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode
}

export function PageHeader({title, children, description}: PageHeaderProps) {
  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-foreground text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-8">{children}</div>
          )}
        </div>
      </div>
    </div>
  )
}