'use client'

// impor react hook
import React, { useEffect,useState } from 'react'

//interface
interface ClientOnlyProps  {
    children: React.ReactNode
}

const ClientOnly : React.FC<ClientOnlyProps> = ({children}) =>{

    // mounted stated
    const [hasMounted,setHasMounted] = useState(false)

    // useEffect
    useEffect(()=>{
        setHasMounted(true)
    },[])

    // if not mounted
    if(!hasMounted){
        return null
    }

    return (
        <div>{children}</div>
    )
}

export default ClientOnly