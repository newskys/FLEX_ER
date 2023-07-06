import { WorkspaceUsersResponse } from '../../../../../common/type/api/workspaceUsers'
import { ajaxModule } from '../../../../common/util/ajax'
import { WorkScheduleResultsResponse } from '../../../../../common/type/api/workScheduleResults'

export const getUsers = async () =>
  await ajaxModule.internal.get<WorkspaceUsersResponse>(
    '/v2/workspace/users/me/workspace-users',
  )

export const getSchedule = async (
  userIdHash: string,
  from: number,
  to: number,
) => {
  return await ajaxModule.internal.get<WorkScheduleResultsResponse>(
    `https://flex.team/api/v2/time-tracking/users/${userIdHash}/periods/work-schedules?timeStampFrom=${from}&timeStampTo=${to}`,
  )
  // console.log('sc', schedule)
  // schedule.data.workScheduleResults[0].workFormSummary.workFormResults[0].totalMinutes
}
