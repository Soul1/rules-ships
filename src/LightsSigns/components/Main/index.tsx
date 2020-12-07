import {h, Fragment} from 'preact'
import {useCallback, useEffect, useState} from 'preact/hooks'
import {Lights} from '../Lights'
import {Sign} from '../Sign'
import {Footer} from '../Footer'
import * as Type from '../../types'
import ship from '../common/images/ship.png'
import './index.scss'

export const LightsSings = () => {
  const [icons, setIcons] = useState<Type.Icon[]>(null)
  const [ship, setShip] = useState<Type.Ship>(null)
  const [shipId, setShipId] = useState(1)
  const [degShip, setDegShip] = useState(0)
  const [currentLights, setCurrentLights] = useState<Type.Light[]>(null)

  useEffect(() => {
    fetch('/data.json')
      .then(r => r.json())
      .then(r => {
        r.ships.filter((s: Type.Ship) => s.id === shipId && setShip(s))
        setIcons(r.icons)
      })
  }, [])

  useEffect(() => {
    setCurrentLights(ship?.lights?.filter((l: Type.Light) => l.angle === 360))
  }, [ship])

  const toggleLight = useCallback((light: Type.Light) => {
    // if (light.angleMin <= degShip && light.angleMax >= degShip) {
    //   currentLights?.filter(l => l.id === light.id ? currentLights : setCurrentLights([...currentLights, light]))
    // } else {
    //   currentLights?.filter(l => l.id === light.id && delete currentLights[l.id - 1])
    // }
    // console.log(Math.sin(Math.sqrt(1 - (Math.cos(light.angle*Math.PI/180)**2))) * 180 / Math.PI)
    const radianBeta = light.angle*Math.PI/180
    const x = light.px
    const y = light.py
    // const radianAlpha = light.px / Math.sqrt()
    console.log(x+Math.cos(radianBeta), 'c')
    console.log(y+Math.sin(radianBeta), 's')
  }, [degShip])

  return (
    <Centered>
      {ship &&
      <Fragment>
        <Header shipId={shipId} sign={ship.sign} allLights={ship.lights} currentLights={currentLights} degShip={degShip} onDegShip={setDegShip} toggleLight={toggleLight}/>
        <Footer icons={icons} onShipId={setShipId}/>
      </Fragment>
      }
    </Centered>
  )
}

type HeaderProps = {
  sign: Type.Sign
  currentLights: Type.Light[]
  allLights: Type.Light[]
  shipId: number
  degShip: number
  onDegShip: (degShip: number) => void
  toggleLight: (l: Type.Light) => void
}

const Header: Type.F<HeaderProps> = ({sign, shipId, allLights, currentLights, degShip, onDegShip, toggleLight}) =>
  <header class='header'>
    <Lights deg={degShip} onDeg={onDegShip} allLights={allLights} currentLights={currentLights} toggleLight={toggleLight}/>
    <img style={{transform: `rotate(${degShip}deg)`}}
         onClick={() => onDegShip(degShip += 20)}
         src={ship} alt="ship"/>
    <Sign sign={sign.id === shipId && sign.img}/>
  </header>


const Centered: Type.F<any> = ({children}) =>
  <section class='hero centered'>
    <div class='hero-body has-text-centered'>
      {children}
    </div>
  </section>