import {h} from 'preact'
import {useEffect, useState} from 'preact/hooks'
import {Light} from './Light'
import {Ship} from './Ship'
import * as Type from '../../types'
import './index.scss'

type Props = {
  currentShip: Type.Ship
}

export const Header: Type.F<Props> = ({currentShip}) => {
  const [shipDirection, setShipDirection] = useState(0)
  const rad = (x: number) => x / 180 * Math.PI
  const deg = (x: number) => x * 180 / Math.PI

  const viewLights = currentShip?.lights?.map(l => {
    const alpha = rad(shipDirection)
    let beta = alpha - Math.atan(-l.y / l.x)
    Number.isNaN(beta) && (beta = -Math.PI)
    const gamma = deg(beta) % 360;
    const y = -Math.sin(beta) * Math.sqrt(l.x * l.x + l.y * l.y);
    Number.isNaN(y) && console.log({alpha, beta, gamma, l})

    return {shipDirection, ...l, y}
  })

  let angleDelta = 0

  if(shipDirection < 0) {
    setShipDirection(prev => prev + 360)
  }

  function update() {
    if (Math.abs(angleDelta) > 1) {
      setShipDirection(prev => (prev + angleDelta) % 360)
      angleDelta = 0
    }
    requestAnimationFrame(update)
  }

  useEffect(() => {
    update()
    let prevTouch: number = null
    const mousemove = (e: any) => {
      if (e.buttons) {
        e.preventDefault()
        angleDelta += e.movementX/2
      }
    }

    const touchend = () => {
      prevTouch = null
    }

    const touchmove = (e: any) => {
      e.preventDefault()
      const newTouch = e.touches[0].clientX
      if (prevTouch) {
        angleDelta += (prevTouch - newTouch)/2
      }
      prevTouch = newTouch
    }

    document.addEventListener('mousemove', mousemove)
    document.addEventListener('touchend', touchend)
    document.addEventListener('touchmove', touchmove, {passive: false})
    return () => {
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('touchend', touchend)
      document.removeEventListener('touchmove', touchmove)
    }
  }, [])

  return (
    <div>
      <svg
        class='sideView'
        xmlns='http://www.w3.org/2000/svg' version='1.1'
        viewBox='-20 -20 40 20'
        width='300' height='300'>
        <g>{viewLights && viewLights.map(l => <Light x={l.y} z={l.z} to={l.to} from={l.from} fill={l.fill} shipDirection={shipDirection}/>)}</g>
      </svg>
      <svg
        class='topView'
        xmlns='http://www.w3.org/2000/svg' version='1.1'
        viewBox='-20 -20 40 40'
        width='300' height='300'>
        <g style={{transform: `rotate(${shipDirection + 90}deg)`}}>
          {viewLights && <Ship lights={currentShip.lights} width={6} length={16} rad={rad}/>}
        </g>
      </svg>
    </div>
  )
}