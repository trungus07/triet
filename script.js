const llsx = [
  "Công cụ đá cũ", "Cung tên & Bẫy thú", "Trồng trọt sơ khai", "Chăn nuôi & Thủy lợi nhỏ",
  "Cái cày đồng", "Đồ sắt & Thủy lợi lớn", "Cối xay", "Xưởng thủ công chuyên môn hóa",
  "La bàn & Kỹ thuật đóng tàu", "Công trường thủ công", "Máy hơi nước", "Đường sắt & Thép",
  "Điện & Hóa chất", "Dây chuyền sản xuất", "Container & Hàng không", "Vi mạch & Máy tính",
  "Internet & Thương mại điện tử", "Mạng Xã hội & Điện toán đám mây", "AI & Big Data", "Tự động hóa toàn diện"
];

const qhsx = [
  "Công xã thị tộc", "Thị tộc mẫu hệ", "Thị tộc phụ hệ", "Chế độ Gia trưởng",
  "Nô lệ gia đình", "Chiếm hữu nô lệ", "Phong kiến lãnh địa", "Quan hệ Phường hội",
  "Chủ nghĩa Trọng thương", "Tích lũy tư bản nguyên thủy", "Tư bản Công nghiệp", "Tư bản Tự do cạnh tranh",
  "Tư bản Độc quyền", "Tư bản Tiêu dùng đại chúng", "Tư bản Tài chính / Toàn cầu hóa", "Chủ nghĩa Tân tự do",
  "Kinh tế Tri thức / Sở hữu trí tuệ", "Kinh tế Nền tảng", "Tư bản Giám sát", "Xã hội Hậu tư bản"
];

let currentLevel = 0;
let score = 0;
let revolutionUsed = false;

function shuffle(array) {
  return array.map((a) => [Math.random(), a])
              .sort((a, b) => a[0] - b[0])
              .map((a) => a[1]);
}

function renderLevel() {
  document.getElementById("llsx-card").innerHTML = `<h2>🔧 ${llsx[currentLevel]}</h2>`;
  const shuffledQHSX = shuffle(qhsx);
  const container = document.getElementById("qhsx-options");
  container.innerHTML = "";
  shuffledQHSX.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.textContent = item;
    btn.onclick = () => checkAnswer(index);
    container.appendChild(btn);
  });
  document.getElementById("message").textContent = "";
}

function checkAnswer(selectedIndex) {
  const correctIndex = currentLevel;
  if (selectedIndex === correctIndex) {
    score += 2;
    document.getElementById("message").textContent = "✅ Phù hợp! +2 điểm";
  } else if (selectedIndex < correctIndex) {
    score -= 1;
    document.getElementById("message").textContent = "⚠️ Bị kìm hãm! -1 điểm";
  } else {
    score -= 1;
    document.getElementById("message").textContent = "⚠️ Vượt xa thực tế! -1 điểm";
  }
  document.getElementById("score").textContent = score;
}

document.getElementById("next-btn").onclick = () => {
  currentLevel++;
  if (currentLevel >= 4) {
    document.getElementById("game").innerHTML = `<h2>🎉 Trò chơi kết thúc!</h2><p>Điểm xã hội cuối cùng: ${score}</p>`;
  } else {
    renderLevel();
  }
};

document.getElementById("revolution-btn").onclick = () => {
  if (revolutionUsed) {
    alert("Bạn đã dùng thẻ Cách mạng rồi!");
    return;
  }
  revolutionUsed = true;
  score -= 1;
  document.getElementById("score").textContent = score;
  document.getElementById("message").textContent = "🔄 Đã dùng thẻ Cách mạng! Chọn lại thẻ đỏ.";
};

renderLevel();