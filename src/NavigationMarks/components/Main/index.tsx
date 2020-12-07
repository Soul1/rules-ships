import {h} from 'preact'
import {useState} from 'preact/hooks'
import cn from 'classnames'
import {Marks, InfoMarks, CardinalInfo} from '../pages'
import * as Img from '../common/images'
import * as Type from '../../types'
import '../../animation/index.scss'
import './index.scss'

const marks: Type.Mark[][] = [
  [{id: 1, markColor: 'red', markAnimate: 'lateral', text: 'lateral red', img: Img.lateralRed}, {id: 2, markColor: 'green', markAnimate: 'lateral', text: 'lateral green', img: Img.lateralGreen}],
  [
    {id: 3, markAnimate: 'northCardinal', text: 'north cardinal', img: Img.northCardinal}, {id: 4, markAnimate: 'eastCardinal', text: 'east cardinal', img: Img.eastCardinal},
    {id: 5, markAnimate: 'southCardinal', text: 'south cardinal', img: Img.southCardinal}, {id: 6, markAnimate: 'westCardinal', text: 'west cardinal', img: Img.westCardinal}
  ],
  [{id: 7, markAnimate: 'isolatedDanger', text: 'isolated danger', img: Img.isolatedDanger}],
  [{id: 8, markAnimate: 'emergencyWreckMarking', text: 'emergency wreck marking', img: Img.emergencyWreckMarking}],
  [{id: 9, markAnimate: 'saveWater', text: 'save water', img: Img.saveWater}],
  [{id: 10, markAnimate: 'special', text: 'special', img: Img.special}]
]

const tabs: Type.Tab[] = [
  {id: 1, title: 'Главная', page: 'InfoMarks'},
  {id: 2, title: 'Кардинальные знаки', page: 'CardinalInfo'},
  {id: 3, title: 'Знаки', page: 'Marks'}
]

export const NavigationMarks = () => {
  const [currentMark, setCurrentMark] = useState<Type.Mark>({
    id: 1,
    markColor: 'red',
    markAnimate: 'lateral',
    text: 'lateral red',
    img: Img.lateralRed})

  const [currentPage, setCurrentPage] = useState<Type.Page>('InfoMarks')

  return (
    <Centered>
      <Tabs tabs={tabs} onCurrentPage={setCurrentPage}/>
      {currentPage === 'InfoMarks' && <InfoMarks />}
      {currentPage === 'CardinalInfo' && <CardinalInfo />}
      {currentPage === 'Marks' && <Marks marks={marks} ship={Img.ship} currentMark={currentMark} onCurrentMark={setCurrentMark}/>}
    </Centered>
  )
}

const Centered: Type.F<{}> = ({children}) =>
  <section class='hero centered'>
    <div class='hero-body'>
      {children}
    </div>
  </section>

type TabProps = {
  tabs: Type.Tab[]
  onCurrentPage: (page: Type.Page) => void
}

const Tabs: Type.F<TabProps> = ({tabs, onCurrentPage}) => {
  const [tabId, setTabId] = useState<number>(null)

  const setIdAndPage = (id: number, page: Type.Page) => {
    setTabId(id)
    onCurrentPage(page)
  }

  return (
    <div class='tabs is-boxed'>
      <ul>
        {tabs.map(({id, title, page}) =>
          <li class={cn({'is-active': tabId === id})} onClick={() => setIdAndPage(id, page)}>
            <a>{title}</a>
          </li>
        )}
      </ul>
    </div>
  )
}