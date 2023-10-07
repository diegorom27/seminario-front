'use client'
import { useEffect, useState } from 'react';
import '../../assets/modalStyles.css'
import  ReactDOM from "react-dom";
const ModalPortal=({children,isOpen,closeModal})=>{
    const handleModalClick=(e)=>{
        e.stopPropagation()
    }
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    return mounted ? ReactDOM.createPortal(<article onClick={closeModal} className={isOpen?' modal is-open':'modal'}>
                                                <div className="modal-container flex-col" onClick={handleModalClick}>
                                                    <button className="modal-close" onClick={closeModal}>✖️</button>
                                                        {children}
                                                </div>
                                            </article>, document.body) : null;
}
export default ModalPortal