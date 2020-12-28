import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap';



export default function ErrorMessageComponent({ message }) {

    if (message) {
        return (
            <div>
                <Alert color="danger">{message}</Alert>
            </div>
        )
    }
    return null
}

const mapStateToProps = ({ error }) => {
    return {
        message: error.message
    };
};

const ErrorMessage = connect(mapStateToProps)(ErrorMessageComponent)
export { ErrorMessage }