
interface DropDivProps {
    height : string;
}

const DropDiv = ({height} : DropDivProps) => {
    return ( 

        <div className={`${height} bg-taskBgColor font-normal h-min w-11/12 rounded-[8px]`}>

        </div>
    )
}

export default DropDiv