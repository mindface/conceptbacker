export const setBlob = (canvas: HTMLCanvasElement) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      resolve(blob)
    })
  })
}
