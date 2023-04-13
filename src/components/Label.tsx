import React from 'react'
import S from 'styled-components'

interface LabelProps {
label: string;
forId?: string;
}

const Label:React.FC<LabelProps> = ({ label, forId }) => <StyledLabel htmlFor={forId}>{label}</StyledLabel>

const StyledLabel = S.label`
    display: block;
    line-height: 1.2em;
    font-size: 12px;
    color: var(--color-primary);
    margin-bottom: 0.2em;
`

export default Label
