import Label from './Label.jsx'
import S from 'styled-components'
import Select from 'react-select'

const ModelselectStyles = {
    control: styles => ({
        ...styles,
        borderRadius: '0',
        backgroundColor: 'lightgrey',
        borderColor: 'white',
        borderWidth: '3px',
        boxShadow: 'none',
        top: '-1px'
    }),
    menu: styles => ({
        ...styles,
        white: '200px'
    }),
    menuList: styles => ({
        ...styles,
        background: 'white',
        color: 'lightgray'
    }),
    option: (styles, { isFocused, isSelected }) => ({
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

const Modelselect = ({ width, placeholder, helpId, helpText, label, value, whenChanged, options }) => (
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
)

const Container = S.div`
   display: inline-block;
   text-align: left;
   margin-bottom: 7px;
   padding-right: 10px;
   width: ${props => (props.width ? props.width : '100')}%;  
`

export default Modelselect
