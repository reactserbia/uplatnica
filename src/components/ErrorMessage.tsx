import React from 'react'
import S from 'styled-components'

const ErrorMessage = ({ id, errorMessage }) => <StyledErrorMessage id={id}>{errorMessage}</StyledErrorMessage>

const StyledErrorMessage = S.p`
display: none;
margin-top: 0.5rem;
color: red;
font-size: 13px;
font-family: Arial, Helvetica, sans-serif;
`

export default ErrorMessage
