import { useState } from 'react'

export const useToggleShowMore = (string: string, maxLength: number) => {
    const [isShowMore, setIsShowMore] = useState(
        () => string.length <= maxLength,
    )

    const toggleShowMore = () => {
        setIsShowMore((prev) => !prev)
    }

    const text = isShowMore ? string : string.slice(0, maxLength) + '...'

    return { text, isShowMore, toggleShowMore }
}
