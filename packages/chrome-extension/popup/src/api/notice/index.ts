import { ajaxModule } from '../../../../common/util/ajax'
import { GetNoticesResponse } from '../../../../../common/type/api/notice'

export const getAllNotices = async () =>
  await ajaxModule.external.get<GetNoticesResponse>(
    `https://flexer-server.vercel.app/api/notice`,
  )
