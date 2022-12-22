<template lang="pug">
el-card.card-comp(:style="cardStyle")
  template(#header)
    .card-header
      .name {{ data.Name }} 説：
      el-icon
        v-icon(icon="CloseBold")
  .card-content {{ data.Content }}
  el-image(:src="data.Image" fill="fill")
  .time {{ time }}
</template>

<script setup lang="ts">
import interact from 'interactjs'
import type { PropType } from 'vue'
import type { CardData } from './define'
import { ref, computed } from 'vue'
import { ElCard, ElIcon, ElImage } from 'element-plus'
import { useDateTime } from '@/use'

const props = defineProps({
  data: {
    type: Object as PropType<CardData>,
    required: true
  }
})

const { getTimeFromNow } = useDateTime()

const cardXY = ref([props.data.Postion[0], props.data.Postion[1]])

const cardStyle = computed(() => ({
  left: `${cardXY.value[0]}px`,
  top: `${cardXY.value[1]}px`,
  backgroundColor: props.data.Color
}))
const time = computed(() => getTimeFromNow(props.data.CreateTime))

const dragMoveListener = (event: { target: any; dx: number; dy: number }) => {
  const target = event.target
  const x = parseInt(((parseInt(target.getAttribute('data-x')) || 0) + event.dx).toFixed(0))
  const y = parseInt(((parseInt(target.getAttribute('data-y')) || 0) + event.dy).toFixed(0))
  cardXY.value = [x, y]
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

const dragEndListener = () => {
  console.log(cardXY.value)
}

interact('.card-comp').draggable({
  listeners: {
    move: dragMoveListener,
    end: dragEndListener
  }
})

</script>

<style scoped lang="scss">
.card-comp {
  position: absolute;
  max-width: 400px;
  min-width: 200px;
  min-height: 100px;
}
.card-header {
  display: flex;
  justify-content: space-between;
}
.el-icon {
  cursor: pointer;
}
:deep(.el-card__header) {
  padding: 10px;
  padding-bottom: 0;
  border: none;
}
:deep(.el-card__body) {
  padding: 10px;
}
.card-content {
  margin-bottom: 5px;
  font-size: 24px;
}
.el-image {
  border-radius: 5px;
  vertical-align: bottom;
}
.time {
  margin-top: 10px;
  text-align: right;
  font-size: 10px;
}
</style>