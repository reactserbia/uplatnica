import React from 'react'
import S from 'styled-components'

interface ErrorMessageProps {
    id: string;
    errorMessage: string;
}

const ErrorMessage:React.FC<ErrorMessageProps> = ({ id, errorMessage }) => <StyledErrorMessage id={id}>{errorMessage}</StyledErrorMessage>

const StyledErrorMessage = S.p`
display: none;
margin-top: 0.5rem;
color: red;
font-size: 13px;
font-family: Arial, Helvetica, sans-serif;
`

export default ErrorMessage
