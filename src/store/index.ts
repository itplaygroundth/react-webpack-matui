import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const themeStore = persist(
  (set) => ({
    theme: 'PureLightTheme',
    color: '#222',
    backgroundColor: '#ff0000',
    setColor: (color:string) => set(() => ({ color })),
    setBackgroundColor: (color:string) => set(() => ({ backgroundColor: color }))
  }),
  { name: 'appTheme' }
)

export const useThemeStore = create(themeStore)
const counterStore = (set:any) => ({
  count: 0,
  increment: () => set((state:any) => ({ count: state.count + 1 })),
  decrement: () => set((state:any) => ({ count: state.count - 1 }))
})

export const useCounterStore = create(counterStore)