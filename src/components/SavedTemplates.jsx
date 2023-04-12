import React from 'react'
import S from 'styled-components';

const SavedTemplates = ({useTemplate}) => {
  const templates1 = JSON.parse(localStorage.getItem('templates')) ?? [];
    const generateAllSavedTemplates = () => {
        return templates1.map((item) => 
        <li key={item.name}>
          {item?.name} <UseTemplateBtn onClick={() => useTemplate(item)}>Upotrebi šablon</UseTemplateBtn>
          </li>
          )
     }

  return (
    <>
        <h4>Sačuvani šabloni</h4>
        <TemplateListWrapper>
            <TemplateList>
            {templates1.length > 0 ? generateAllSavedTemplates() : <p>Nema sačuvanih šablona</p> }
            </TemplateList>
        </TemplateListWrapper>
    </>
  )
}

const TemplateListWrapper = S.div
` background-color: orange;
 width:100%;
 margin-top: 1rem;
`
const TemplateList = S.ol
`margin-left: 2rem;
`
const UseTemplateBtn = S.button
`margin-left: 60%;
`

export default SavedTemplates;
