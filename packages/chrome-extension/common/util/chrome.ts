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
  ANALYTICS: {
    type: 'CLIENT_ID' | 'SESSION_ID'
  }
}

const sendMessage = async (
  type: keyof SendMessageT,
  data: SendMessageT[keyof SendMessageT],
) => {
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
