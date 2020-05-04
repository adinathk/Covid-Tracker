import React, {useState,useEffect} from 'react'
import { fetchDailyData } from '../../api'
import {Pie, Line, Bar } from  'react-chartjs-2'

import styles from './Chart.module.css'

const Chart = ({data :{confirmed,recovered,deaths}, country}) => {

    const [dailyData, setDailyData]= useState({});

    useEffect(()=> {
        const fetchAPI =async () => {
            setDailyData(await fetchDailyData())
        }

        fetchAPI();
    }, [])

    const lineChart = (
        dailyData.length   
            ? (
                <Line 
                data = {{
                    labels: dailyData.map(({date}) => date),
                    datasets : [{
                        data: dailyData.map(({confirmed}) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        backgroundColor: "rgba(2,117,216,0.2)",
                        fill: true
                    }, {
                        data: dailyData.map(({deaths}) => deaths),
                        label: 'Death',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true
                    }],
                }}
            />
            ): null
    )

    const barChart = (
       confirmed
        ? (
            <Bar
                data={{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets : [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)'
                        ],
                        data:[confirmed.value,recovered.value,deaths.value]
                    }]
                }}
                option={{
                    legend: {display:false},
                    title: {display: true, text:`Current state in ${country}`},
                    backgroundColor: "#FDFEFE"
                }}
            />
        ) : null
    )

    const pieChart = (
        confirmed
         ? (
             <Pie
                 data={{
                     labels: ['Infected','Recovered','Deaths'],
                     datasets : [{
                         label: 'People',
                         backgroundColor: [
                             'rgba(0, 0, 255, 0.7)',
                             'rgba(0, 255, 0, 0.7)',
                             'rgba(255, 0, 0, 0.7)'
                         ],
                         data:[confirmed.value,recovered.value,deaths.value]
                     }]
                 }}
                 option={{
                     legend: {display:false},
                     title: {display: true, text:`Current state in ${country}`}
                 }}
             />
         ) : null
     )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
            <div className={styles.pie}>{pieChart}</div>
        </div>
    )
}

export default Chart