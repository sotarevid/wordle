import React from 'react'

type AlertProps = {
    hidden: boolean;
    children: JSX.Element | string;
}

const Alert = ({ hidden, children }: AlertProps) => {
    return (
        <span className={`py-4 px-8 bg-white rounded-lg border-2 border-dark self-center absolute translate-y-48 ${hidden ? "opacity-0" : "opacity-100"} z-10 transition-opacity duration-700`}>
            {children}
        </span>
    )
}

export default Alert