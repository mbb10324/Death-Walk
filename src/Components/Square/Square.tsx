import React from "react";
import './Square.css'

interface SquareProps {
    id: string;
    className: string;
}

//memoize squares to prevent whole grid from re rendering
const Square = React.memo(({ id, className }: SquareProps) => {
    return <div id={id} className={className}></div>;
});

export default Square;