import React from 'react'
import ReactDOM from 'react-dom';

function Portal({children, portalId}) {

    return ReactDOM.createPortal(
        <>{children}</>,
        document.getElementById(portalId)
    )
}

export default Portal
