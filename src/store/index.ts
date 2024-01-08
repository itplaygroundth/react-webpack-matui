 
import { UserInfo } from '@src/models/crypto_order'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'



interface UserinfoState {
  user:UserInfo,
  setUser: (userinfo:UserInfo) => void
}


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

// const userStore = persist(
// (set) => ({
//   userinfo: { user: null, accessToken: '' },
//   setUser: (userinfo:object) => set(() => ({ userinfo })),
// }),
// { name: 'appUser' }
// )

// export const useUserStore = create<createStore<BearState>()(userStore)
export const useUserStore = create<UserinfoState>()(
  devtools(
    persist(
      (set) => ({
        user: { username: null, accessToken: '', role: '',isAuthenticated: false },
        setUser: (userinfo:UserInfo) => set((state) => ({ user: userinfo }))
      }),
      { name: 'appUser' },
    ),
  ),
)

export const useThemeStore = create(themeStore)
const counterStore = (set:any) => ({
  count: 0,
  increment: () => set((state:any) => ({ count: state.count + 1 })),
  decrement: () => set((state:any) => ({ count: state.count - 1 }))
})

export const useCounterStore = create(counterStore)