import clsx from "clsx";
import React, { FC } from "react";
import "../../index.css"
import Loader from "../Loader";
import IButton from "./Button";

const Button : FC<IButton.IProps> = ({
    title,
    className,
    disabled,
    loader,
    loaderClassName,
    onClick
}) => {
    return(
        <div>
            <button onClick={onClick} className={clsx(
                "border w-36 px-10 py-2 rounded-3xl",
                className,
                loader && 'px-14',
                disabled && "cursor-not-allowed opacity-40"
            )}
            disabled={disabled}
            >
                {loader ? <Loader className={loaderClassName} /> : title}
            </button>
        </div>
    )
}

export default Button;