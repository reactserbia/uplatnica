import S from "styled-components";

const Label = ({ label }) => <StyledLabel htmlFor={label}>{label}</StyledLabel>;
const StyledLabel = S.label`
    display: block;
    font-size: 12px;
    line-height: 1.2em;
    margin-bottom: 0.2em;
    `;

export default Label;
