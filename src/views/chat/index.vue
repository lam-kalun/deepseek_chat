<script setup lang='ts'>
import http from '@/utils/request';
import { fetchEventSource } from '@microsoft/fetch-event-source';

const title = ref<string>('')

function onkeydown(val: KeyboardEvent) {
  if (val.code === "Enter") {
    confirm()
  }
}

const text = ref<string>('')

function confirm() {
  queList.value.push(text.value)
  text.value = ''
  send()
}

// 流式返回
// const ctrl = new AbortController()
// async function send() {
//   fetchEventSource(import.meta.env.VITE_API_URL+'/multiple-chat', {
//     method: 'post',
//     body: JSON.stringify({
//       queList: queList.value,
//       ansList: ansList.value
//     }),
//     signal: ctrl.signal,
//     onmessage(res) {
//       const { data } = res
//       if (data === '[DONE]') {
//         ctrl.abort()
//         return
//       }
//       const delta = JSON.parse(data).choices[0].delta
//       if (Object.prototype.hasOwnProperty.call(delta, 'role')) {
//         ansList.value.push('')
//       }
//       if (delta.content) {
//         ansList.value[ansList.value.length - 1] += delta.content
//       }
//     }
//   })
// }

// mcp
// async function send() {
//   const res = await http.request<string>({
//     url: '/mcp-chat',
//     method: 'post',
//     data: {
//       queList: queList.value,
//       ansList: ansList.value
//     }
//   })
//   ansList.value.push(res)
// }

// mcp流式返回
const ctrl = new AbortController()
async function send() {
  fetchEventSource(import.meta.env.VITE_API_URL+'/stream-mcp-chat', {
    method: 'post',
    body: JSON.stringify({
      queList: queList.value,
      ansList: ansList.value
    }),
    signal: ctrl.signal,
    onmessage(res) {
      // !todo try catch错误处理，不然出错会一直调用接口
      try {
        const { data } = res
        if (data === '[DONE]') {
          ctrl.abort()
          return
        }
        const delta = JSON.parse(data)
        if (delta.message === 'first') {
          ansList.value.push('')
        }
        if (delta.content) {
          ansList.value[ansList.value.length - 1] += delta.content
        }
      } catch (err) {
        console.log(err);
      }
    }
  })
}

const queList = ref<string[]>([])
const ansList = ref<string[]>([])
const renderList = computed(() => queList.value.reduce((acc: string[], cur: string, index: number) => {
  acc.push(queList.value[index])
  if (ansList.value[index]) {
    acc.push(ansList.value[index])
  }
  return acc
}, []))
</script>

<template>
  <div class="main-container">
    <title class="title">{{ title }}</title>
    <div class="chat-content">
      <div v-for="(item, index) in renderList" :key="index">
        <span>{{ item }}</span>
      </div>
    </div>
    <div class="question-content">
      <input v-model="text" :onkeydown="onkeydown" class="text" type="text">
      <button class="btn-confirm" @click="confirm">发送</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: 100%;
    height: 46px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chat-content {
    width: calc(100% - 400px);
    height: calc(100% - 156px);
    padding: 0 200px;
    overflow: auto;
    color: #fff;
    display: flex;
    flex-direction: column;
  }

  .question-content {
    width: 60%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>