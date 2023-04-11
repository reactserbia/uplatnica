import banksData from '../constants/banksData';
import S from 'styled-components';

function BankCard({bankNumber}) {

  return (
    <BankCardWrapper>
        <h3>Ime banke: {banksData[bankNumber]?.name}</h3>
        <BankCardImage cardImg={banksData[bankNumber]?.img} />
    </BankCardWrapper>
  )
}

const BankCardWrapper = S.div`
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    width: inherit;
    padding: 1rem;
    `
const BankCardImage = S.div`
    height: 200px;
    width: 350px;
    border: 1px solid black;
    border-radius: 10px;
    background-image: url(${props => props.cardImg});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color: gray;
    `

export default BankCard;
