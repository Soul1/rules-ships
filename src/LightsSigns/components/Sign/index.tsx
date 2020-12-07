import {h} from 'preact'
import * as Type from '../../types'
import './index.scss'

type Props = {
  sign: string
}

export const Sign: Type.F<Props> = ({sign}) => {
  return (
    <div class='sign'>
      <h2 class='title'>Знаки</h2>
      <div class='window'>
        {sign && <img src={sign} alt='sign'/>}
      </div>
    </div>
  )
}