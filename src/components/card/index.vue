<template lang="pug">
el-card.card-comp(v-if="cardState" :style="cardStyle" :class="`card-${data.Id}`" shadow="hover")
  template(#header)
    .card-header
      .header-name
        span {{ data.Name }} 説：
      el-button(link @click="deleteNote")
        el-icon()
          v-icon(icon="CloseBold")
  .card-content(v-if="data.Content !== ''") {{ data.Content }}
  el-image(v-if="data.Image !== ''" :src="data.Image" fill="fill")
  .card-time {{ timeFrom }}
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { NoteData, UpdateNote } from '@/server'
import { ref, computed, onMounted } from 'vue'
import { ElCard, ElIcon, ElButton, ElImage } from 'element-plus'
import { useDateTime, useMessage } from '@/use'
import { firebaseXhr } from '@/server'
import interact from 'interactjs'

const props = defineProps({
  data: {
    type: Object as PropType<NoteData>,
    required: true
  }
})

const emits = defineEmits(['update'])

const { getTimeFromNow } = useDateTime()
const { $message } = useMessage()

const cardState = ref(true)
const timeFrom = ref(getTimeFromNow(props.data.CreateTime))
const positionXY = ref<[number, number]>([props.data.Postion[0], props.data.Postion[1]])

const cardStyle = computed(() => ({
  left: `${positionXY.value[0]}px`,
  top: `${positionXY.value[1]}px`,
  backgroundColor: props.data.Color
}))

const deleteNote = async () => {
  const data = {
    Id: props.data.Id
  }
  await firebaseXhr({ method: 'delete', data })
    .then(res => {
      cardState.value = false
      emits('update')
      $message.success(res as string)
    })
    .catch(err => $message.error(err ? 'API錯誤' : '刪除失敗'))
}

const updateNote = async () => {
  const data: UpdateNote = {
    Id: props.data.Id,
    Postion: positionXY.value
  }
  await firebaseXhr({ method: 'update', data })
    .catch(err => $message.error(err ? 'API錯誤' : '更新失敗'))
}

const dragMoveListener = (event: { dx: number; dy: number }) => {
  positionXY.value[0] += parseInt(event.dx.toFixed(0))
  positionXY.value[1] += parseInt(event.dy.toFixed(0))
}

onMounted(() => {
  interact(`.card-${props.data.Id}`).draggable({
    listeners: {
      move: dragMoveListener,
      end: updateNote
    }
  })
})
</script>

<style scoped lang="scss">
@import './style.scss';
</style>