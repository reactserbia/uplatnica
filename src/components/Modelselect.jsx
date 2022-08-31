import Label from './Label.jsx'
import S from 'styled-components'
import Select from "react-select";

const options = [
  { value: '97', label: '97' },
  { value: '11', label: '11' },
  { value: '00', label: '00' }
]

const ModelselectStyles = {
  indicatorsContainer: styles => ({
    ...styles,
  }),
  control: styles => ({
    ...styles,
    borderRadius: '0',
    backgroundColor: 'lightgrey',
    borderColor: 'white',
    borderWidth: '3px',
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
        : undefined,
    zIndex: 1
  }),
  menu: base => ({
    ...base,
    zIndex: 100
  })
}

const theme = (theme) => ({
  ...theme,
  spacing: {
    ...theme.spacing,
    controlHeight: 16,
    baseUnit: 0.6,
  }
});

const Modelselect = ({ type = 'text', disabled, width, label, value, whenChanged }) => (
  <Container width={width}>
    <Label label={label} />
    <Select options={options}
            placeholder={'Izaberi'}
styles={ModelselectStyles}
            theme={theme}
            // onInputChange={}
            // onMenuClose={}
            // inputValue={}
            // onMenuOpen={}
            onChange={whenChanged}
            value={value}/>
    {/*<InnerInput type={type} disabled={disabled} value={value} onChange={whenChanged} />*/}
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
