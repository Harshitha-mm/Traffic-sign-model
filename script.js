let video = document.querySelector('video')

navigator.mediaDevices.getUserMedia({video: true})

.then((stream) => {
    video.srcObject = stream

    return video.play()

})

.then(() => {
    // button reference
    let button = document.querySelector('button')
    button.disabled = false
    button.onclick= () => {
       takeSnapshot()
       .then(download)
    }

})

function takeSnapshot(){
    // canvas element
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)
  // convert canvas to blob
     return new Promise((res,rej) => {
        canvas.toBlob(res,"image/jpeg")
 })

}

function download (blob) {
    // anchor tag
    let a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download="Screenshot.jpeg"
    document.body.appendChild(a)
    a.click()
    }