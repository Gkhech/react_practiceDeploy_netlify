import React from 'react'

const Header = ({title}) => {
    const headerStyle = {
        backgroundColor: "royalblue",
        color: '#fff'
    };

    return (
        <header>    
            <h1> {title} </h1>
        </header>
    )
}

//! default vals if value not provided
//! in this case if title is not provided it will use defaultProps
Header.defaultProps = {
    title: "Default title"
}

export default Header;