'use client'

interface HeadingProps{
    title?: string,
    subtitle?: string,
    center?: boolean,
}

const Heading : React.FC<HeadingProps> = ({
    title,
    subtitle,
    center = false
}) => {
    return(
        <div className={`${center ? 'text-center':'text-start'}`} >
            {/* title  */}
            <div className="text-2xl font-bold">
                {title}
            </div>
            {/* subtitle  */}
            <div className="text-neutral-500 -mt-[4px] font-light">
                {subtitle}
            </div>
        </div>
    )
}

export default Heading