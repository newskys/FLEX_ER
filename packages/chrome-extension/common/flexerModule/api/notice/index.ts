import { ajaxModule } from '../../../util/ajax'
import { GetNoticesResponse } from '../../../../../common/type/api/notice'
import chrome from '../../../util/chrome'

const DEFAULT_ENGAGEMENT_TIME_IN_MSEC = 100

export const getAllNotices = async () =>
  await ajaxModule.external.get<GetNoticesResponse>(
    `https://flexer-server.vercel.app/api/notice`,
  )

export const sendAnalytics = async (
  eventName: string,
  data?: Record<string, any>,
) => {
  const clientId = await chrome.sendMessage('ANALYTICS', {
    type: 'CLIENT_ID',
  })
  const sessionId = await chrome.sendMessage('ANALYTICS', {
    type: 'SESSION_ID',
  })
  await ajaxModule.external.post(
    `https://flexer-server.vercel.app/api/analytics`,
    {
      client_id: clientId,
      events: [
        {
          name: eventName,
          params: {
            ...data,
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
