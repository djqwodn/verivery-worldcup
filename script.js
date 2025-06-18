const videos = [ /* 전체 51곡 배열 생략 없이 여기에 삽입하세요 */ ];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let round = shuffle([...videos]);
let nextRound = [];
let rankings = [];

const roundInfo = document.getElementById("round-info");
const matchDiv = document.getElementById("match");
const resultsDiv = document.getElementById("results");

function getRoundLabel(len) {
  if (len === 2) return "결승";
  return `${len}강`;
}

function createThumbnail(video, onClick) {
  const wrapper = document.createElement("div");
  wrapper.className = "video-card";

  const thumbnail = document.createElement("img");
  thumbnail.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
  thumbnail.alt = video.name;
  thumbnail.onclick = () => window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');

  const title = document.createElement("p");
  title.textContent = video.name;

  const link = document.createElement("a");
  link.href = `https://www.youtube.com/watch?v=${video.id}`;
  link.target = "_blank";
  link.textContent = "듣기";

  const playBtn = document.createElement("button");
  playBtn.textContent = "▶ 선택";
  playBtn.onclick = onClick;

  const controls = document.createElement("div");
  controls.className = "controls-wrap";
  controls.appendChild(link);
  controls.appendChild(playBtn);

  wrapper.appendChild(thumbnail);
  wrapper.appendChild(title);
  wrapper.appendChild(controls);

  return wrapper;
}

let currentIndex = 0;

function renderMatch() {
  if (round.length === 1) {
    rankings.unshift(round[0]);
    showFinalResults();
    return;
  }

  if (currentIndex >= round.length - 1) {
    round = nextRound;
    nextRound = [];
    currentIndex = 0;
    renderMatch();
    return;
  }

  roundInfo.textContent = `현재 라운드: ${getRoundLabel(round.length)}`;
  matchDiv.innerHTML = "";

  const v1 = round[currentIndex];
  const v2 = round[currentIndex + 1];

  const card1 = createThumbnail(v1, () => {
    nextRound.push(v1);
    rankings.push(v2);
    currentIndex += 2;
    renderMatch();
  });

  const card2 = createThumbnail(v2, () => {
    nextRound.push(v2);
    rankings.push(v1);
    currentIndex += 2;
    renderMatch();
  });

  matchDiv.appendChild(card1);
  matchDiv.appendChild(card2);
}

function showFinalResults() {
  roundInfo.textContent = "최종 결과";
  matchDiv.style.display = "none";
  resultsDiv.style.display = "block";

  const topResults = document.getElementById("top-results");
  const topList = topResults.querySelector(".top-list");
  topList.innerHTML = "";

  const first = round[0]; // 결승 승자 = 1위
  const uniqueRankings = [];

  const seen = new Set([first.id]); // 1위는 중복 제거

  for (const video of rankings) {
    if (!seen.has(video.id)) {
      uniqueRankings.push(video);
      seen.add(video.id);
    }
    if (uniqueRankings.length === 2) break; // 2위, 3위만 추출
  }

  const top3 = [first, ...uniqueRankings]; // 정확한 1~3위

  top3.forEach((video, idx) => {
    const card = document.createElement("div");
    card.className = "result-card";
    if (idx === 0) card.classList.add("top-1st");

    const img = document.createElement("img");
    img.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
    img.alt = video.name;

    const text = document.createElement("p");
    text.innerHTML = `<strong>${idx + 1}위.</strong> ${video.name}`;

    card.appendChild(img);
    card.appendChild(text);
    topList.appendChild(card);
  });
}

document.getElementById("shareBtn").onclick = () => {
  const firstPlace = round[0].name;
  const shareUrl = "https://djqwodn.github.io/verivery-worldcup/";
  const text = `내가 뽑은 베리베리 최애곡 1위는 "${firstPlace}" 💜 지금 바로 월드컵 해보기!`;

  if (navigator.share) {
    navigator.share({ title: "베리베리 최애곡 월드컵", text, url: shareUrl });
  } else {
    alert("모바일에서 공유 기능을 사용할 수 있어요 📱\n\n링크: " + shareUrl);
  }
};

document.getElementById("saveImageBtn").onclick = () => {
  const resultSection = document.getElementById("results");
  html2canvas(resultSection, {
    backgroundColor: "#ffffff", // 흰색 배경 설정
    useCORS: true,
    allowTaint: false,
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = 'verivery_ranking.png';
    link.href = canvas.toDataURL();
    link.click();
  });
};

renderMatch();
