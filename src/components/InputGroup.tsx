import React from 'react'
import ErrorMessage from './ErrorMessage.js'
import S from 'styled-components'
import { useState } from 'react'
import { InputsProps } from './SplittedInput.js';

interface InputGroupProps {
    input: InputsProps;
    index: number;
}

const InputGroup:React.FC<InputGroupProps> = ({ input, index }) => {
    const [focused, setFocused] = useState(false)

    const handleFocus = (event: React.FocusEvent) => {
        setFocused(true)
        if (input?.appendZeros && event.target.value.length < 13) input.appendZeros(event.target.value)
    }

    return (
        <StyledInputGroup width={input.width}>
            <StyledInput
                type={input.type}
                value={input.value}
                pattern={input.pattern}
                required={input.required}
                aria-label={input.ariaLabel}
                onChange={input.whenChanged}
                onBlur={handleFocus}
                data-focus-leave={focused.toString()}
                aria-errormessage={'error' + index}
            />
            <ErrorMessage id={'error' + index} errorMessage={input.errorMessage} />
        </StyledInputGroup>
    )
}

interface StyledInputGroup {
    width: number;
 };

const StyledInputGroup = S.div<StyledInputGroup>`
width: ${props => (props.width ? props.width : '100')}%;
display: inline-block;
`

const StyledInput = S.input`
   width: calc(100% - 11px);
   background-color: lightgrey;
   border: solid 1px var(--color-primary);
   font-family: Arial, Helvetica, sans-serif;
   line-height: 1.34em;
   font-size: 14px;
   padding: 2px 8px;
   -webkit-appearance: none;
   -moz-appearance: none;
   appearance: none;
   outline: none;
   &:focus {
      border: solid 1px orange;
      box-shadow: 0 0 2px 2px orange;
   };
   &:invalid[data-focus-leave="true"]&:not(:focus) {
    border: solid 1px red;
    box-shadow: 0 0 2px 2px red;
   };
   &:invalid[data-focus-leave="true"]&:not(:focus) ~ p {
    display: block;
   };
`
export default InputGroup
