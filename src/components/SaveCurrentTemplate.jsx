import React, { useState } from 'react'
import S from 'styled-components';
import Input from './Input';

const SaveCurrentTemplate = ({storeTemplate,currentTemplate}) => {
    const [templateIsSaved, setTemplateIsSaved] = useState(false);
    const [templateName, setTemplateName] = useState('');
    const saveTemplate = () => {
        storeTemplate(templateName);
        setTemplateIsSaved(true);
    }
    const generateSaveCurrentTemplate = () => {
        const { payer,
        paymentDescription,
        receiver,
        payCode,
        currencyCode,
        totalAmount,
        bankNumber,
        accountNumber,
        controlNumber,
        modelCode,
        paymentNumber} = currentTemplate;
               return  (
                   <div>
                       <div>
                        <Input
                            type='text'
                            width={100}
                            label='Naziv sablona'
                            id='templateName'
                            help='unesite naziv sablona'
                            helpText='Ovde upišite kako ce sablon da se zove.'
                            value={templateName}
                            whenChanged={(event) => setTemplateName(event.target.value)} />
                       </div>
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
                       {templateIsSaved && <p>Šablon je sačuvan</p>}
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
