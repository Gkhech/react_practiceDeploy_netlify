import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';

const LineItem = ({item, handleCheck, handleDeleteItem}) => {
    return (
        <li className='item'>
            <input className='itemInput' onChange = {() => {handleCheck(item.id)}}type = "checkbox" checked = {item.checked}/>   
            <label onDoubleClick = {() => {handleCheck(item.id)}} 
                    style = {(item.checked) ? {textDecoration: "line-through"} : null} className='itemLabel'> {item.item} </label>
            <FaTrashAlt className='itemDelete' role = "button" tabIndex="0" onClick={() => {handleDeleteItem(item.id)}}/> 
        </li>   
    )
}

export default LineItem