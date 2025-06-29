// Timed lyrics
const lyrics = [
  { time: 0, text: "SAMBHAL KE RAKHA WO PHOOL MERA TU" },
  { time: 4, text: "MERI SHAYARI ME ZAROOR RAHA TU" },
  { time: 8, text: "JO ANKHON ME PYAARI SI DUNIYA BASAYI" },
  { time: 13, text: "WO DUNIYA BHI THA TU AUR LAMHA BHI THA TU" },
  { time: 17, text: "HAAN LAGTE HAI MUJHKO YE KISSE SATANE" },
  { time: 21, text: "DETA NA DIL MERA TUJHKO BHULANE" },
  { time: 25, text: "ADHOORE SE WAADE ADHOORI SI RAATEIN" },
  { time: 30, text: "AB HISSE ME DAKHIL MERI BAS WO YAADEIN" },
  { time: 34, text: "REHNA THA BANKE HUMDUM TERA" },
  { time: 37, text: "AISE JAANA HI THA FIR TU KYU THEHRA" },
  { time: 42, text: "AB NA MAANE MERA DIL KE NA TERE KAABIL" },
  { time: 46, text: "THI EK ARZOO KI MAI KEHTA RAHA" },
  { time: 50, text: "PAR TU AATA NAHI SAPNO SE JAATA NAHI" },
  { time: 58, text: "MILJAAYE KYA HI BAAT THI KAAMIL HOJATA WAHI" }
];


function unlock() {
  const input = document.getElementById("password").value;
  if (input === "annielovesaina") {
    document.body.classList.remove("locked");
    document.body.classList.add("unlocked");
    document.querySelector(".password-container").style.display = "none";
    document.querySelector(".wrapper").style.display = "block";
    document.getElementById("mainContainer").style.display = "flex";
    document.getElementById("visuals").style.display = "block";

    setupLyrics();
    spawnEmojis();
    scatterFloatingImages();

    // 👉 Start the song!
    const audio = document.getElementById("audioPlayer");
    audio.play().catch(err => {
      console.warn("Autoplay blocked:", err);
    });
  } else {
    alert("Wrong password, try again 🥺");
  }
}


function setupLyrics() {
  const lyricsDiv = document.getElementById("lyricsDisplay");
  lyrics.forEach((line, index) => {
    const p = document.createElement("p");
    p.classList.add("lyric-line");
    p.id = `line-${index}`;
    p.textContent = line.text;
    lyricsDiv.appendChild(p);
  });

  const audio = document.getElementById("audioPlayer");
 audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;

  lyrics.forEach((line, index) => {
    const lineElem = document.getElementById(`line-${index}`);
    const nextTime = lyrics[index + 1] ? lyrics[index + 1].time : Infinity;

    if (currentTime >= line.time && currentTime < nextTime) {
      lineElem.classList.add("active");

      // Scroll the lyrics container so the active line is centered
      const container = document.getElementById("lyricsDisplay");
      const lineOffset = lineElem.offsetTop - container.offsetHeight / 2 + lineElem.offsetHeight / 2;
      container.scrollTo({
        top: lineOffset,
        behavior: "smooth"
      });
      
    } else {
      lineElem.classList.remove("active");
    }
  });
});
}

function scatterFloatingImages() {
  const images = document.querySelectorAll(".floating-img");

  const positions = [
    [10, 10], [20, 90], [5, 50],
    [40, 75], [50, 20], [60, 5],
    [70, 70], [80, 25], [85, 60]
  ];

  images.forEach((img, index) => {
    const [top, left] = positions[index % positions.length];
    const rotate = Math.random() * 20 - 10;

    img.style.top = `${top}vh`;
    img.style.left = `${left}vw`;
    img.style.transform = `rotate(${rotate}deg)`;
  });
}

function scatterFloatingImages() {
  const images = document.querySelectorAll(".floating-img");

  // Detect mobile device by screen width
  const isMobile = window.innerWidth <= 600;

  // Set different positions for mobile and desktop
  const positions = isMobile
    ? [
        [10, 15], [10, 70], [20, 25],
        [20, 60], [85, 10], [75, 45],
        [75, 10], [75, 80], [85,80]
      ]
    : [
        [10, 10], [20, 90], [5, 50],
        [40, 75], [50, 20], [60, 5],
        [70, 70], [80, 25], [85, 60]
      ];

  images.forEach((img, index) => {
    const [top, left] = positions[index % positions.length];
    const rotate = Math.random() * 20 - 10;

    img.style.top = `${top}vh`;
    img.style.left = `${left}vw`;
    img.style.transform = `rotate(${rotate}deg)`;
  });
}






// Floating emojis AFTER unlock
function spawnEmojis() {
  const emojis = ["💖", "✨", "🌸", "💕", "😽", "💫","❤️‍🩹","😚"];
  for (let i = 0; i < 30; i++) {
    const emoji = document.createElement("div");
    emoji.classList.add("floating-emoji");
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animationDuration = (4 + Math.random() * 4) + "s";
    emoji.style.fontSize = (1.5 + Math.random() * 1.5) + "rem";
    document.body.appendChild(emoji);
  }
}
