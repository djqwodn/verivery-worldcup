
const videos = [
  { name: "Super Special", id: "D1hWFlHRRas" },
  { name: "불러줘", id: "Hbtiel8ycYI" },
  { name: "Flower", id: "KwzGrOfR050" },
  { name: "F.I.L", id: "MfboEq37eMI" },
  { name: "Alright!", id: "jesASMPbDPc" },
  { name: "딱 잘라서 말해", id: "y4mhiwdBMI4" },
  { name: "Love Line", id: "7jEBrttKfus" },
  { name: "나 집에 가지 않을래", id: "TrLWajzucRk" },
  { name: "Get Ready", id: "GqhT2HbjE14" },
  { name: "밝혀줘", id: "H9KAYTPomJ4" },
  { name: "Tag Tag Tag", id: "yfhnTHWtBxE" },
  { name: "반할 수밖에", id: "hlt9nZyIfI0" },
  { name: "PHOTO", id: "adoPEIwIxbo" },
  { name: "Lay Back", id: "X2RyGcufXKw" },
  { name: "Paradise", id: "GbcH9zkQQfs" },
  { name: "Curtain Call", id: "8tiMdcm2ziU" },
  { name: "MOMENT", id: "9vzKcyUdXG4" },
  { name: "Thunder", id: "aYStt6LoA9c" },
  { name: "Connect", id: "cTPNkUAIlGs" },
  { name: "Skydive", id: "XrqCjgSVR1I" },
  { name: "Beautiful-x", id: "a1XX0U05R-0" },
  { name: "사생활", id: "UVav7sAYz_g" },
  { name: "G.B.T.B.", id: "iDfFtJcj5x4" },
  { name: "MY FACE", id: "7UA4uI01FkE" },
  { name: "Hold me tight", id: "r8M21DnjGJU" },
  { name: "Get Outta My Way", id: "kW2HEDxyJT8" },
  { name: "소중력", id: "MMkDWOaCLZI" },
  { name: "Get Away", id: "SPghmad0OxM" },
  { name: "Numbness", id: "UD-pW4eQfHM" },
  { name: "TRIGGER", id: "71gOeMzNEBQ" },
  { name: "Underdog", id: "UX7UpzRbvVM" },
  { name: "Prom", id: "PEv8hC1cJGE" },
  { name: "Heart Attack", id: "UcdGeLd0GRY" },
  { name: "틈 (Moment)", id: "MVozmWZC7iU" },
  { name: "UNDERCOVER", id: "UNUCV_UomZo" },
  { name: "Coming over", id: "6nfXCX3mDUc" },
  { name: "Wish U were here", id: "k4EHKjEizJ8" },
  { name: "모든 순간들의 널 축하해 (Candle)", id: "jugKxJdnz2o" },
  { name: "O", id: "EUMeWvOugVY" },
  { name: "Fallin'", id: "21CQF3hBUHc" },
  { name: "Childhood", id: "FJc_BbqE8b0" },
  { name: "Emotion", id: "U6yHrtTI9Lw" },
  { name: "Velocity", id: "Dol-QQKgtSM" },
  { name: "잠깐, 봄 (Our Spring)", id: "3VmifoxGMMM" },
  { name: "Fine", id: "1af_ioaauyQ" },
  { name: "Tap Tap", id: "bmy6D1KoFsg" },
  { name: "Motive", id: "lZ50_tXZRYk" },
  { name: "CRAYZ LIKE THAT", id: "c46Psa0YiuA" },
  { name: "JUICY JUICY", id: "CiKkabaviSc" },
  { name: "RAIN COAT", id: "j0VSvwgUdws" },
  { name: "SMILE WITH WOU", id: "RMV775MSd3c" }
];

let round = [...videos];
let nextRound = [];
let rankings = [];

const roundInfo = document.getElementById("round-info");
const matchDiv = document.getElementById("match");
const resultsDiv = document.getElementById("results");
const rankingOl = document.getElementById("ranking");

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

  wrapper.appendChild(thumbnail);
  wrapper.appendChild(title);
  wrapper.appendChild(link);
  wrapper.appendChild(playBtn);

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
  rankingOl.innerHTML = "";

  rankings.forEach((video, idx) => {
    const li = document.createElement("li");
    li.textContent = video.name;
    rankingOl.appendChild(li);
  });

  const first = round[0];
  const li = document.createElement("li");
  li.textContent =vfirst.name;
  li.style.fontWeight = "bold";
  li.style.color = "#8e2469";
  rankingOl.insertBefore(li, rankingOl.firstChild);
}

renderMatch();
