<template lang="pug">
template(v-for="note in notes" :key="note.Id")
  card-comp(:data="note" @update="getNotes")
add-comp(@update="getNotes")
</template>

<script setup lang="ts">
import type { DocData } from './server'
import { ref, onMounted } from 'vue'
import { getNoteDocs } from './server'
import AddComp from './components/add/index.vue'
import CardComp from './components/card/index.vue'

const notes = ref<DocData[]>([])

const getNotes = async () => {
  notes.value = await getNoteDocs()
}

onMounted(() => {
  getNotes()
})
</script>

<style scoped>
</style>
