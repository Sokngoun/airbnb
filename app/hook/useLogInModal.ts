import { create } from "zustand"

interface LogInModalProps{
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useLogInModal = create<LogInModalProps>((set)=>({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useLogInModal 