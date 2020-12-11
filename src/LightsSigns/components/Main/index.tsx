import {h, Fragment} from 'preact'
import {useEffect, useState} from 'preact/hooks'
import {Header} from '../Header'
import {Footer} from '../Footer'
import * as Type from '../../types'
import './index.scss'

const ships: Type.Ship[] = [
  {
    id: 1,
    lights: [
      {id: 1, x: 8, y: 0, z: 15, to: 122.5, from: 237.5, cr: 1.2, fill: 'white', rev: true},
      {id: 2, x: 0, y: 0, z: 5, to: 237.5, from: 122.5, cr: 1.2, fill: 'yellow'},
      {id: 3, x: 6, y: -2, z: 5, to: 122.5, from: 0, cr: 1.2, fill: 'red'},
      {id: 4, x: 6, y: 2, z: 5, to: 0, from: 237.5, cr: 1.2, fill: 'green'},
    ]
  }
]

const icons: Type.Icon[] = [
  {
    "id": 1,
    "img": "https://visualpharm.com/assets/294/Battleship-595b40b75ba036ed117d558f.svg",
    "text": "Парусные судна"
  },
  {
    "id": 2,
    "img": "https://visualpharm.com/assets/294/Battleship-595b40b75ba036ed117d558f.svg",
    "text": "Парусные судна под мотором"
  },
  {
    "id": 3,
    "img": "https://visualpharm.com/assets/294/Battleship-595b40b75ba036ed117d558f.svg",
    "text": "Моторное судно длиною менее 50 м"
  },
  {
    "id": 4,
    "img": "https://visualpharm.com/assets/294/Battleship-595b40b75ba036ed117d558f.svg",
    "text": "Судно, стесненное своей осадкой"
  },
  {
    "id": 5,
    "img": "https://visualpharm.com/assets/294/Battleship-595b40b75ba036ed117d558f.svg",
    "text": "Минный тральщик"
  },
  {
    "id": 6,
    "img": "https://visualpharm.com/assets/294/Battleship-595b40b75ba036ed117d558f.svg",
    "text": "Рыболовное-судно траулер"
  },
  {
    "id": 7,
    "img": "https://visualpharm.com/assets/294/Battleship-595b40b75ba036ed117d558f.svg",
    "text": "Судно, ограниченное в возможности маневрировать"
  },
  {
    "id": 8,
    "img": "https://visualpharm.com/assets/294/Battleship-595b40b75ba036ed117d558f.svg",
    "text": "Судно, занятное дноуглубительными или подводными работами"
  },
  {
    "id": 9,
    "img": "https://visualpharm.com/assets/294/Battleship-595b40b75ba036ed117d558f.svg",
    "text": "Судно, лишенное возможности управляться"
  },
  {
    "id": 10,
    "img": "https://visualpharm.com/assets/294/Battleship-595b40b75ba036ed117d558f.svg",
    "text": "Буксир, длина связки суднов менее 200 м"
  },
  {
    "id": 11,
    "img": "https://visualpharm.com/assets/294/Battleship-595b40b75ba036ed117d558f.svg",
    "text": "Судно длинной более 50 м на якоре"
  },
  {
    "id": 12,
    "img": "https://visualpharm.com/assets/294/Battleship-595b40b75ba036ed117d558f.svg",
    "text": "Судно длинной до 50 м на якоре"
  },
  {
    "id": 13,
    "img": "https://visualpharm.com/assets/294/Battleship-595b40b75ba036ed117d558f.svg",
    "text": "Лоцманское судно"
  },
  {
    "id": 14,
    "img": "https://visualpharm.com/assets/294/Battleship-595b40b75ba036ed117d558f.svg",
    "text": "Судно на мели"
  }
]

export const LightsSings = () => {
  const [shipId, setShipId] = useState(1)
  const [currentShip, setCurrentShip] = useState(null)

  useEffect(() => {
    setCurrentShip(ships.filter(s => s.id === shipId)[0])
  }, [shipId])

  return (
    <Centered>
      <Fragment>
        <Header currentShip={currentShip}/>
        <Footer icons={icons} onShipId={setShipId}/>
      </Fragment>
    </Centered>
  )
}

const Centered: Type.F<any> = ({children}) =>
  <section class='hero centered'>
    <div class='hero-body has-text-centered'>
      {children}
    </div>
  </section>