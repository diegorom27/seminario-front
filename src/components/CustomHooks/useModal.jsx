import {useState} from "react";

const useModal=({initialValue=false})=>{
    const [isOpen,setIsOpen]=useState(initialValue)

    const closeModal=()=>{
        setIsOpen(false)
    }
    
    const openModal=()=>{
        setIsOpen(true)
    }
    return{
        isOpen,
        setIsOpen,
        closeModal,
        openModal
    }
}
export {useModal}