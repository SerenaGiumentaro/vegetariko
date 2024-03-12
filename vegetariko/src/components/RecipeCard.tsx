import React from 'react'
import Panel from 'rsuite/esm/Panel'

type RecipeCardProps = {
    title: string;
    imgUrl: string;
}
const RecipeCard:React.FC<RecipeCardProps> = ({title, imgUrl}) => {
  return (
    <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240, height: 280}}>
    <img src={imgUrl} height="240" />
    <Panel header={title} >
      
    </Panel>
  </Panel>
  )
}

export default RecipeCard