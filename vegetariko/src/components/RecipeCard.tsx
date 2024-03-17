import React from "react";
import { Link } from "react-router-dom";
import Panel from "rsuite/esm/Panel";

type RecipeCardProps = {
  title: string;
  imgUrl: string;
  idRecipe: number
};
const RecipeCard: React.FC<RecipeCardProps> = ({ title, imgUrl , idRecipe}) => {
  return (
    <Link to={`/recipe/${idRecipe}`}>
    
    <Panel
      shaded
      bordered
      bodyFill
      style={{
        display: "inline-block",
        width: 240,
        height: 280,
        cursor: "pointer",
      }}
    >
      <img src={imgUrl} height="240" />
      <Panel header={title}></Panel>
    </Panel>
    </Link>
  );
};

export default RecipeCard;
