import React, {useEffect, useState} from 'react';
import "../../styles/contribution-graph.css";
import CellDay from "./CellDay";
import {axiosApi} from "../../axiosApi";
import dayjs from "dayjs";
import {ContributionCell} from "../../types";
import 'dayjs/locale/ru';

const ContributionGraph = () => {
    const [contributions, setContributions] = useState<ContributionCell[]>([]);
    const [months, setMonths] = useState<string[]>([]);

    const getContributions = async () => {
        const response = await axiosApi.get("calendar.json");
        return response.data;
    };

    const generateCellDays = async () => {
        const contributionsList = await getContributions();
        const days: ContributionCell[] = [];
        const months: string[] = [];
        const today = dayjs();
        let yearBefore = dayjs(today).subtract(357, 'day');

        for (let i = 1; i <= 357; i++) {
            const generatedDay = dayjs(yearBefore).add(i, 'day');
            const date: string = generatedDay.format('YYYY-MM-DD');
            days.push({date, amount: 0});
        }

        for (let i = 0; i <= 12; i++) {
            const month = today.add(+i, 'month').locale('ru').format('MMM');
            months.push(month);
        }

        days.forEach((day) => {
            Object.entries(contributionsList).forEach((contribution) => {
                if (day.date === contribution[0]) {
                    day.amount = contribution[1] as number;
                }
            });
        });

        setMonths(months);

        setContributions(days);
    };

    useEffect(() => {
        const fetchData = async () => {
            await generateCellDays();
        };

        fetchData().catch(console.error);
    }, []);

    return (
        <>
            <div className="contribution-graph">
                <div className="contribution-graph-months">
                    <ul className="contribution-graph-months-list">
                        {months.map((month, index) => {
                            return (
                                <li key={index} className="contribution-graph-month-item">{month}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className="contribution-graph-days">
                    <ul className="contribution-graph-days-list">
                        <li className="contribution-graph-day-item">Пн</li>
                        <li className="contribution-graph-day-item">Вт</li>
                        <li className="contribution-graph-day-item">Ср</li>
                        <li className="contribution-graph-day-item">Чт</li>
                        <li className="contribution-graph-day-item">Пт</li>
                        <li className="contribution-graph-day-item">Сб</li>
                        <li className="contribution-graph-day-item">Вс</li>
                    </ul>
                </div>
                <div className="contribution-graph-cells">
                    {contributions.map((day) => {
                        return <CellDay key={day.date} day={day}/>;
                    })}
                </div>
            </div>
            <div className="contribution-graph-info">
                <span className="contribution-graph-info-text">Меньше</span>
                <ul className="contribution-graph-info-list">
                    <li className="contribution-graph-info-item">0</li>
                    <li className="contribution-graph-info-item color1-9">1-9</li>
                    <li className="contribution-graph-info-item color10-19">10-19</li>
                    <li className="contribution-graph-info-item color20-29">20-29</li>
                    <li className="contribution-graph-info-item color30">30+</li>
                </ul>
                <span className="contribution-graph-info-text">Больше</span>
            </div>
        </>
    );
};

export default ContributionGraph;