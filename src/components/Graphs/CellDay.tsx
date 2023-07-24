import React from 'react';
import "../../styles/cell-day.css";

interface Props {
    day: string;
}

const CellDay: React.FC<Props> = ({day}) => {
    return (
        <div className="cell-day">
        </div>
    );
};

export default CellDay;