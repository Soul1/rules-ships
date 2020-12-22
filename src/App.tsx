import {h, Fragment} from 'preact'
import {useState} from 'preact/hooks'
import cn from 'classnames'
import {NavigationMarks} from './NavigationMarks'
import {LightsSings} from './LightsSigns'
import {SoundSignals} from './SoundSignals'
import * as Type from './types'
import './index.scss'

const menu: Type.Menu[] = [
  {id: 1, title: 'Главная', page: 'Main'},
  {id: 2, title: 'Навигационные знаки', page: 'NavigationMarks'},
  {id: 3, title: 'Огни и знаки', page: 'LightsSigns'},
  {id: 4, title: 'Звуки сигналов', page: 'SoundSignals'}
]

export const App = () => {
  const [currentPage, setCurrentPage] = useState('SoundSignals')

  const page = () => {
    switch (currentPage) {
      case 'Main': {
        return <div>Пока не готово</div>
      }
      case 'NavigationMarks': {
        return <NavigationMarks/>
      }
      case 'LightsSigns': {
        return <LightsSings/>
      }
      case 'SoundSignals': {
        return <SoundSignals/>
      }
      default: {
        return <div>404 NOT FOUND</div>
      }
    }
  }

  return (
    <div>
      <Menu menu={menu} onCurrentPage={setCurrentPage}/>
      {page()}
    </div>
  )
}

type MenuProps = {
  onCurrentPage: (page: Type.Page) => void
  menu: Type.Menu[]
}

const Menu: Type.F<MenuProps> = ({menu, onCurrentPage}) => {
  const [isActive, setIsActive] = useState(false)
  const [listId, setListId] = useState(1)

  const setPageAndListIdAndHideMenu = (page: Type.Page, id: number) => {
    onCurrentPage(page)
    setListId(id)
    setIsActive(false)
  }

  return (
    <div class='centered'>
      <BurgMenu isActive={isActive} onIsActive={setIsActive}/>
      <div class={cn('menu has-text-centered pt-5', {'hide': !isActive})}>
        <ul class='menu-list'>
          {menu.map(({id, title, page}) =>
            <li class={cn('pb-4', {'is-active': id === listId})} onClick={() => setPageAndListIdAndHideMenu(page, id)}><a>{title}</a></li>)}
        </ul>
      </div>
    </div>
  )
}

type BurgProps = {
  isActive: boolean
  onIsActive: (isActive: boolean) => void
}

const BurgMenu: Type.F<BurgProps> = ({isActive, onIsActive}) =>
  <svg class={cn('ham hamRotate', {'active': isActive})} viewBox='0 0 100 100' width='50' onClick={() => onIsActive(!isActive)}>
    <path
      class='line top'
      d='m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20'/>
    <path
      class='line middle'
      d='m 30,50 h 40'/>
    <path
      class='line bottom'
      d='m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20'/>
  </svg>
