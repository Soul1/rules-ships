import {h} from 'preact'
import * as Type from '../../types'
import './index.scss'

type Props = {
  icons: Type.Icon[]
  onShipId: (i: number) => void
}

export const Footer: Type.F<Props> = ({icons, onShipId}) =>
  <footer class='icons flex-align-center'>
    {icons && icons.map(({id, img, text}) => <Icon id={id} img={img} text={text} onClick={onShipId}/>)}
  </footer>


type IconProps = {
  id: number
  img: string
  text: string
  onClick: (i: number) => void
}

const Icon: Type.F<IconProps> = ({id, img, text, onClick}) =>
  <div class='icon flex-align-center' onClick={() => onClick(id)}>
    <img class='mr-3' src={img} alt='icon-ship'/>
    <p>{text}</p>
  </div>
