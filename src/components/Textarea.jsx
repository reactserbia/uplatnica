import S from "styled-components";

import Label from "./Label";

const Textarea = ({ label, value, whenChanged }) => (
  <Container>
    <Label label={label} />
    <StyledTextarea name={label} value={value} onChange={whenChanged} />
  </Container>
);

const Container = S.div`
   margin-bottom: 20px;
`;

const StyledTextarea = S.textarea`
    border: 1px solid black;
`;
export default Textarea;
