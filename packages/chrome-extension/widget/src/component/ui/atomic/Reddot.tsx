import clsx from 'clsx'

interface Props {
    className?: any
}

const Reddot = ({ className }: Props) => {
    return (
        <div className={clsx(className, "absolute h-2 w-2 bg-red-600 rounded-full inline-block")} />
    )
}

export default Reddot
