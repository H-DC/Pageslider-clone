import { TargetElement } from '@testing-library/user-event';
import React, { useRef } from 'react'

interface BtnProps {
    text: string;
    manageClick(a: number): any;
    deltaPos: number;
}


function CustomBtn({ text, manageClick, deltaPos }: BtnProps) {

    const btnRef = useRef<HTMLButtonElement>(null);

    let click = (e: React.MouseEvent) => {
        manageClick(deltaPos);
        let ripple = document.createElement('span');

        // let target : EventTarget = document.getElementsByClassName('customBtn')[0]
        let target = e.nativeEvent.target;

        ripple.style.left = (e.nativeEvent.clientX - (target as HTMLButtonElement).offsetLeft) + 'px';
        ripple.style.top = (e.nativeEvent.clientY - (target as HTMLButtonElement).offsetTop) + 'px';
        btnRef.current!.appendChild(ripple);

        setTimeout(() => btnRef.current!.removeChild(ripple), 1000)
    }

    return (
        <button className="customBtn" onClick={(e) => { click(e) }} ref={btnRef}>
            {text}
        </button>
    )
}

export default CustomBtn

