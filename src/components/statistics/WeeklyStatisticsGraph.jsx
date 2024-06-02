import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


function WeeklyStatisticsGraph({ data }) {

    const chartData = {
        labels: data.map(d => `Week ${d.week}, ${d.year}`),
        datasets: [
            {
                label: "Number of bookings",
                data: data.map(d => d.numberOfBookings),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: "Total revenue",
                data: data.map(d => d.totalRevenue),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            }
        ]
    };

   

    return (
        <div>
            <Bar data = {chartData}/>
        </div>
    );
}

export default WeeklyStatisticsGraph;
