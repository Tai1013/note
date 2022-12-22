import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const timeInterval = ref()

const getDateTime = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss (ZZ)')
}

export const useDateTime = () => {
  const currentTime = ref(getDateTime())

  const getTimeFromNow = (time: string) => {
    return dayjs(time).fromNow()
  }

  onMounted(() => {
    timeInterval.value = setInterval(() => {
      currentTime.value = getDateTime()
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(timeInterval.value)
  })

  return {
    currentTime,
    getTimeFromNow,
  }
}