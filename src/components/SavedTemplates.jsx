import React from 'react'
import S from 'styled-components';

const SavedTemplates = ({templates,useTemplate}) => {
    const generateAllSavedTemplates = () => {
        return templates.map((item) => 
        <li key={item.name}>
          {item?.name} <UseTemplateBtn onClick={() => useTemplate(item)}>Koristi sablon</UseTemplateBtn>
          </li>
          )
     }

  return (
    <>
        <h4>Sačuvani šabloni</h4>
        <TemplateListWrapper>
            <TemplateList>
            {templates.length > 0 ? generateAllSavedTemplates() : <p>Nema sacuvanih sablona</p> }
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
