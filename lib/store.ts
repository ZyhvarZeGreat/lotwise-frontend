import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

// Wallet State
interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string
  chainId: number | null
  connect: (address: string, chainId: number) => void
  disconnect: () => void
  setBalance: (balance: string) => void
}

export const useWalletStore = create<WalletState>()(
  devtools(
    persist(
      (set) => ({
        isConnected: false,
        address: null,
        balance: "0",
        chainId: null,
        connect: (address, chainId) => set({ isConnected: true, address, chainId }),
        disconnect: () => set({ isConnected: false, address: null, balance: "0", chainId: null }),
        setBalance: (balance) => set({ balance }),
      }),
      {
        name: "wallet-storage",
      },
    ),
  ),
)

// Portfolio State
interface Position {
  id: string
  asset: string
  supplied: number
  borrowed: number
  apy: number
  borrowApy: number
  healthFactor: number
}

interface PortfolioState {
  positions: Position[]
  totalSupplied: number
  totalBorrowed: number
  netApy: number
  loading: boolean
  addPosition: (position: Position) => void
  removePosition: (id: string) => void
  updatePosition: (id: string, updates: Partial<Position>) => void
  setLoading: (loading: boolean) => void
}

export const usePortfolioStore = create<PortfolioState>()(
  devtools((set, get) => ({
    positions: [
      {
        id: "1",
        asset: "Ethereum",
        supplied: 5000,
        borrowed: 2000,
        apy: 2.5,
        borrowApy: 4.0,
        healthFactor: 80,
      },
      {
        id: "2",
        asset: "Bitcoin",
        supplied: 7000,
        borrowed: 3000,
        apy: 3.0,
        borrowApy: 5.0,
        healthFactor: 75,
      },
      {
        id: "3",
        asset: "Solana",
        supplied: 345,
        borrowed: 678,
        apy: 1.8,
        borrowApy: 2.2,
        healthFactor: 90,
      },
    ],
    totalSupplied: 12345,
    totalBorrowed: 5678,
    netApy: 3.2,
    loading: false,
    addPosition: (position) => set((state) => ({ positions: [...state.positions, position] })),
    removePosition: (id) =>
      set((state) => ({
        positions: state.positions.filter((p) => p.id !== id),
      })),
    updatePosition: (id, updates) =>
      set((state) => ({
        positions: state.positions.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      })),
    setLoading: (loading) => set({ loading }),
  })),
)

// Properties State
interface Property {
  id: string
  name: string
  address: string
  image: string
  tokenPrice: number
  totalTokens: number
  currentYield: number
  marketCap: number
  bedrooms: number
  bathrooms: number
  squareFootage: number
  yearBuilt: number
  propertyType: string
  parking: string
}

interface PropertiesState {
  properties: Property[]
  selectedProperty: Property | null
  loading: boolean
  setProperties: (properties: Property[]) => void
  setSelectedProperty: (property: Property | null) => void
  setLoading: (loading: boolean) => void
}

export const usePropertiesStore = create<PropertiesState>()(
  devtools((set) => ({
    properties: [],
    selectedProperty: null,
    loading: false,
    setProperties: (properties) => set({ properties }),
    setSelectedProperty: (property) => set({ selectedProperty: property }),
    setLoading: (loading) => set({ loading }),
  })),
)

// UI State
interface UIState {
  sidebarOpen: boolean
  theme: "dark" | "light" | "system"
  notifications: Array<{ id: string; message: string; type: "success" | "error" | "info" }>
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: "dark" | "light" | "system") => void
  addNotification: (notification: { message: string; type: "success" | "error" | "info" }) => void
  removeNotification: (id: string) => void
}

export const useUIStore = create<UIState>()(
  devtools((set) => ({
    sidebarOpen: false,
    theme: "dark",
    notifications: [],
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    setTheme: (theme) => set({ theme }),
    addNotification: (notification) =>
      set((state) => ({
        notifications: [...state.notifications, { ...notification, id: Date.now().toString() }],
      })),
    removeNotification: (id) =>
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      })),
  })),
)
