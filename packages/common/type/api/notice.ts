export interface NoticeRequest {
  lastReadTime: number
}

export interface GetNoticesResponse {
  data: NoticeResponse[]
}

export type NoticeResponse = {
  title: string
  contents: string
  date: number
}
