import {FunctionalComponent} from 'preact'

export type F<T> = FunctionalComponent<T>

export type Mark = {
  markColor?: string
  markAnimate: string
  text: string
  img: string
}

export type Info = {
  id: number
  title: string
  text: string
  img: string
}

export type Page = 'InfoMarks' | 'Lateral' | 'Cardinal' | 'IsolatedDanger'| 'EmergencyWreckMarking'| 'SaveWater'|  'Special'

export type Tab = {
  id: number
  title: string
  page: Page
}