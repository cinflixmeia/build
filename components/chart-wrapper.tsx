"use client"

import * as React from "react"
import { ResponsiveContainer } from "recharts"

type ChartContainerProps = {
  height?: number
  title?: string
  className?: string
  children: React.ReactNode
}

export function ChartContainer({ height = 300, title, className, children }: ChartContainerProps) {
  return (
    <div className={className}>
      {title && <div className="text-sm font-medium mb-2">{title}</div>}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

