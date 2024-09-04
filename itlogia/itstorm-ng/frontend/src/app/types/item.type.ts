import {RequestEnum} from "./request.enum";

export type ItemType = {
  id: number,
  image: string,
  title: string,
  text: string,
  price: number,
  request: RequestEnum,
}
