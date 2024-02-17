import React from 'react'
import LineItem from './LineItem';

const ItemList = ({items, handleCheck, handleDeleteItem}) => {
    return (
        <ul>
            {items.map((item) => (
                <LineItem key = {item.id} item = {item} handleCheck = {handleCheck} handleDeleteItem = {handleDeleteItem}/>
            ))}    
        </ul>   
    )
}

export default ItemList