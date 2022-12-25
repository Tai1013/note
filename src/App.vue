<template lang="pug">
template(v-for="note in notes" :key="note.Id")
  card-comp(:data="note" @update="getNotes")
add-comp(@update="getNotes")
</template>

<script setup lang="ts">
import type { NoteData } from './server'
import { ref, onMounted } from 'vue'
import { firebaseXhr } from './server'
import { useMessage } from './use'
import AddComp from './components/add/index.vue'
import CardComp from './components/card/index.vue'

const { $message } = useMessage()
const notes = ref<NoteData[]>([])

const getNotes = async () => {
  await firebaseXhr({ method: 'get' })
    .then(res => notes.value = res as NoteData[])
    .catch(err => $message.error(err ? 'API錯誤' : '取得失敗'))
}

onMounted(() => {
  getNotes()
})
</script>