import styled from 'styled-components'
import { IoMdRemove } from "react-icons/io";
import React from 'react'


const RemoveIcon = styled(IoMdRemove)`
                color: rgba(140, 140, 140, 0.6);
                cursor:pointer;
                &:hover {
                    color: black;
            }
        `

const TransparentButton = styled.button`
            background-color: transparent;
            border: none;

`

function RemoveButton(){
    return(
        <TransparentButton>
            <RemoveIcon />
        </TransparentButton>
    )
}



export default RemoveButton