"use client"

import { useState, useCallback } from "react"

interface TransactionState {
  isOpen: boolean
  status: "pending" | "success" | "error" | "signing"
  transactionHash?: string
  errorMessage?: string
  title?: string
  description?: string
}

export function useTransaction() {
  const [transaction, setTransaction] = useState<TransactionState>({
    isOpen: false,
    status: "signing",
  })

  const startTransaction = useCallback((title?: string, description?: string) => {
    setTransaction({
      isOpen: true,
      status: "signing",
      title,
      description,
    })
  }, [])

  const setPending = useCallback((transactionHash?: string) => {
    setTransaction((prev) => ({
      ...prev,
      status: "pending",
      transactionHash,
    }))
  }, [])

  const setSuccess = useCallback((transactionHash?: string) => {
    setTransaction((prev) => ({
      ...prev,
      status: "success",
      transactionHash,
    }))
  }, [])

  const setError = useCallback((errorMessage: string) => {
    setTransaction((prev) => ({
      ...prev,
      status: "error",
      errorMessage,
    }))
  }, [])

  const closeTransaction = useCallback(() => {
    setTransaction((prev) => ({
      ...prev,
      isOpen: false,
    }))
  }, [])

  const executeTransaction = useCallback(
    async (transactionFn: () => Promise<{ hash?: string }>, title?: string, description?: string) => {
      try {
        startTransaction(title, description)

        // Simulate signing delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const result = await transactionFn()

        if (result.hash) {
          setPending(result.hash)

          // Simulate blockchain confirmation delay
          await new Promise((resolve) => setTimeout(resolve, 3000))

          setSuccess(result.hash)
        } else {
          setSuccess()
        }

        return result
      } catch (error: any) {
        setError(error.message || "Transaction failed")
        throw error
      }
    },
    [startTransaction, setPending, setSuccess, setError],
  )

  return {
    transaction,
    startTransaction,
    setPending,
    setSuccess,
    setError,
    closeTransaction,
    executeTransaction,
  }
}
