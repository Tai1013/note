export const useImageBase64 = () => {
  const getImageBase64 = (file: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image()
      img.src = file
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        if (!ctx) return reject("加载失败")
        ctx.drawImage(img, 0, 0, img.width, img.height);
        console.log(img.width, img.height)
        console.log(canvas.width, canvas.height)
        const dataURL = canvas.toDataURL()
        resolve(dataURL)
      }
    })
  }

  return {
    getImageBase64,
  }
}