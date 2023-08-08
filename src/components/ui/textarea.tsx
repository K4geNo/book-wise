import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    maxLength?: number
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ className, maxLength, ...props }, ref) => {
        const valueLength = String(props.value).length || 0

        return (
            <div
                className={cn(
                    'flex w-full flex-col rounded border border-current bg-gray-800 text-gray-500 transition focus-within:text-green-200',
                    className,
                )}
            >
                <textarea
                    className={cn(
                        'min-h-[136px] flex-1 resize-none border-none bg-gray-800 px-5 py-[14px] text-sm text-gray-100 placeholder:text-gray-400 focus:outline-none',
                    )}
                    maxLength={maxLength}
                    ref={ref}
                    {...props}
                />
                {maxLength && (
                    <span className="ml-auto pb-4 pr-2 text-xs text-[#7C7C8A]">
                        {valueLength}/{maxLength}
                    </span>
                )}
            </div>
        )
    },
)
TextArea.displayName = 'TextArea'

export { TextArea }
