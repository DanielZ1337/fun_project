import React from "react";
import {cn} from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        React.RefAttributes<HTMLInputElement> {
    className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({children, className, ...props}, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    "dark:bg-neutral-900 bg-neutral-200/80 rounded-md p-2 focus:outline-2 outline-none focus:outline-purple-500 caret-purple-500 focus:outline-offset-2 placeholder:text-[#69707C] dark:placeholder:text-[#9CA3AF]",
                    className
                )}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export default Input;
