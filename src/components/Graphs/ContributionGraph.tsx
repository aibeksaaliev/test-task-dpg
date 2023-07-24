import React, {useEffect, useState} from 'react';
import "../../styles/contribution-graph.css";
import CellDay from "./CellDay";
import {axiosApi} from "../../axiosApi";
import dayjs from "dayjs";
import {ContributionCell} from "../../types";

const ContributionGraph = () => {
    const [contributions, setContributions] = useState<ContributionCell[]>([]);
    const getContributions = async () => {
        const response = await axiosApi.get("calendar.json");
        return response.data;
    };

    const generateCellDays = async () => {
        const contributionsList = await getContributions();
        const days: ContributionCell[] = [];
        const today = dayjs();
        let yearBefore = dayjs(today).subtract(357, 'day');

        for (let i = 0; i < 357; i++) {
            const generatedDay = dayjs(yearBefore).add(i, 'day');
            const date: string = generatedDay.format('YYYY-MM-DD');
            days.push({date, amount: 0});
        }

        days.forEach((day) => {
            Object.entries(contributionsList).forEach((contribution) => {
                if (day.date === contribution[0]) {
                    day.amount = contribution[1] as number;
                }
            });
        });

        setContributions(days);
    };

    useEffect(() => {
        const fetchData = async () => {
            await generateCellDays();
        };
        fetchData();
    }, [])

    return (
        <div className="contribution-graph">
            {contributions.map((day) => {
                return <CellDay key={day.date} day={day}/>;
            })}
        </div>
    );
};

export default ContributionGraph;