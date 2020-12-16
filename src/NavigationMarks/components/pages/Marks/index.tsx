import {h} from 'preact'
import {backgroundLateral} from '../../common/images'
import * as Type from '../../../types'
import './index.scss'

type Props = {
  marks: Type.Mark[][]
  ship: string
  currentMark: Type.Mark
  onCurrentMark: (mark: Type.Mark) => void
}

export const Marks: Type.F<Props> = ({marks, ship,currentMark, onCurrentMark}) => {
  return (
    <div class='group has-text-centered'>
      <div class='window'>
        <div class='h50 w50'>
          <Circle color={currentMark.markColor} animate={currentMark.markAnimate}/>
        </div>
      </div>
      <div class='marks'>
        {marks.map(mark => <Mark mark={mark} onCurrentMark={onCurrentMark}/>)}
      </div>
    </div>
  )
}

type MarkProps = {
  mark: Type.Mark[]
  onCurrentMark: (mark: Type.Mark) => void
}

const Mark: Type.F<MarkProps> = ({mark, onCurrentMark}) =>
  <div class='mark mt-3'>
    {mark.map(i =>
      <span class='ml-3'>
        <img src={i.img} alt={i.text} onClick={() => onCurrentMark(i)}/>
        <p>{i.text}</p>
      </span>
    )}
  </div>

const Circle: Type.F<{ color?: string, animate: string }> = ({color, animate}) =>
  <div class={`circle ${color} ${animate}`}/>
