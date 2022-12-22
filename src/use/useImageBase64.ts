export const useLoading = () => {
  const getImageBase64 = (img) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL();
    return dataURL;
  }
  return {
    getImageBase64
  }
}