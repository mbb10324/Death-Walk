import React from "react";
import './Square.css'

interface SquareProps {
    id: string;
    className: string;
  }
  
  const Square = React.memo(({ id, className }: SquareProps) => {
    return <div id={id} className={className}></div>;
  });
  
  export default Square;