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

export const LightsSings = () => {
  const [icons, setIcons] = useState<Type.Icon[]>(null)
  const [shipId, setShipId] = useState(1)
  const [currentShip, setCurrentShip] = useState(null)

  useEffect(() => {
    fetch('/data.json').then(r => r.json()).then(r => {setIcons(r.icons)})
  }, [])

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