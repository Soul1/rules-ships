import {FunctionalComponent} from 'preact'

export type F<T> = FunctionalComponent<T>

export type Page = 'Main' | 'NavigationMarks' | 'LightsSigns' | 'SoundSignals'

export type Menu = {
  id: number
  title: string
  page: Page
}