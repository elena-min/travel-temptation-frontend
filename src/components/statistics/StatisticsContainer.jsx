import { useState, useEffect } from "react";
import WeeklyStatisticsGraph from "./WeeklyStatisticsGraph";
import { getWeeklyStatistics } from "../../services/StatisticsService";

function StatisticsContainer({ excursionId }) {
    const[data, setData] = useState([]);
    const[status, setStatus] = useState("CONFIRMED");

    useEffect(() => {
        fetchData();
    }, [excursionId, status]);

    const fetchData = async () => {
        try {
            const stats = await getWeeklyStatistics(excursionId, status);
            setData(stats);
        } catch (error) {
            console.error('Error fetching weekly statistics:', error);
        }
    };

    return (
        <div>
            <h3>Weekly Statistics</h3>
            <WeeklyStatisticsGraph data={data} />
        </div>
    );
}

export default StatisticsContainer;