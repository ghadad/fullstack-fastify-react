import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
export interface UserDataStateInterface {
    username: string;
    connected: boolean;
    setUserDate: (userData: UserDataStateInterface) => void;
    clearUserData: () => void;
}

// create zustand store that will hold the user data username , connected status
// use persist middleware to save the data in local storage

const useUserDataStore = create(
    persist((set) => ({
        username: "",
        connected: false,
        setUserDate: (userData: UserDataStateInterface) => set({ username: userData.username, connected: userData.connected }),
        clearUserData: () => set({ username: "", connected: false })
    }),
        {
            name: "user-data",
            storage: createJSONStorage(() => localStorage)
        }
    )
)


export default useUserDataStore;
