import {FunctionalComponent} from 'preact'

export type F<T> = FunctionalComponent<T>

export type Icon = {id: number, img: string, text: string}
export type Sign = {id: number, img: string}
export type Light = {
  id: number
  color: string
  px: number
  py: number
  height: number
  width: number
  angle: number
}
export type Ship = {
  id: number
  lights: Light[]
  sign: Sign
}

export type Data = {
  ships: Ship[]
  icons: Icon[] | null
}
