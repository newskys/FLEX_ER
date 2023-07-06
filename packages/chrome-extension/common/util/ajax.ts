import axios, { AxiosInstance } from 'axios'

class AjaxModule {
  module: AxiosInstance = null
  private direction: 'INTERNAL' | 'EXTERNAL' = null

  init() {
    this.module = axios.create({
      timeout: 5000,
      onUploadProgress: null,
    })
  }

  get internal() {
    this.module.defaults.baseURL = 'https://flex.team/api'
    this.direction = 'INTERNAL'
    return {
      get: <T>(url, config?) => this.get<T>(url, config),
      post: <T>(url, data?, config?) => this.post<T>(url, data, config),
    }
  }

  get external() {
    this.module.defaults.baseURL = ''
    this.direction = 'EXTERNAL'

    // closure로 stale function을 return하는 것을 방지를 위해 arrow function으로 return
    return {
      get: <T>(url, config?) => this.get<T>(url, config),
      post: <T>(url, data?, config?) => this.post<T>(url, data, config),
    }
  }

  destroy() {
    this.module = null
  }

  private async get<T>(url, config = {}) {
    switch (this.direction) {
      case 'EXTERNAL':
        return (await new Promise((resolve, reject) => {
          try {
            chrome.runtime.sendMessage(
              {
                type: 'API',
                data: {
                  url,
                  type: 'GET',
                },
              },
              (result) => {
                resolve(JSON.parse(result))
              },
            )
          } catch (e) {
            reject(e)
          }
        })) as T
      case 'INTERNAL':
      default:
        const result = await this.module.get<T>(url, config)
        return result.data as T
    }
  }

  private async post<T>(url, data = {}, config = {}) {
    switch (this.direction) {
      case 'EXTERNAL':
        return (await new Promise((resolve, reject) => {
          try {
            chrome.runtime.sendMessage(
              {
                type: 'API',
                data: {
                  url,
                  type: 'POST',
                  data,
                },
              },
              (result) => {
                resolve(result)
              },
            )
          } catch (e) {
            reject(e)
          }
        })) as T
      case 'INTERNAL':
      default:
        const result = await this.module.get(url, config)
        return result.data as T
    }
  }
}

export const ajaxModule = new AjaxModule()
