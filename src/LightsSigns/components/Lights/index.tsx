import {h} from 'preact'
import {useEffect, useMemo} from 'preact/hooks'
import * as Type from '../../types'
import './index.scss'

type Props = {
  deg: number
  allLights: Type.Light[]
  currentLights: Type.Light[]
  onDeg: (i: number) => void
  toggleLight: (l: Type.Light) => void
}

export const Lights: Type.F<Props> = ({deg, onDeg, allLights, currentLights, toggleLight}) => {
  //нужна проверка для 'пересакаемых' углов у огней,
  //ex. если у ship угол 0 градуса, то в массиве может быть и red, и green.
  //нужна проверка на положение огней, для корректного сбора массива.
  //+(Math.sin(Math.sqrt(1 - (Math.cos(deg*Math.PI/180)**2))) * 180 / Math.PI).toFixed(0)
  useEffect(() => {
    allLights.forEach(l => toggleLight(l))
  },[deg])

  return (
    <div class='lights'>
      <h2 class='title'>Огни</h2>
      <div class='circle'>
        <div style={{display: 'flex', margin: '100px 0 0 100px'}}>
          {currentLights &&
          currentLights.map(l => {
            debugger
            return <Light color={l.color}/>
          })}
        </div>
      </div>
      <input type='range' min='0' max='360' value={deg} onInput={(e) => onDeg(+(e.target as HTMLInputElement).value)}/>
    </div>
  )
}

const Light: Type.F<{ color: string }> = ({color}) =>
  <span class={color} style={{backgroundColor: color, width: '25px', height: '25px', borderRadius: '50%'}}/>