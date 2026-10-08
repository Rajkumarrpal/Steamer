
// STEP 1: SONG DATA


const songs = [
  {
    id: 1,
    title: "Buleya",
    artist: "Pepon",
    album: "Sultan",
    audio: "../music/bulleya.mp3",
    cover: "../covers/bulleya.png",
  },

  {
    id: 2,
    title: "GUSTAKH DIL TERE LIYE",
    artist: "sonu nigam",
    album: "GUSTAKH DIL TERE LIYE",
    audio: "../music/GUSTAKH DIL TERE LIYE.mp3",
    cover: "../covers/GUSTAKH DIL TERE LIYE.png",
  },

  {
    id: 3,
    title: "Ishq Hai",
    artist: "Arijit singh",
    album: "miss matched",
    audio: "../music/Ishq Hai.mp3",
    cover: "../covers/Ishq-Hai.png",
  },
  {
    id: 4,
    title: "Pehla-Pyar",
    artist: "Armaan Malik",
    album: "Kabir Singh",
    audio: "../music/Pehla-Pyar.mp3",
    cover: "../covers/Pehla-Pyar.png",
  },
  {
    id: 5,
    title: "RABBA MEIN TOH MAR GAYA OYE",
    artist: "Rahat Fateh khan ",
    album: "Kabir Singh",
    audio: "../music/RABBA.mp3",
    cover: "../covers/S.png",
  },
  {
    id: 6,
    title: "Dil To Baacha Hai",
    artist: "Rahat Fateh khan ",
    album: "Soal Studio & Folk Studio",
    audio: "../music/Dil_To_Baacha_Hai.mp3",
    cover: "../covers/Dil_To_Baacha_Hai.png",
  },
  {
    id: 7,
    title: "Achi Lagti HO",
    artist: "Sonu Nigam",
    album: "Kuch Na Kaho",
    audio: "../music/Achchi Lagti Ho.mp3",
    cover: "../covers/ACHI LAGTYI HO.png",
  },
  {
    id: 7,
    title: "AANKHEIN KHULI",
    artist: " Lata Mangeshkar, Udit Narayan",
    album: "Mohebbatein",
    audio: "../music/AANKHEIN KHULI.mp3",
    cover: "../covers/AANKHEIN KHULI.png",
  },
];


// STEP 2: DOM ELEMENTS


const songGrid = document.getElementById("songGrid");
const searchInput = document.getElementById("searchInput");

const audioPlayer = document.getElementById("audioPlayer");

const playPauseBtn = document.getElementById("playPauseBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const volumeBar = document.getElementById("volumeBar");
const volumeBtn = document.getElementById("volumeBtn");

const playerCover = document.getElementById("playerCover");
const playerSongName = document.getElementById("playerSongName");
const playerArtist = document.getElementById("playerArtist");

const heroSection = document.getElementById("heroSection");
const heroCover = document.getElementById("heroCover");
const heroTitle = document.getElementById("heroTitle");
const heroArtist = document.getElementById("heroArtist");


// STEP 3: CURRENT SONG


// Currently selected song
let currentSongIndex = 0;

// Song currently playing or not
let isPlaying = false;


// STEP 4: RENDER SONGS


function renderSongs() {
  // Clear existing cards
  songGrid.innerHTML = "";

  // Loop through songs array
  songs.forEach((song, index) => {
    // Create song card
    const songCard = document.createElement("div");

    // Add class
    songCard.classList.add("song-card");

    // Add card HTML
    songCard.innerHTML = `
            <div class="song-cover-wrapper">

                <img 
                    src="${song.cover}" 
                    alt="${song.title}"
                    class="song-cover"
                >

                <button 
                    class="song-card-play" 
                    data-index="${index}"
                >
                    <i class="fa-solid fa-play"></i>
                </button>

            </div>

            <div class="song-info">

                <h3>${song.title}</h3>

                <p>${song.artist}</p>

            </div>

            <button class="song-like-btn">
                <i class="fa-regular fa-heart"></i>
            </button>
        `;

    // Add card to song grid
    songGrid.appendChild(songCard);
  });
}


// RENDER SONGS WHEN PAGE LOADS


renderSongs();


// STEP 5: LOAD SONG

function loadSong(index) {
  currentSongIndex = index;

  const song = songs[currentSongIndex];

  audioPlayer.src = song.audio;

  playerCover.src = song.cover;
  playerSongName.textContent = song.title;
  playerArtist.textContent = song.artist;

  heroCover.src = song.cover;
  heroTitle.textContent = song.title;
  heroArtist.textContent = song.artist;

  heroSection.style.setProperty("--hero-image", `url("${song.cover}")`);

  const playerBackground = document.querySelector(".player-background");

  if (playerBackground) {
    playerBackground.style.setProperty(
      "--player-image",
      `url("${song.cover}")`,
    );
  }

  // Important
  audioPlayer.load();
}

// STEP 6: PLAY / PAUSE


playPauseBtn.addEventListener("click", () => {

    if (isPlaying) {

        // Pause song
        audioPlayer.pause();

        // Update status
        isPlaying = false;

        // Change icon to play
        playPauseBtn.innerHTML =
            '<i class="fa-solid fa-play"></i>';

    } else {

        // Play song
        audioPlayer.play();

        // Update status
        isPlaying = true;

        // Change icon to pause
        playPauseBtn.innerHTML =
            '<i class="fa-solid fa-pause"></i>';
    }

});


// STEP 7: SONG CARD PLAY BUTTON


document.addEventListener("click", (event) => {

    const button =
        event.target.closest(".song-card-play");

    if (!button) {
        return;
    }

    const index =
        Number(button.dataset.index);

    console.log("Clicked song index:", index);

    loadSong(index);

    audioPlayer.play()
        .then(() => {

            isPlaying = true;

            playPauseBtn.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

            console.log("Song is playing");

        })
        .catch((error) => {

            console.error(
                "Song play error:",
                error
            );

        });
});


// STEP 8: NEXT SONG


nextBtn.addEventListener("click", () => {

    // Next song ka index
    currentSongIndex++;

    // Agar last song ke baad chale gaye
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    // Next song load karo
    loadSong(currentSongIndex);

    // Song play karo
    audioPlayer.play();

    // Playing status
    isPlaying = true;

    // Play button ko pause icon karo
    playPauseBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';
});



// STEP 8: PREVIOUS SONG


previousBtn.addEventListener("click", () => {

    // Previous song ka index
    currentSongIndex--;

    // Agar first song se pehle chale gaye
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    // Previous song load karo
    loadSong(currentSongIndex);

    // Song play karo
    audioPlayer.play();

    // Playing status
    isPlaying = true;

    // Play button ko pause icon karo
    playPauseBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';
});


// STEP 9: PROGRESS BAR + TIME


audioPlayer.addEventListener("loadedmetadata", () => {

    duration.textContent = formatTime(audioPlayer.duration);

    progressBar.max = audioPlayer.duration;
});


audioPlayer.addEventListener("timeupdate", () => {

    currentTime.textContent = formatTime(audioPlayer.currentTime);

    progressBar.value = audioPlayer.currentTime;
});


progressBar.addEventListener("input", () => {

    audioPlayer.currentTime = progressBar.value;
});


function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}



// STEP 10: VOLUME + MUTE


audioPlayer.volume = 1;

volumeBar.value = 1;


volumeBar.addEventListener("input", () => {

    audioPlayer.volume = volumeBar.value;

    if (audioPlayer.volume === 0) {
        audioPlayer.muted = true;
    } else {
        audioPlayer.muted = false;
    }
});


volumeBtn.addEventListener("click", () => {

    audioPlayer.muted = !audioPlayer.muted;

    if (audioPlayer.muted) {

        volumeBtn.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';

    } else {

        volumeBtn.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';
    }
});



// STEP 11: SEARCH SONGS


searchInput.addEventListener("input", () => {

    const searchText = searchInput.value
        .toLowerCase()
        .trim();

    const filteredSongs = songs.filter((song) => {

        return (
            song.title.toLowerCase().includes(searchText) ||
            song.artist.toLowerCase().includes(searchText) ||
            song.album.toLowerCase().includes(searchText)
        );

    });

    renderSearchResults(filteredSongs);
});


function renderSearchResults(filteredSongs) {

    songGrid.innerHTML = "";

    filteredSongs.forEach((song) => {

        const index = songs.indexOf(song);

        const songCard = document.createElement("div");

        songCard.classList.add("song-card");

        songCard.innerHTML = `
            <div class="song-cover-wrapper">

                <img
                    src="${song.cover}"
                    alt="${song.title}"
                    class="song-cover"
                >

                <button
                    class="song-card-play"
                    data-index="${index}"
                >
                    <i class="fa-solid fa-play"></i>
                </button>

            </div>

            <div class="song-info">

                <h3>${song.title}</h3>

                <p>${song.artist}</p>

            </div>

            <button
                class="song-like-btn"
                data-like-index="${index}"
            >
                <i class="fa-regular fa-heart"></i>
            </button>
        `;

        songGrid.appendChild(songCard);
    });

    if (filteredSongs.length === 0) {

        songGrid.innerHTML = `
            <p class="no-results">
                No songs found
            </p>
        `;
    }
}



// STEP 12: FAVORITES


let favorites = JSON.parse(
    localStorage.getItem("favorites")
) || [];


function saveFavorites() {

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
}


function toggleFavorite(index) {

    if (favorites.includes(index)) {

        favorites = favorites.filter(
            (item) => item !== index
        );

    } else {

        favorites.push(index);
    }

    saveFavorites();

    renderSongs();
}


document.addEventListener("click", (event) => {

    const likeButton =
        event.target.closest(".song-like-btn");

    if (!likeButton) {
        return;
    }

    const index = Number(
        likeButton.dataset.likeIndex
    );

    toggleFavorite(index);
});



// STEP 13: RECENTLY PLAYED


let recentlyPlayed = JSON.parse(
    localStorage.getItem("recentlyPlayed")
) || [];


function addToRecentlyPlayed(index) {

    recentlyPlayed =
        recentlyPlayed.filter(
            (item) => item !== index
        );

    recentlyPlayed.unshift(index);

    // Maximum 10 songs
    recentlyPlayed =
        recentlyPlayed.slice(0, 10);

    localStorage.setItem(
        "recentlyPlayed",
        JSON.stringify(recentlyPlayed)
    );

    renderRecentlyPlayed();
}


function renderRecentlyPlayed() {

    const recentList =
        document.getElementById("recentList");

    if (!recentList) {
        return;
    }

    recentList.innerHTML = "";

    recentlyPlayed.forEach((index) => {

        const song = songs[index];

        if (!song) {
            return;
        }

        const recentSong =
            document.createElement("div");

        recentSong.classList.add("recent-song");

        recentSong.innerHTML = `
            <img
                src="${song.cover}"
                alt="${song.title}"
            >

            <div class="recent-song-info">

                <h4>${song.title}</h4>

                <p>${song.artist}</p>

            </div>
        `;

        recentSong.addEventListener(
            "click",
            () => {

                loadSong(index);

                audioPlayer.play();

                isPlaying = true;

                playPauseBtn.innerHTML =
                    '<i class="fa-solid fa-pause"></i>';

            }
        );

        recentList.appendChild(recentSong);
    });
}



// STEP 14: AUTO NEXT


audioPlayer.addEventListener("ended", () => {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {

        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);

    audioPlayer.play();

    isPlaying = true;

    playPauseBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';
});



// STEP 15: SHUFFLE + REPEAT


let isShuffle = false;

let isRepeat = false;


const shuffleBtn =
    document.getElementById("shuffleBtn");

const repeatBtn =
    document.getElementById("repeatBtn");


if (shuffleBtn) {

    shuffleBtn.addEventListener("click", () => {

        isShuffle = !isShuffle;

        shuffleBtn.classList.toggle(
            "active",
            isShuffle
        );
    });
}


if (repeatBtn) {

    repeatBtn.addEventListener("click", () => {

        isRepeat = !isRepeat;

        repeatBtn.classList.toggle(
            "active",
            isRepeat
        );
    });
}


audioPlayer.addEventListener("ended", () => {

    if (isRepeat) {

        audioPlayer.currentTime = 0;

        audioPlayer.play();

        return;
    }

    if (isShuffle) {

        let randomIndex;

        do {

            randomIndex =
                Math.floor(
                    Math.random() * songs.length
                );

        } while (
            randomIndex === currentSongIndex &&
            songs.length > 1
        );

        currentSongIndex = randomIndex;

    } else {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }
    }

    loadSong(currentSongIndex);

    audioPlayer.play();

    isPlaying = true;

    playPauseBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';
});



// STEP 16: DYNAMIC ALBUM COLOR


function setAlbumColor(imagePath) {

    const image = new Image();

    image.crossOrigin = "Anonymous";

    image.src = imagePath;

    image.onload = () => {

        const canvas =
            document.createElement("canvas");

        const context =
            canvas.getContext("2d");

        canvas.width = 1;
        canvas.height = 1;

        context.drawImage(
            image,
            0,
            0,
            1,
            1
        );

        const pixel =
            context.getImageData(
                0,
                0,
                1,
                1
            ).data;

        const color =
            `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

        document.documentElement.style
            .setProperty(
                "--dynamic-color",
                color
            );
    };
}



// STEP 17: PLAYLIST


let playlists = JSON.parse(
    localStorage.getItem("playlists")
) || [];


function savePlaylists() {

    localStorage.setItem(
        "playlists",
        JSON.stringify(playlists)
    );
}


function createPlaylist(name) {

    if (!name.trim()) {
        return;
    }

    const playlist = {

        id: Date.now(),

        name: name,

        songs: []
    };

    playlists.push(playlist);

    savePlaylists();

    renderPlaylists();
}


function renderPlaylists() {

    const playlistList =
        document.getElementById("playlistList");

    if (!playlistList) {
        return;
    }

    playlistList.innerHTML = "";

    playlists.forEach((playlist) => {

        const item =
            document.createElement("div");

        item.classList.add("playlist-item");

        item.textContent = playlist.name;

        playlistList.appendChild(item);
    });
}



// STEP 18: THEME


const themeBtn =
    document.getElementById("themeBtn");


if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle(
            "light-mode"
        );

        const lightMode =
            document.body.classList.contains(
                "light-mode"
            );

        localStorage.setItem(
            "theme",
            lightMode ? "light" : "dark"
        );
    });
}


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "light") {

    document.body.classList.add(
        "light-mode"
    );
}





renderRecentlyPlayed();

renderPlaylists();

