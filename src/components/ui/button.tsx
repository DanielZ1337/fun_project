import React from "react";
import {cn} from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        React.RefAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({children, className, ...props}, ref) => {
        return (
            <button
                ref={ref}
                className={cn("bg-purple-300 dark:bg-purple-800 active:bg-purple-400 dark:active:bg-purple-700 focus:outline-none focus-visible:outline-purple-500", className)}
                {...props}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export default Button;
