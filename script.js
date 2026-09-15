const PLAYLISTS = {
  fun: [
    { title: "Yeah!", artist: "Usher ft. Lil Jon, Ludacris", id: "Tx2Fu0KsmaQ" },
    { title: "DJ Got Us Fallin' In Love", artist: "Usher ft. Pitbull", id: "C-dvTjK_07c" },
    { title: "Love In This Club", artist: "Usher ft. Young Jeezy", id: "cB5e0zHRzHc" },
    { title: "Stronger", artist: "Kanye West", id: "oIY-lGaW-p4" },
    { title: "Gold Digger", artist: "Kanye West ft. Jamie Foxx", id: "PE0ynzc6-e4" },
    { title: "God's Plan", artist: "Drake", id: "xpVfcZ0ZcFM" },
    { title: "Hotline Bling", artist: "Drake", id: "uxpDa-c-4Mc" },
    { title: "One Dance", artist: "Drake ft. WizKid, Kyla", id: "u4RFOL9lKUI" },
  ],
  focus: [
    { title: "Deep House Study Mix (3 Hours)", artist: "Focus, Flow & Deep Basslines", id: "K9g-38EDcvk" },
    { title: "Deep House Focus: Work With Me", artist: "3h Pomodoro 50/10, Sunset Study", id: "yv3baY14XRM" },
    { title: "Deep & Minimal House Mix", artist: "Focus Mode / Coding Flow State", id: "22t_Ytu03Ds" },
  ],
};

let currentPlaylist = "fun";
let currentIndex = -1;

const frame = document.getElementById("player-frame");
const nowTitle = document.getElementById("now-title");
const nowArtist = document.getElementById("now-artist");
const tracklistEl = document.getElementById("tracklist");
const tabs = document.querySelectorAll(".tab");

function renderTracklist() {
  const tracks = PLAYLISTS[currentPlaylist];
  tracklistEl.innerHTML = "";

  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.className = "track" + (index === currentIndex ? " active" : "");

    const info = document.createElement("div");
    info.className = "track-info";
    info.innerHTML = `
      <span class="track-title">${track.title}</span>
      <span class="track-artist">${track.artist}</span>
    `;

    const badge = document.createElement("span");
    badge.className = "track-badge";
    badge.textContent = index === currentIndex ? "▶ playing" : "";

    li.appendChild(info);
    li.appendChild(badge);
    li.addEventListener("click", () => playTrack(index));

    tracklistEl.appendChild(li);
  });
}

function playTrack(index) {
  const tracks = PLAYLISTS[currentPlaylist];
  const track = tracks[index];
  if (!track) return;

  currentIndex = index;
  frame.src = `https://www.youtube.com/embed/${track.id}?autoplay=1`;
  nowTitle.textContent = track.title;
  nowArtist.textContent = track.artist;
  renderTracklist();
}

function switchPlaylist(name) {
  currentPlaylist = name;
  currentIndex = -1;
  frame.src = "";
  nowTitle.textContent = "Pick a track";
  nowArtist.textContent = "";

  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.playlist === name);
  });

  renderTracklist();
}

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentIndex < 0) return;
  const tracks = PLAYLISTS[currentPlaylist];
  const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  playTrack(prevIndex);
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentIndex < 0) return;
  const tracks = PLAYLISTS[currentPlaylist];
  const nextIndex = (currentIndex + 1) % tracks.length;
  playTrack(nextIndex);
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => switchPlaylist(tab.dataset.playlist));
});

renderTracklist();
