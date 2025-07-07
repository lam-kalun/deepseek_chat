import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

// public 公开的
// private 私有的
// protected 私有但可以被子类继承
// abstract class 抽象类是不允许被实例化
// abstract function 先在父类定义，一定要在子类实现

class HttpClient {
  protected instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create({
      ...config
    })
    this.initializeRequestInterceptor()
    this.initializeResponseInterceptor()
  }

  protected initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  protected initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      (config) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T>(url, {
      ...config
    }) as Promise<T>
  }

  public set<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<T>(url, {
      ...config
    }) as Promise<T>
  }

  public request<T>(config?: AxiosRequestConfig): Promise<T> {
    return this.instance.request<T>({
      ...config
    }) as Promise<T>
  }
}

const http = new HttpClient({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000 * 10,
})

export default http