import './Square.css';
import React from "react";

interface SquareProps {
    className: string;
    uniqueKey: string;
}

//memoize squares to prevent whole grid from re rendering
const Square = React.memo(({ className, uniqueKey }: SquareProps) => {
    return <div key={uniqueKey} className={className}></div>
});

export default Square;