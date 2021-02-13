import React from 'react'
import s from './Card.module.scss'

const Card = (props:any) => {
    let parts: Array<number> = props.date.dt_txt.match(/^20\d{2}-\d{2}-\d{2}/i).join("-").split("-");
    let mydate:any = new Date(parts[0], parts[1] - 1, parts[2]);
    let nameDay = mydate.toDateString().match(/\w{3}/i).join();
    let dayAndMonth = mydate.toDateString().match(/\w{3}\s\d{2}/i).join();
    return (
        <div className={s.wrapper}>
            <h1>{nameDay}.</h1>
            <p>{dayAndMonth}</p>
            <p>{props.date.weather[0].description}</p>
            <img src={"http://openweathermap.org/img/wn/" + props.date.weather[0].icon + "@2x.png"} alt=""/>
            <p className={s.temp}>Temp: {Math.round(props.date.main.temp) - 273}</p>
        </div>
    )
}

export default Card
