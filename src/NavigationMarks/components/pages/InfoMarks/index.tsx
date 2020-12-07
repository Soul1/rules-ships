import {h} from 'preact'
import * as Img from '../../common/images'
import * as Type from '../../../types'
import './index.scss'

const info: Type.Info[] = [
  {id: 1, title: 'Латеральные знаки', img: Img.lateralRed,
    text: 'Латеральные знаки (lateral marks) служат для указания левой (...) и правой (...) сторон фарватера (канала)'},
  {id: 2, title: 'Кардинальные знаки', img: Img.southCardinal,
    text: 'Кардинальные знаки (...) указывают протяженные опасные для навигации места и используются в сочетании с компасом'},
  {id: 3, title: 'Знаки изолированной опасности', img: Img.isolatedDanger,
    text: 'Знаки изолированной опасности (...) указывают местонахождение локальной непротяженной опасности, вокруг которой есть безопасный проход.'},
  {id: 4, title: 'Аварийные знаки', img: Img.emergencyWreckMarking,
    text: 'Аварийные знаки (...) указывают расположение обломков недавно затонувших судов и временно устанавливаются аварийными службами либо до уборки обломков, либо до установки постоянных кардинальных знаков.'},
  {id: 5, title: 'Осевые знаки', img: Img.saveWater,
    text: 'Осевые знаки (...) указывают на безопасность плавания в районе этих знаков и устанавливаются у входа в фарватер.'},
  {id: 6, title: 'Специальные знаки', img: Img.special,
    text: 'Специальные знаки (...) обазначают самые разные спецефические оюласти или опасности, например, районы, где проводятся военно-морские учения или океанографические исследования.'},
]

export const InfoMarks: Type.F<any> = () => {
  return (
    <div class='info-marks'>
      <h1 class='title'>Навигационные знаки</h1>
      <p class='mb-5'>Навигационные знаки разделены на 6 групп:</p>
      {info.map(({id, title, text, img}) => <InfoMark id={id} title={title} text={text} img={img}/>)}
    </div>
  )
}

const InfoMark: Type.F<Type.Info> = ({id, title, text, img}) => {
  return (
    <div class='info'>
      <h3 class='subtitle'>{`${id}. ${title}`}</h3>
      <div class=' flex-align-center'>
        <p class='text'>{text}</p>
        <img src={img} alt={title}/>
      </div>
    </div>
  )
}