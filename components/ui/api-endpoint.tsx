"use client"

import { useState } from "react"
import { Copy, Check, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface ApiEndpointProps {
  method: "GET" | "POST" | "PUT" | "DELETE"
  endpoint: string
  description: string
  parameters?: Array<{
    name: string
    type: string
    required: boolean
    description: string
  }>
  response?: {
    example: any
    description: string
  }
}

const getMethodColor = (method: string) => {
  switch (method) {
    case "GET":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "POST":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "PUT":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "DELETE":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export function ApiEndpoint({ method, endpoint, description, parameters, response }: ApiEndpointProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(endpoint)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge className={getMethodColor(method)}>{method}</Badge>
                <div>
                  <CardTitle className="font-mono text-sm">{endpoint}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    copyToClipboard()
                  }}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            {parameters && parameters.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Parameters</h4>
                <div className="space-y-2">
                  {parameters.map((param) => (
                    <div key={param.name} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <code className="text-sm font-mono bg-background px-2 py-1 rounded">{param.name}</code>
                          <Badge variant="outline" className="text-xs">
                            {param.type}
                          </Badge>
                          {param.required && (
                            <Badge variant="destructive" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{param.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {response && (
              <div>
                <h4 className="font-semibold mb-3">Response</h4>
                <p className="text-sm text-muted-foreground mb-3">{response.description}</p>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{JSON.stringify(response.example, null, 2)}</code>
                </pre>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
