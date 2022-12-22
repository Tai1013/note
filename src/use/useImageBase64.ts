export const useLoading = () => {
  const getImageBase64 = (img: any) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return ''
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL();
    return dataURL;
  }

  return {
    getImageBase64
  }
}