import React from 'react';
import "../../styles/contribution-graph.css";
import CellDay from "./CellDay";

const ContributionGraph = () => {
    const generate365 = () => {
        const days = [];
        const today = new Date();
        let yearBefore = new Date(today.getTime());
        yearBefore.setDate(today.getDate() - 357);

        for (let i = 0; i < 357; i++) {
            let generatedDay = new Date(yearBefore);
            generatedDay.setDate(yearBefore.getDate() + i);
            days.push(generatedDay);
        }

        return days;
    };

    return (
        <div className="contribution-graph">
            {generate365().map((day) => {
                return <CellDay key={day.toISOString()} day={day.toISOString()}/>;
            })}
        </div>
    );
};

export default ContributionGraph;