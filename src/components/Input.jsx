import Label from "./Label.jsx";
import S from "styled-components";

const Input = ({ label, value, whenChanged }) => (
  <Container>
    <Label label={label} />
    <InnerInput value={value} onChange={whenChanged} />
  </Container>
);

const Container = S.div`
   margin-bottom: 20px;
`;
const InnerInput = S.input`
   
`;

export default Input;
