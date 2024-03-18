import React from 'react';
import banksData from '../constants/bankData';
import S from 'styled-components';

interface BankCardProps {
   bankNumber: string;
   }

const BankCard:React.FC<BankCardProps> = ({bankNumber}) => {

const bank = banksData.find((item) => item.bankNumber === bankNumber) ;

  return (
  <BankCardWrapper>
     <BankName>Ovaj račun pripada: {bank?.name ?? 'Nepostojeća banka'}</BankName>
  </BankCardWrapper>
   )}

const BankCardWrapper = S.div`
display: flex;
flex-direction: column;
align-items:flex-start;
margin-bottom: 0.3rem;
overflow: hidden;
`
const BankName = S.p`line-height: 1.2em;
font-family: Arial, Helvetica, sans-serif;
font-size: 3mm;
max-width: 100%;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`

export default BankCard
