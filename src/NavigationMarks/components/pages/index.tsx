import {h} from 'preact'
import {Page} from './Page'
import * as Img from '../common/images'
import * as Type from '../../types'

type Props = {
  currentPage: string
}

const pages = [
  {
    id: 1,
    page: 'Lateral',
    title: 'Латеральные знаки',
    text: 'stringstringstringstringstringstringstringstringstringstring',
    bgImage: Img.backgroundLateral,
    ship: Img.ship,
    mark: [
      {markColor: 'green', markAnimate: 'lateral', text: 'Латеральный зеленый', img: Img.lateralGreen},
      {markColor: 'red', markAnimate: 'lateral', text: 'Латеральный красный', img: Img.lateralRed}
    ]
  },
  {
    id: 2,
    page: 'Cardinal',
    title: 'Кардинальные знаки',
    text: 'stringstringstringstringstringstringstringstringstringstring',
    bgImage: Img.backgroundCardinal,
    mark: [
      {markAnimate: 'northCardinal', text: 'north cardinal', img: Img.northCardinal}, {markAnimate: 'eastCardinal', text: 'east cardinal', img: Img.eastCardinal},
      {markAnimate: 'southCardinal', text: 'south cardinal', img: Img.southCardinal}, {markAnimate: 'westCardinal', text: 'west cardinal', img: Img.westCardinal}
    ]
  },
  {
    id: 3,
    page: 'IsolatedDanger',
    title: 'Знаки изолированной опасности',
    text: 'stringstringstringstringstringstringstringstringstringstring',
    mark: [{markAnimate: 'isolatedDanger', text: 'isolated danger', img: Img.isolatedDanger}]
  },
  {
    id: 4,
    page: 'EmergencyWreckMarking',
    title: 'Аварийные знаки',
    text: 'stringstringstringstringstringstringstringstringstringstring',
    mark: [{markAnimate: 'emergencyWreckMarking', text: 'emergency wreck marking', img: Img.emergencyWreckMarking}]
  },
  {
    id: 5,
    page: 'SaveWater',
    title: 'Осевые знаки',
    text: 'stringstringstringstringstringstringstringstringstringstring',
    mark: [{markAnimate: 'saveWater', text: 'save water', img: Img.saveWater}]
  },
  {
    id: 6,
    page: 'Special',
    title: 'Специальные знаки',
    text: 'stringstringstringstringstringstringstringstringstringstring',
    mark: [{markAnimate: 'special', text: 'special', img: Img.special}]
  },
]

export const Pages: Type.F<Props> = ({currentPage}) => {
  return (
    <div>
      {pages.map(p => currentPage === p.page && <Page title={p.title} text={p.text} bgImage={p.bgImage} ship={p?.ship} mark={p.mark}/>)}
    </div>
  )
}