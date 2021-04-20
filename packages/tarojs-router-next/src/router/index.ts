import Taro, { getCurrentInstance } from '@tarojs/taro'
import { ROUTE_KEY } from '../constants'
import { NoPageException } from '../exception/no-page'
import { compose } from '../lib/compose'
import { getMiddlewares } from '../middleware'
import { PageData } from '../page-data'
import { formatPath } from '../util'
import { Route, NavigateOptions, NavigateType } from './type'

export { NavigateType, NavigateOptions, Route } from './type'

export class Router {
  /**
   * 页面跳转
   * @param route 目标路由对象
   * @param options 跳转选项
   */
  static async navigate<T = Taro.General.CallbackResult>(route: Route, options?: NavigateOptions): Promise<T> {
    options = { ...{ type: NavigateType.navigateTo, params: {} }, ...options }
    options.params = Object.assign({}, options.params)
    if (options.params![ROUTE_KEY]) throw Error('params 中 route_key 为保留字段，请用其他名称')
    const route_key = (options.params![ROUTE_KEY] = Date.now() + '')

    if (options.data) {
      PageData.setPageData(route_key, options.data)
    }

    const context = { route, params: options?.params }

    const middlewares = getMiddlewares(context)

    const fn = compose(middlewares)
    await fn(context)
    const url = formatPath(route, options.params!)

    return new Promise((res, rej) => {
      PageData.setPagePromise(route_key, { res, rej })

      switch (options!.type) {
        case NavigateType.reLaunch:
          Taro.reLaunch({ url })
          break
        case NavigateType.redirectTo:
          Taro.redirectTo({ url })
          break
        case NavigateType.switchTab:
          Taro.switchTab({ url })
          break
        default:
          Taro.navigateTo({ url })
          break
      }
    })
  }

  /**
   * 返回上一个页面
   * @param result 返回给上一个页面的数据，如果 result 是 Error 的实例，则是抛出异常给上一个页面
   */
  static back(result?: any) {
    if (result) {
      PageData.setBackResult(result)
    }

    const currentPages = Taro.getCurrentPages()
    if (currentPages.length > 1) {
      return Taro.navigateBack()
    }

    throw new NoPageException()
  }

  /**
   * 获取上一个页面携带过来的数据
   * @param default_value 默认数据
   */
  static getData<T = any>(default_value?: T): T | undefined {
    return PageData.getPageData(default_value)
  }

  /** 获取上一个页面携带过来的参数 */
  static getParams() {
    const instance = getCurrentInstance()
    const params = Object.assign({}, instance.router?.params)
    delete params.route_key
    return params
  }
}
