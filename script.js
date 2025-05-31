const coverArtInput = document.getElementById("coverArtInput");
const audioInput = document.getElementById("audioInput");
const titleInput = document.getElementById("titleInput");
const artistInput = document.getElementById("artistInput");

const coverArtDisplay = document.getElementById("coverArtDisplay");
const audioPlayer = document.getElementById("audioPlayer");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");

coverArtInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    coverArtDisplay.src = imageURL;
  }
});

audioInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const audioURL = URL.createObjectURL(file);
    audioPlayer.src = audioURL;
  }
});

titleInput.addEventListener("input", function () {
  songTitle.textContent = this.value || "Song Title";
});

artistInput.addEventListener("input", function () {
  artistName.textContent = this.value || "Artist Name";
});
