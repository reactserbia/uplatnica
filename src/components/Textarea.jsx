import S from 'styled-components'

import Label from './Label'

const Textarea = ({ label, id, help, helpText, value, whenChanged }) => (
    <Container>
        <Label label={label} for={id}/>
        <StyledTextarea name={id} id={id} aria-describedby={help} value={value} onChange={whenChanged} />
        <span hidden id={help}>{helpText}</span>
    </Container>
)

const Container = S.div`
   margin-bottom: 2px;
   text-align: left;
`

const StyledTextarea = S.textarea`
    background-color: lightgrey;
    border: solid 1px var(--color-primary);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 3.9mm;
    height: 15mm;
    width: 91mm;
    resize: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
`
export default Textarea
