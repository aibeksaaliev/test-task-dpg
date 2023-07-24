import React, {useState} from 'react';
import "../../styles/cell-day.css";
import {ContributionCell} from "../../types";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

interface Props {
    day: ContributionCell;
}

const CellDay: React.FC<Props> = ({day}) => {
    const [popup, setPopup] = useState<boolean>(false);
    const detectContributionCellColor = (day: ContributionCell) => {
        if (day.amount >= 1 && day.amount <= 9) {
            return 'light-blue';
        } else if (day.amount >= 10 && day.amount <= 19) {
            return 'blue';
        } else if (day.amount >= 20 && day.amount <= 29) {
            return 'dark-blue';
        } else if (day.amount >= 30) {
            return 'deep-blue';
        } else {
            return "";
        }
    };

    const formatDateToRussian = (inputDate: string) => {
        const date = dayjs(inputDate);
        return date.locale('ru').format('dddd, MMMM DD, YYYY');
    };

    const inputDate = day.date;
    const formattedDate = formatDateToRussian(inputDate);

    const handleMouseEnter = () => {
        setPopup(true);
    };

    const handleMouseLeave = () => {
        setPopup(false);
    };

    const classesList = "cell-day " + detectContributionCellColor(day);

    return (
        <div
            className={classesList}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {popup && (
                <div className="popup">
                    <div className="popup-info">
                        <p className="amount-info">{day.amount} contributions</p>
                        <span className="date-info">{formattedDate}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CellDay;