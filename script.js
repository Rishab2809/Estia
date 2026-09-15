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

const nowTitle = document.getElementById("now-title");
const nowArtist = document.getElementById("now-artist");
const playBtn = document.getElementById("play-btn");
const tracklistEl = document.getElementById("tracklist");
const tabs = document.querySelectorAll(".tab");

function watchUrl(track) {
  return `https://www.youtube.com/watch?v=${track.id}`;
}

function renderTracklist() {
  const tracks = PLAYLISTS[currentPlaylist];
  tracklistEl.innerHTML = "";

  tracks.forEach((track, index) => {
    const li = document.createElement("li");

    const btn = document.createElement("button");
    btn.className = "track";
    btn.type = "button";
    btn.setAttribute("aria-current", index === currentIndex ? "true" : "false");

    const info = document.createElement("span");
    info.className = "track-info";
    info.innerHTML = `
      <span class="track-title">${track.title}</span>
      <span class="track-artist">${track.artist}</span>
    `;

    const badge = document.createElement("span");
    badge.className = "track-badge";
    badge.textContent = index === currentIndex ? "▶ queued" : "";

    btn.appendChild(info);
    btn.appendChild(badge);
    btn.addEventListener("click", () => selectTrack(index, true));

    li.appendChild(btn);
    tracklistEl.appendChild(li);
  });
}

function selectTrack(index, openTab) {
  const tracks = PLAYLISTS[currentPlaylist];
  const track = tracks[index];
  if (!track) return;

  currentIndex = index;
  nowTitle.textContent = track.title;
  nowArtist.textContent = track.artist;
  playBtn.disabled = false;
  renderTracklist();

  if (openTab) {
    window.open(watchUrl(track), "_blank", "noopener");
  }
}

function switchPlaylist(name) {
  currentPlaylist = name;
  currentIndex = -1;
  nowTitle.textContent = "Nothing queued yet";
  nowArtist.textContent = "Pick a track below";
  playBtn.disabled = true;

  tabs.forEach((tab) => {
    tab.setAttribute("aria-selected", tab.dataset.playlist === name ? "true" : "false");
  });

  renderTracklist();
}

playBtn.addEventListener("click", () => {
  if (currentIndex < 0) return;
  const track = PLAYLISTS[currentPlaylist][currentIndex];
  window.open(watchUrl(track), "_blank", "noopener");
});

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentIndex < 0) return;
  const tracks = PLAYLISTS[currentPlaylist];
  const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
  selectTrack(prevIndex, true);
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentIndex < 0) return;
  const tracks = PLAYLISTS[currentPlaylist];
  const nextIndex = (currentIndex + 1) % tracks.length;
  selectTrack(nextIndex, true);
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => switchPlaylist(tab.dataset.playlist));
});

renderTracklist();
