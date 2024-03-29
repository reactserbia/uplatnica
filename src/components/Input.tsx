import React from 'react';
import { deviceBrakepoints } from '../config/device-brakepoints'
import Label from './Label'
import S from 'styled-components'

interface InputProps {
   type?: string;
   id: string;
   help: string;
   helpText: string;
   disabled?: boolean;
   width: number;
   label: string;
   value: string | number; 
   whenChanged: (e:React.ChangeEvent<HTMLInputElement>) => void;
};

const Input:React.FC<InputProps> = ({ type = 'text', id, help, helpText, disabled, width, label, value, whenChanged }) => (
    <Container width={width} >
        <Label label={label} forId={id}/>
        <InnerInput type={type} name={id} id={id} aria-describedby={help} disabled={disabled} value={value} onChange={whenChanged} />
        <span hidden id={help}>{helpText}</span>
    </Container>
)

interface ContainerProps {
   width: number;
};

const Container = S.div<ContainerProps>`
   display: inline-block;
   text-align: left;
   margin-bottom: 7px;
   width: ${props => (props.width ? props.width : '100')}%;  
`
const InnerInput = S.input`
   width: calc(100% - 36px);
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
   border-width: 0.7mm;
   &:disabled {
        background: gray;
   }
   &:focus {
      border: solid 1px orange;
      box-shadow: 0 0 2px 2px orange;
   }
   @media ${deviceBrakepoints.mobile} {
      width: calc(100% - 26px);
   }
`

export default Input
