import InputGroup from './InputGroup.jsx'
import S from 'styled-components'
import { deviceBrakepoints } from '@config/device-brakepoints.jsx'

const SplittedInput = ({ legend, inputs }) => (
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
