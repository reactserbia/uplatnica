import S from "styled-components";

import Label from "./Label";

const Textarea = ({ label, value, whenChanged }) => (
  <Container>
    <Label label={label} />
    <StyledTextarea name={label} value={value} onChange={whenChanged} />
  </Container>
);

const Container = S.div`
   margin-bottom: 2px;
   text-align: left;
`;

const StyledTextarea = S.textarea`
    background-color: lightgrey;
    border: solid 1px #000;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 3.9mm;
    height: 15mm;
    width: 91mm;
    resize: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
`;
export default Textarea;
