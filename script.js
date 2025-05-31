const coverInput = document.getElementById('coverInput');
const audioInput = document.getElementById('audioInput');
const titleInput = document.getElementById('titleInput');
const artistInput = document.getElementById('artistInput');
const cover = document.getElementById('cover');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const audio = document.getElementById('audio');

coverInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    cover.src = URL.createObjectURL(file);
  }
});

audioInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    audio.src = URL.createObjectURL(file);
  }
});

titleInput.addEventListener('input', () => {
  songTitle.textContent = titleInput.value;
});

artistInput.addEventListener('input', () => {
  artistName.textContent = artistInput.value;
});

// Visualizer
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let audioCtx, analyser, source;
let dataArray;

audio.onplay = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
  }
  animate();
};

function animate() {
  requestAnimationFrame(animate);
  if (!analyser) return;

  analyser.getByteFrequencyData(dataArray);

  ctx.fillStyle = '#0e0e10';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / dataArray.length) * 2.5;
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const barHeight = dataArray[i];
    const r = 200 + barHeight / 2;
    const g = 50 + barHeight / 2;
    const b = 255;

    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}
