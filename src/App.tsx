import React from 'react';
import './App.scss';
import Card from './Card';

const App = () => {

  let [mapCards, setMapCards] = React.useState<any>();
  React.useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=London&appid=14358bcdca1ca0a20ba95b2d02b61bd4")
      .then(rest => rest.json())
      .then(json => {

        let reg: RegExp = /^20\d{2}-\d{2}-\d{2}\s15:00:00/i,
          filterArray: Array<any> = json.list.filter((e: any) => e.dt_txt.match(reg));
        let mapArr: any = filterArray.map((e: any, index: number) => (<Card key={index} date={e} />))
        setMapCards(mapCards = mapArr)

      }).catch((e) => {
        alert(e)
      })
  }, [])
  const inp: any = React.createRef();
  const city: any = React.createRef();
  const req = () => {
    if (/^[A-zА-я]+/.test(inp.current.value)) {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${inp.current.value}&appid=14358bcdca1ca0a20ba95b2d02b61bd4`)
        .then(rest => rest.json())
        .then(json => {

          let reg: RegExp = /^20\d{2}-\d{2}-\d{2}\s15:00:00/i,
            filterArray: Array<any> = json.list.filter((e: any) => e.dt_txt.match(reg));
          let mapArr: any = filterArray.map((e: any, index: number) => (<Card key={index} date={e} />))
          setMapCards(mapCards = mapArr)

        }).catch(() => {
          setMapCards(mapCards = []);
          alert("Город не найден :(")
        })

        city.current.innerHTML = inp.current.value;
    } else {
      alert("Пожалуйста заполните правильно строку, согласно образцу")
    }
  }

  return (
    <div className="app">
      <h1 ref={city}>London</h1>
      <div className="search">
        <input ref={inp} placeholder=" London" type="text" />
        <button onClick={req}>&#8594;</button>
      </div>
      <div className="wrapper">
        <div className="fon"></div>
        <section className="cards">
          <section>
            {mapCards}
          </section>
        </section>
      </div>

    </div>
  );
}

export default App;
