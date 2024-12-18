import React, {useId} from 'react'

// WE CAN WRITE FORWARD REF SYNTAX IN 2 WAYS 1ST WAY REFER IN BUTTON.JSX
// 2ND WAY IS LOOK IN THE EXPORT WHICH IS PRESENT IN THE END OF THIS FILE

function Select({
    options,
    label,
    className = '',
    ...props

}, ref){

    const Id = useId();
    return(
        <div className='w-full'>
            {label && <label htmlFor={Id} className=''>
                
            </label>}

            <select
            {...props} 
            id={Id}
            ref = {ref}
            className=
            {`px-3 py-2 rounded-lg  bg-white text-black
            outline-none foucs:bg-gray-50 duration-200 border 
            border-gray-200 w-full
            ${className}`}
            
            >
                {options?.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}

            </select>
        </div>
    )
}


export default React.forwardRef(Select)

// WE DIDN'T IMPORT FORWWARD REF FROM REACT SO IT CAN BE WRITTEN AS LIKE THE ABOVE