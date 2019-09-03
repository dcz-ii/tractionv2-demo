import { GET_DATA } from '../types'

export const getData = payload => {
  return {
    type: GET_DATA,
    payload,
  }
}