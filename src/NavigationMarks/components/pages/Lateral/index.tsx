import {h} from 'preact'
import {backgroundLateral} from '../../common/images'
import * as Type from '../../../types'

type Props = {
  ship: string
}

export const Lateral: Type.F<Props> = ({ship}) => {
  return (
    <div class='lateral1'>
      <h1 class='title'>Латеральные знаки</h1>
      <p class='text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, porro.</p>
      <div class='window' style={{backgroundImage: `url(${backgroundLateral})`}}>
        <img class='animate-ship' src={ship} alt='ship'/>
      </div>
    </div>
  )
}