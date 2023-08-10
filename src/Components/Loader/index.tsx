import clsx from "clsx";
import React, { FC } from "react";
import { ILoader } from "./Loader";

const Loader : FC<ILoader.IProps> = ({
    className
}) => {
    return (
        <div className={clsx("inline-block h-6 w-6 rounded-full animate-spin border-2 border-solid border-r-transparent border-b-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
            className
         )}>

        </div>
    )
}

export default Loader