"use client"

import * as React from "react"

type PreviewContextValue = {
    version: number
    refreshPreview: () => void
}

const PreviewContext = React.createContext<PreviewContextValue | null>(null)

export function PreviewProvider({ children }: { children: React.ReactNode }) {
    const [version, setVersion] = React.useState(0)

    const refreshPreview = React.useCallback(() => {
        setVersion((current) => current + 1)
    }, [])

    return (
        <PreviewContext.Provider value={{ version, refreshPreview }}>
            {children}
        </PreviewContext.Provider>
    )
}

export function usePreview() {
    const context = React.useContext(PreviewContext)

    if (!context) {
        throw new Error("usePreview deve ser usado dentro de um PreviewProvider")
    }

    return context
}
