import Label from './Label.jsx'
import S from 'styled-components'
import Select from "react-select";

const options = [
  { value: '97', label: '97' },
  { value: '11', label: '11' },
  { value: '00', label: '00' }
]

const ModelselectStyles = {
  control: styles => ({
    ...styles,
    borderRadius: '0',
    backgroundColor: 'lightgrey',
    borderColor: 'white',
    borderWidth: '3px',
    boxShadow: 'none',
    top: '-1px',
  }),
  menuList: styles => ({
    ...styles,
    background: 'white',
    color: 'lightgray'
  }),
  option: (styles, {isFocused, isSelected}) => ({
    ...styles,
    background: isFocused
      ? 'gray'
      : isSelected
        ? 'lightgrey'
        : 'undefined',
    zIndex: 1
  })
}

const theme = (theme) => ({
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
    baseUnit: 0.55,
  }
});

const Modelselect = ({ type = 'text', width, label, value, whenChanged }) => {
  const handleChange = value => {
    whenChanged = value.value
  };

  return <Container width={width}>
    <Label label={label} />
    <Select options={options}
            placeholder={'Izaberi'}
            name={label}
            styles={ModelselectStyles}
            theme={theme}
            defaultValue={value}
            value={value.value}
            onChange={handleChange}
            />
  </Container>
}

const Container = S.div`
   display: inline-block;
   text-align: left;
   margin-bottom: 7px;
   padding-right: 10px;
   width: ${props => (props.width ? props.width : '100')}%;  
`


export default Modelselect
