import {h, Fragment} from 'preact'
import {F, Light} from '../../../types'

type Props = {
  lights: Light[]
  length: number
  width: number
  rad: (x: number) => number
}

export const Ship: F<Props> = ({lights, width, length, rad}) => {
  return (
    <Fragment>
      <Line x2={length}/>
      <Line y1={-width / 2} y2={width / 2}/>
      {lights.map(l => <Sector {...{x: l.x, y: l.y, from: rad(l.from), to: rad(l.to), cr: 1.2, fill: l.fill, rev: l.rev}}/>)}
    </Fragment>
  )
}

const Line: F<{ x2?: number, y1?: number, y2?: number }> = props => <line stroke='white' x1={0} x2={0} y1={0} y2={0} stroke-width={0.1} {...props}/>

type SectorProps = {
  fill: string
  cr: number
  x: number
  y: number
  from: number
  to: number
  rev: boolean
}

const Sector: F<SectorProps> = ({fill, cr, x, y, from, to, rev}) => {
  // "path"
  const cx1 = Math.cos(to) * cr + x
  const cy1 = -Math.sin(to) * cr + y
  const cx2 = Math.cos(from) * cr + x
  const cy2 = -Math.sin(from) * cr + y

  return <path fill={fill} d={`M${x} ${y} L${cx1} ${cy1} A${cr} ${cr} 0 ${rev ? 1 : 0} 1 ${cx2} ${cy2} Z`}/>
}
// d: [`M${x} ${y}`, `L${cx1} ${cy1}`, `A${cr} ${cr} 0 ${rev ? 1 : 0} 1 ${cx2} ${cy2}`, "Z"]