import {RequestEnum} from "./request.enum";

export type BannerType = {
  id: number,
  image: string,
  preTitle: string,
  title: string,
  text?: string,
  request: RequestEnum,
}
