import React from 'react'
import InputGroup from './InputGroup.tsx'
import S from 'styled-components'
import { deviceBrakepoints } from '../config/device-brakepoints.ts'

export interface InputsProps {
    type: string;
    width: number;
    value: string;
    pattern: string;
    required: boolean;
    errorMessage: string;
    ariaLabel: string;
    whenChanged: (e: any) => void;
    appendZeros?: (v:any) => void;
}

interface SplittedInputProps {
    legend: string;
    inputs: InputsProps[];
}

const SplittedInput:React.FC<SplittedInputProps> = ({ legend, inputs }) => (
    <Container>
        <Legend>{legend}</Legend>
        {inputs.map((input, index) => (
            <InputGroup input={input} index={index} key={index}></InputGroup>
        ))}
    </Container>
)
const Container = S.fieldset`
   display: flex;
   text-align: left;
   margin-bottom: 7px;
   border: none;
   width: 100%; 

   @media ${deviceBrakepoints.mobile} {
      width: 91mm;
   }
`

const Legend = S.legend`
display: block;
line-height: 1.2em;
font-size: 12px;
color: var(--color-primary);
margin-bottom: 0.2em;
`

export default SplittedInput
