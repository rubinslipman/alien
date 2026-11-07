'use client'
import { useState } from "react";
import Image from 'next/image'
export default function Tag({name}) {
    const [active, setActive] = useState(false)

    function handleOnClick() {

        if (active == false) {
            setActive(true);
        } else {
            setActive(false);
        }
      
    }
    return (<button 
        className={`min-h-11 min-w-11 border rounded p-1 flex gap-1 justify-center items-center ${active ? "bg-green-500 border-green-500" : ""}`} 
        onClick={handleOnClick}>
            {name}
        { active ? 
            <Image
                src="x-circle-16x16.svg"
                alt='A Close icon'
                width={16}
                height={16}
                /> : ''}
            </button>)
}
