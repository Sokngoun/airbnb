import { create } from "zustand"

interface RentProps{
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useRentModal = create<RentProps>((set)=>({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useRentModal 