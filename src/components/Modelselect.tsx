import React from 'react'
import Label from './Label.js'
import S from 'styled-components'
import Select from 'react-select'
import { ModelCodeOptionsType, PayCodeOptionsType } from '../pages/Payslip'

const ModelselectStyles = {
    control: (styles: any) => ({
        ...styles,
        borderRadius: '0',
        backgroundColor: 'lightgrey',
        borderColor: 'white',
        borderWidth: '3px',
        boxShadow: 'none',
        top: '-1px'
    }),
    menu: (styles: any) => ({
        ...styles,
        white: '200px'
    }),
    menuList: (styles: any) => ({
        ...styles,
        background: 'white',
        color: 'lightgray'
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
        ...styles,
        background: isFocused ? 'gray' : isSelected ? 'lightgrey' : 'undefined',
        zIndex: 1
    })
}

const theme = theme => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary: 'gray',
        primary75: 'gray',
        primary50: 'gray',
        primary25: 'gray'
    },
    spacing: {
        ...theme.spacing,
        controlHeight: 14,
        baseUnit: 0.55
    }
})

interface ModelselectProps {
    width: number;
    placeholder: string;
    helpId: string;
    helpText:string;
    label: string;
    value: string;
    whenChanged: (e:any) => void;
    options: PayCodeOptionsType[] | ModelCodeOptionsType[];
}



const Modelselect:React.FC<ModelselectProps> = ({ width, placeholder, helpId, helpText, label, value, whenChanged, options }) => {

    console.log(typeof options)
    return (
    <Container width={width}>
        <Label label={label} />
        <Select
            placeholder={placeholder}
            aria-label={placeholder}
            aria-labelledby={helpId}
            options={options}
            styles={ModelselectStyles}
            theme={theme}
            defaultValue={value}
            value={value}
            onChange={whenChanged}
            />
        <span hidden id={helpId}>{helpText}</span>
    </Container>
)}

interface ContainerProps {
    width: number;
 };

const Container = S.div<ContainerProps>`
   display: inline-block;
   text-align: left;
   margin-bottom: 7px;
   padding-right: 10px;
   width: ${props => (props.width ? props.width : '100')}%;  
`

export default Modelselect
