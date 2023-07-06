export type SendMessageT = {
  API: {
    url: string
    type: 'GET' | 'POST'
    data?: any
  }
  STORE: {
    type: 'GET' | 'SET'
    data: {
      key: string
      value?: string
    }
  }
}

const sendMessage = async (
  type: keyof SendMessageT,
  data: SendMessageT[keyof SendMessageT],
) => {
  data.type === 'SET' && console.log('setsetset', data)
  return await new Promise<string>((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(
        {
          type,
          data,
        },
        (result) => {
          resolve(result)
        },
      )
    } catch (e) {
      reject(e)
    }
  })
}

const getCurrentTabUrl = async () => {
  const queryOptions = { active: true, currentWindow: true }
  const [tab] = await chrome.tabs.query(queryOptions)

  return tab.url ?? ''
}

export default {
  sendMessage,
  getCurrentTabUrl,
}
