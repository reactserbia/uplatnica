import React from 'react'
import { Theme, StylesConfig} from 'react-select';
import Label from './Label.js'
import S from 'styled-components'
import Select from 'react-select'
import { ModelCodeOptionsType, PayCodeOptionsType } from '../pages/Payslip'

interface OptionType {
    label: string;
    value: string;
  }
  
  interface ModelSelectStyles extends StylesConfig<OptionType, false> {
    control: StylesConfig<OptionType, false>['control'];
    menu: StylesConfig<OptionType, false>['menu'];
    menuList: StylesConfig<OptionType, false>['menuList'];
    option: StylesConfig<OptionType, false>['option'];
  }
  
  const ModelselectStyles: ModelSelectStyles = {
    control: (styles) => ({
      ...styles,
      borderRadius: '0',
      backgroundColor: 'lightgrey',
      borderColor: 'white',
      borderWidth: '3px',
      boxShadow: 'none',
      top: '-1px',
    }),
    menu: (styles) => ({
      ...styles,
      white: '200px',
    }),
    menuList: (styles) => ({
      ...styles,
      background: 'white',
      color: 'lightgray',
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused ? 'gray' : isSelected ? 'lightgrey' : 'undefined',
      zIndex: 1,
    }),
  };

  const customTheme = (theme: Theme) => {
    const newTheme = {
      ...theme,
      colors: {
        ...theme.colors,
        primary: 'gray',
        primary75: 'gray',
        primary50: 'gray',
        primary25: 'gray',
      },
      spacing: {
        ...theme.spacing,
        controlHeight: 14,
        baseUnit: 0.55,
      },
    };
    return newTheme;
  };

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
            theme={customTheme}
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
