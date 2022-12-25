import type { UploadFile } from 'element-plus'

export const useImageBase64 = () => {
  const getImageBase64 = (file: UploadFile) => {
    const blob = file.url
    const size = file.size
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    return new Promise<string>((resolve, reject) => {
      if (!ctx || !blob || !size) return reject("加载失败")
      if (size > 500 * 1024) return reject("圖片超過500KB")
      const img = new Image()
      img.src = blob
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const dataURL = canvas.toDataURL()
        resolve(dataURL)
      }
    })
  }

  return {
    getImageBase64,
  }
}