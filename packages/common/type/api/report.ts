import { NowResponse } from "./now";

export interface ReportRequest {
  title: string
  data: NowResponse['data']
  summary: NowResponse['summary']
}
