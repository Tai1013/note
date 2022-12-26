<template lang="pug">
el-button.add-button(circle @click="isDialog = true")
  el-icon
    v-icon(icon="Plus")
.add-dialog
  el-dialog(v-model="isDialog" title="新增" width="95%" @close="close")
    el-form(ref="formRef" :model="form" :rules="rules" label-position="top" :disabled="isLoading")
      el-form-item(label="名稱" prop="Name")
        el-input(v-model="form.Name")
      el-form-item(label="內容" prop="Content")
        el-input(v-model="form.Content")
      el-form-item(label="背景顏色" prop="Color")
        .color-input
          el-color-picker(v-model="form.Color")
          el-input(v-model="form.Color")
      el-form-item(label="圖片")
        el-upload.avatar-uploader(
          ref="upladRef"
          list-type="picture"
          :auto-upload="false"
          :show-file-list="false"
          :drag="true"
          :limit="1"
          :on-change="handleChange"
          :class="{ 'is-disabled': isLoading }"
        )
          el-image(v-if="form.Image !== ''" :src="form.Image")
          el-icon(v-else)
            v-icon(icon="Plus")
      el-button(type="primary" @click="addNote(formRef)") 送出
</template>

<script setup lang="ts">
import type { AddNote } from '@/server'
import type { FormRules, FormInstance, UploadProps } from 'element-plus'
import { ref, reactive } from 'vue'
import { ElIcon, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElColorPicker, ElUpload, ElImage } from 'element-plus'
import { useImageBase64, useMessage, useLoading, useDateTime } from '@/use'
import { firebaseXhr } from '@/server'

const emits = defineEmits(['update'])

const { getImageBase64 } = useImageBase64()
const { $message } = useMessage()
const { currentTime } = useDateTime()
const { load, unload, isLoading } = useLoading()

const formRef = ref<FormInstance>()
const upladRef = ref()
const isDialog = ref(false)
const form = reactive<AddNote>({
  CreateTime: '',
  Postion: [0, 0],
  Name: '',
  Color: '',
  Content: '',
  Image: ''
})
const rules = reactive<FormRules>({
  Name: { required: true, message: '必填' }
})

const handleChange: UploadProps['onChange'] = (uploadFile) => {
  getImageBase64(uploadFile)
    .then(res => form.Image = res)
    .catch(err => {
      upladRef.value.clearFiles()
      form.Image = ''
      $message.error(err)
    })
}

const addNote = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  load()
  await formEl.validate((valid) => {
    if (valid) {
      const data = {
        ...form,
        CreateTime: currentTime.value
      }
      firebaseXhr({ method: 'add', data })
        .then(res => {
          $message.success(res as string)
          emits('update')
          close()
        })
        .catch(err => $message.error(err ? 'API錯誤' : '新增失敗'))
    }
  })
  unload()
}

const close = () => {
  if (formRef.value) formRef.value.resetFields()
  upladRef.value.clearFiles()
  form.Image = ''
  isDialog.value = false
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>