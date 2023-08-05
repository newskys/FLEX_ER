import { ajaxModule } from '../../../util/ajax'
import { GetNoticesResponse } from '../../../../../common/type/api/notice'

const DEFAULT_ENGAGEMENT_TIME_IN_MSEC = 100

export const getAllNotices = async () =>
  await ajaxModule.external.get<GetNoticesResponse>(
    `https://flexer-server.vercel.app/api/notice`,
  )

export const sendAnalytics = async (clientId: string, sessionId: string) => {
  await ajaxModule.external.post(
    `https://flexer-server.vercel.app/api/analytics`,
    {
      client_id: clientId,
      events: [
        {
          name: 'page_view',
          params: {
            session_id: sessionId,
            engagement_time_msec: DEFAULT_ENGAGEMENT_TIME_IN_MSEC,
            page_title: document.title,
            page_location: document.location.href,
          },
        },
      ],
    },
  )
}
