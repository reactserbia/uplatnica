import React, { useState } from 'react'
import S from 'styled-components';

const SavedTemplates = ({useTemplate}) => {
  const[clearallTemplatedMsg, setClearedAllTemplatesMsg] = useState('')
  const templates = JSON.parse(localStorage.getItem('templates')) ?? [];

  const generateAllSavedTemplates = () => {
        return templates.map((item) => 
        <SingleTemplate key={item.name}>
          {item?.name} <UseTemplateBtn onClick={() => useTemplate(item)}>Upotrebi šablon</UseTemplateBtn>
          </SingleTemplate>
          )
     }
  
  const clearAllTemplates = () => {
    localStorage.setItem('templates', JSON.stringify([]));
    setClearedAllTemplatesMsg('Sabloni su obrisani');
  };

  return (
    <>
        <h4>Sačuvani šabloni</h4>
        <TemplateListWrapper>
            <TemplateList>
            {templates.length > 0 ? generateAllSavedTemplates() : <p>Nema sačuvanih šablona</p> }
            </TemplateList>
        </TemplateListWrapper>
        {templates.length === 0 || <button onClick={clearAllTemplates}>Obrisi sve sablone</button>}
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

export default SavedTemplates;
