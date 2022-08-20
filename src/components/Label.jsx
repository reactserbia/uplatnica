import S from "styled-components";

const Label = ({ label }) => <StyledLabel htmlFor={label}>{label}</StyledLabel>;
const StyledLabel = S.label`
    display: block;
    text-align: left;
    `;

export default Label;
