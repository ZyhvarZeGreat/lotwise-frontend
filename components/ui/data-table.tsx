"use client"

import type React from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Column<T> {
  key: keyof T
  header: string
  render?: (value: any, row: T) => React.ReactNode
}

interface DataTableProps<T> {
  title?: string
  data: T[]
  columns: Column<T>[]
  className?: string
}

export function DataTable<T>({ title, data, columns, className }: DataTableProps<T>) {
  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle className="font-bricolage">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.key)}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="animate-fade-in">
                {columns.map((column) => (
                  <TableCell key={String(column.key)}>
                    {column.render ? column.render(row[column.key], row) : String(row[column.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
