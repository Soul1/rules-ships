import {h, Fragment} from 'preact'
import * as Type from '../../../types'
import './index.scss'

type Props = {
  title: string
  text: string
  bgImage: string
  ship?: string
  mark: Type.Mark[]
}

export const Page: Type.F<Props> = ({title, text, bgImage, ship, mark}) => {
  return (
    <div class='page'>
      <h1 class='title'>{title}</h1>

      <div class='flex-between'>
        <p class='text'>{text}</p>
        <div class='flex-basis-50'>
          <Mark mark={mark}/>
        </div>
      </div>

      {bgImage && <div class='window' style={{backgroundImage: `url(${bgImage})`}}>
        {ship && <img class='animate-ship' src={ship} alt='ship'/>}
      </div>}
    </div>
  )
}

const Mark: Type.F<{ mark: Type.Mark[] }> = ({mark}) =>
  <Fragment>
    {mark.map(i =>
      <div class='small-window mb-1'>
        <div class='mark has-text-centered'>
          <div class='h10'>
            <Circle color={i.markColor} animate={i.markAnimate}/>
          </div>
            <img src={i.img} alt={i.text}/>
            <p>{i.text}</p>
        </div>
      </div>
    )}
  </Fragment>

const Circle: Type.F<{ color?: string, animate: string }> = ({color, animate}) =>
  <div class={`circle ${color} ${animate}`}/>