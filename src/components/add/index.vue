<template lang="pug">
el-button.add-button(circle @click="isDialog = true")
  el-icon
    v-icon(icon="Plus")
el-dialog(v-model="isDialog" title="新增")
  el-form(:model="form" ref="formRef" :disabled="isLoading")
    el-form-item(label="名稱")
      el-input(v-model="form.Name")
    el-form-item(label="內容")
      el-input(v-model="form.Content")
    el-form-item(label="背景顏色")
      .color-input
        el-color-picker(v-model="form.Color")
        el-input(v-model="form.Color")
    el-form-item(label="圖片")
      el-upload.avatar-uploader(
        :limit="1"
        :auto-upload="false"
        :on-change="handleChange"
        :on-exceed="handleExceed"
        :show-file-list="false"
        ref="upload"
        list-type="picture"
      )
        el-image(v-if="form.Image !== ''" :src="form.Image")
        el-icon(v-else)
          v-icon(icon="Plus")
  el-button(type="primary" @click="addNote") 送出
</template>

<script setup lang="ts">
import type { UploadInstance, UploadProps, UploadRawFile, FormInstance } from 'element-plus'
import type { AddDoc } from '@/server'
import { ref, reactive } from 'vue'
import { ElIcon, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElColorPicker, ElUpload, ElImage, genFileId } from 'element-plus'
import { useMessage, useImageBase64, useDateTime, useLoading } from '@/use'
import { addNotDoc } from '@/server'

const emits = defineEmits(['update'])

const { $message } = useMessage()
const { getImageBase64 } = useImageBase64()
const { currentTime } = useDateTime()
const { isLoading, load, unload } = useLoading()

const formRef = ref<FormInstance>()
const isDialog = ref(false)
const upload = ref<UploadInstance>()
const form = reactive<AddDoc>({
  CreateTime: '',
  Postion: [0, 0],
  Color: '',
  Name: '',
  Content: '',
  Image: '',
})

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const handleChange: UploadProps['onChange'] = async (uploadFile) => {
  if (uploadFile.url) form.Image = await getImageBase64(uploadFile.url)
}

const addNote = async () => {
  load()
  const data = {
    ...form,
    CreateTime: currentTime.value
  }
  await addNotDoc(data)
  $message.success('上傳成功')
  emits('update')
  isDialog.value = false
  if (!formRef.value) return
  formRef.value.resetFields()
  unload()
}
</script>

<style scoped lang="scss">
.add-button {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 60px;
  height: 60px;
  .el-icon {
    font-size: 40px;
  }
}

.color-input {
  width: 100%;
  display: flex;
  align-items: center;
  .el-input {
    margin-left: 10px;
    flex: auto;
  }
}
.avatar-uploader {
  width: 100%;
}
:deep(.el-upload) {
  width: 100%;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  .el-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 178px;
    text-align: center;
  }
}

:deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}
</style>