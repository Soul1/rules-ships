import {h} from 'preact'
import {useState} from 'preact/hooks'
import cn from 'classnames'
import {Pages} from '../pages'
import * as Type from '../../types'
import '../../animation/index.scss'
import './index.scss'


const tabs: Type.Tab[] = [
  {id: 1, title: 'Главная', page: 'InfoMarks'},
  {id: 2, title: 'Латеральные знаки', page: 'Lateral'},
  {id: 3, title: 'Кардинальные знаки', page: 'Cardinal'},
  {id: 4, title: 'Знаки изолированной опасности', page: 'IsolatedDanger'},
  {id: 5, title: 'Аварийные знаки', page: 'EmergencyWreckMarking'},
  {id: 6, title: 'Осевые знаки', page: 'SaveWater'},
  {id: 7, title: 'Специальные знаки', page: 'Special'}
]

export const NavigationMarks = () => {
  const [currentPage, setCurrentPage] = useState<Type.Page>('InfoMarks')

  return (
    <Centered>
      <Tabs tabs={tabs} onCurrentPage={setCurrentPage}/>
      <Pages currentPage={currentPage}/>
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