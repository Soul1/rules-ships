import {FunctionalComponent} from 'preact'

export type F<T> = FunctionalComponent<T>

export type Icon = {id: number, img: string, text: string}
export type Light = {
  id: number
  x: number
  y: number
  z: number
  from: number
  to: number
  cr: number
  fill: string
  rev?: boolean
}
export type Ship = {
  id: number
  lights: Light[]
}
