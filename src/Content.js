import React from 'react'
import { useState } from 'react';
import ItemList from './ItemList';
const Content = ({items, setItems, handleCheck, handleDeleteItem   }) => {
    
    
    //!list items need keys attached 
    return (
        <> 
            {items.length ? (
                <ItemList items = {items} handleCheck = {handleCheck} handleDeleteItem = {handleDeleteItem}/>
            ) : (
                <p style = {{backgroundColor: "blue"}}> Your list is empty </p> 
            )}
        </>
    )
}

export default Content;