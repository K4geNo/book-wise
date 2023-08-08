import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, icon, ...props }, ref) => {
        return (
            <div
                className={cn(
                    'flex w-full items-center gap-5 rounded border border-current bg-gray-800 pr-5 text-gray-500 transition focus-within:text-green-200',
                    className,
                )}
            >
                <input
                    type={type}
                    className={cn(
                        'h-12 flex-1 border-none bg-gray-800 pl-5 text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none',
                    )}
                    ref={ref}
                    {...props}
                />
                {icon}
            </div>
        )
    },
)
Input.displayName = 'Input'

export { Input }
