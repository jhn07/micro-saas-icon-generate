import { create } from 'zustand'


interface State {
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useLoading = create<State>()((set) => ({
  isLoading: false,
  setLoading: () => set((state) => ({ isLoading: !state.isLoading }))
}))

// =====================================================

interface StaetUserLimit {
  userLimitCount: number
  setUserLimitCount: (userLimit: number) => void
}

export const useUserLimit = create<StaetUserLimit>()((set) => ({
  userLimitCount: 0,
  setUserLimitCount: (userLimit) => set((state) => ({ ...state, userLimitCount: userLimit }))
}))

// =====================================================


interface StatePlanSubscription {
  selected: {
    name: string,
    price: number
  },
  setSelected: (name: string, price: number) => void
}

export const userPlanSubscription = create<StatePlanSubscription>()((set) => ({
  selected: {
    name: "",
    price: 0
  },
  setSelected: (name, price) => set((state) => ({ ...state, selected: { name: name, price: price } }))
}))