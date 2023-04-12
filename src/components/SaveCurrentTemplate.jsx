import React from 'react'
import S from 'styled-components';

const SaveCurrentTemplate = ({saveTemplate,currentTemplate}) => {

    const generateSaveCurrentTemplate = () => {
        const {name, payer,
        paymentDescription,
        receiver,
        payCode,
        currencyCode,
        totalAmount,
        bankNumber,
        accountNumber,
        controlNumber,
        accountReceivable,
        modelCode,
        paymentNumber} = currentTemplate;
               return  (
                   <div>
                       <p>Ime sablona: {name}</p>
                       <p>Uplatilac: {payer}</p>
                       <p>Svrha: {paymentDescription}</p>
                       <p>Primalac: {receiver}</p>
                       <p>Sifra placanja: {payCode.label}</p>
                       <p>Valuta: {currencyCode}</p>
                       <p>Ukupno: {totalAmount}</p>
                       <p>Broj racuna: {bankNumber}-{accountNumber}-{controlNumber}</p>
                       <p>Model: {modelCode.value}</p>
                       <p>Poziv na broj: {paymentNumber}</p>
                       <SaveTemplateBtn onClick={saveTemplate}>Sačuvaj šablon</SaveTemplateBtn>
                   </div>
               )
       };

  return (
    <>
        <h4>Sačuvaj ovaj šablon</h4>
        {generateSaveCurrentTemplate()}
    </>
  )
}

const SaveTemplateBtn = S.button
`align-self: center;
padding: 0.5rem;
`

export default SaveCurrentTemplate;
