import React from 'react'

function Spinner() {
    return (
        <div style={{ fontSize: 50, display: "flex", alignItems: "center", flex: 1, justifyContent: "center", }}>
            <i className="fas fa-circle-notch fa-spin"></i>
        </div>
    )
}

export { Spinner }
