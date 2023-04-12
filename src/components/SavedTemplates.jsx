import React from 'react'
import S from 'styled-components';

const SavedTemplates = ({templates}) => {
console.log({templates})
    const generateAllSavedTemplates = () => {
        return templates.map((item) => <li key={item.name}>{item?.name}</li>)
     }

  return (
    <>
        <h4>Sačuvani šabloni</h4>
        <TemplateListWrapper>
            <TemplateList>
            {generateAllSavedTemplates()}
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

export default SavedTemplates;
