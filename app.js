// Obtener el elemento de video y la máscara de escaneo
const videoPreview = document.getElementById('videoPreview');
const maskContainer = document.querySelector('.maskContainer-1-2-58');

// Obtener la cámara trasera
const getBackCamera = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const backCamera = devices.find(device => device.kind === 'videoinput' && device.facingMode === 'environment');
    return backCamera;
}

// Activar la cámara trasera y mostrar la previsualización en el video
const activateCamera = async () => {
    const backCamera = await getBackCamera();
    if (backCamera) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: backCamera.deviceId } });
        videoPreview.srcObject = stream;
    } else {
        console.error('No se encontró la cámara trasera.');
    }
}

// Iniciar la previsualización de la cámara cuando se cargue la página
window.addEventListener('load', () => {
    activateCamera();
});

// Actualizar el tamaño del video de la previsualización cuando se redimensiona la ventana
window.addEventListener('resize', () => {
    const { width, height } = maskContainer.getBoundingClientRect();
    videoPreview.style.width = `${width}px`;
    videoPreview.style.height = `${height}px`;
});