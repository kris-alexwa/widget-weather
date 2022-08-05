import {WidgetDataDescription} from './WidgetDataDescription'

export interface WidgetData {
    id: string,
    name: string,
    temp: number,
    feelsLike: number,
    description: Array<WidgetDataDescription>,
    windSpeed: number,
    pressure: number,
    humidity: number,
    clouds: number,
    visibility: number
  }