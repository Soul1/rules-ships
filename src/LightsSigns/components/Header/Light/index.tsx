import {h} from 'preact'
import * as Type from '../../../types'

type Props = {
  x: number
  z: number
  to: number
  from: number
  shipDirection: number
  fill: string
}

export const Light: Type.F<Props> = ({shipDirection, x, z, fill, from, to}) => {
  const isVisible = from < to
    ? from <= shipDirection && shipDirection <= to
    : !(to <  shipDirection && shipDirection <  from)

  return <circle {...{cx: x, cy: -z, r: 1, fill: fill, ['fill-opacity']: isVisible ? 1 : 0}}/>
}
