import React, { useState } from 'react'
import { CurrentTemplate } from '../pages/Payslip';
import S from 'styled-components';

interface SavedTemplatesProps {
  useTemplate: (template: CurrentTemplate) => void;
}

const SavedTemplates:React.FC<SavedTemplatesProps> = ({useTemplate}) => {
  const[clearallTemplatedMsg, setClearedAllTemplatesMsg] = useState('');
  const[templatedIsUsedMsg, setTemplateIsUsedMsg] = useState('');

  const templates = JSON.parse(localStorage.getItem('templates')) ?? [];

  const handleUseTemplate = (template: CurrentTemplate) => {
    useTemplate(template);
    setTemplateIsUsedMsg('Šablon je upotrebljen');
  };

  const generateAllSavedTemplates = () => {
        return templates.map((item: CurrentTemplate) => 
        <SingleTemplate key={item.name}>
          {item?.name} <UseTemplateBtn onClick={() => handleUseTemplate(item)}>Upotrebi šablon</UseTemplateBtn>
          </SingleTemplate>
          )
     }
  
  const clearAllTemplates = () => {
    localStorage.setItem('templates', JSON.stringify([]));
    setClearedAllTemplatesMsg('Šabloni su obrisani');
  };

  return (
    <>
        <h4>Sačuvani šabloni</h4>
        <h6>{templatedIsUsedMsg}</h6>
        <TemplateListWrapper>
            <TemplateList>
            {templates.length > 0 ? generateAllSavedTemplates() : <p>Nema sačuvanih šablona</p> }
            </TemplateList>
        </TemplateListWrapper>
        {templates.length === 0 || <ClearTemplatesBtn onClick={clearAllTemplates}>Obriši sve šablone</ClearTemplatesBtn>}
        <p>{clearallTemplatedMsg}</p>
    </>
  )
}

const TemplateListWrapper = S.div
` background-color: rgb(232,238,244);
 width:100%;
 margin-top: 1rem;
 padding: 0.5rem;
`
const TemplateList = S.ul
`margin-left: 1rem;
`
const SingleTemplate = S.li
`display: flex;
 justify-content: space-between;
 border-bottom: 2px solid gray;
 padding: 0.3rem;
`
const UseTemplateBtn = S.button
`padding: 0.3rem;
`
const ClearTemplatesBtn = S.button
`padding: 0.3rem;
 margin-top: 1.5rem;
`

export default SavedTemplates;
