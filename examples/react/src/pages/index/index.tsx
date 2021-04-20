import { Button, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { FC, useEffect } from 'react'
import { Router } from 'tarojs-router-next'
import './index.css'

const data = {
  users: [
    {
      id: 1,
      name: '张三',
      sex: 'boy' as const,
    },
    {
      id: 2,
      name: '小辉',
      sex: 'girl' as const,
    },
  ],
}

const parmas = {
  id: 1,
  name: '张三',
  sex: 'boy' as const,
}

const Index: FC = () => {
  useEffect(() => {
    console.log('文档：https://www.yuque.com/lblblong/rgfig4/ggr8bh')
    console.log('API文档：https://lblblib.gitee.io/tarojs-router-next/classes/_router_.router.html')
    console.log('Demo 源代码：https://github.com/lblblong/tarojs-router-next/tree/master/example')
  }, [])

  const onSelCity = async () => {
    try {
      const res = await Router.toSelCity()
      Taro.showModal({
        title: '数据',
        content: JSON.stringify(res),
      })
    } catch (err) {
      console.log(err)
      Taro.showModal({
        title: '提示',
        content: '用户取消选择',
      })
    }
  }

  const onClassDemo = async () => {
    try {
      const res = await Router.toClassDemo({
        params: parmas,
        data: data,
      })
      Taro.showModal({
        title: '数据',
        content: JSON.stringify(res),
      })
    } catch (err) {
      Taro.showModal({
        title: '提示',
        content: '抛出了异常',
      })
    }
  }

  return (
    <View className="index">
      <View>页面跳转传参、数据</View>
      <Button type="primary" onClick={onSelCity}>
        跳转页面获取数据
      </Button>
      <Button
        type="primary"
        onClick={() => {
          Router.toPageParams({
            params: parmas,
          })
        }}
      >
        跳转页面携带参数（路由参数）
      </Button>
      <Button
        type="primary"
        onClick={() => {
          Router.toPageData({
            data: data,
          })
        }}
      >
        跳转页面携带数据
      </Button>
      <Button
        type="primary"
        onClick={() => {
          Router.toPageDataParams({
            data: data,
            params: parmas,
          })
        }}
      >
        跳转页面携带数据、参数
      </Button>
      <View>路由中间件</View>
      <Button
        type="primary"
        onClick={() => {
          Router.toMe()
        }}
      >
        权限校验中间件示例
      </Button>
      <View>Class页面</View>
      <Button type="primary" onClick={onClassDemo}>
        Class页面使用示例
      </Button>
    </View>
  )
}

export default Index
