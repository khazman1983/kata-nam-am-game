const levels = [
    { tp: "TP1", title: "Aras 1", instruction: "Klik pada kata nama am (Benda).", s: "Saya ada buku.", a: ["buku"], img: "buku.png" },
    { tp: "TP1", title: "Aras 2", instruction: "Klik pada kata nama am (Haiwan).", s: "Itu seekor kucing.", a: ["kucing"],
    { tp: "TP1", title: "Aras 3", instruction: "Klik pada kata nama am (Tempat).", s: "Rumah itu besar.", a: ["Rumah"], 
    { tp: "TP2", title: "Aras 4", instruction: "Cari 2 kata nama am.", s: "Budak itu bawa beg.", a: ["Budak", "beg"] },
    { tp: "TP2", title: "Aras 5", instruction: "Cari 2 kata nama am.", s: "Burung terbang di langit.", a: ["Burung", "langit"] },
    { tp: "TP2", title: "Aras 6", instruction: "Cari kata nama am.", s: "Emak masak di dapur.", a: ["Emak", "dapur"] },
    { tp: "TP3", title: "Aras 7", instruction: "Pilih kategori 'Kenderaan'.", s: "Ayah naik kereta ke kerja.", a: ["kereta"] },
    { tp: "TP3", title: "Aras 8", instruction: "Pilih kategori 'Tumbuhan'.", s: "Bunga itu sangat wangi.", a: ["Bunga"] },
    { tp: "TP3", title: "Aras 9", instruction: "Pilih kategori 'Pakaian'.", s: "Adik pakai baju baharu.", a: ["baju"] },
    { tp: "TP3", title: "Aras 10", instruction: "Pilih 2 kata nama am.", s: "Cikgu tulis pada papan.", a: ["Cikgu", "papan"] },
    { tp: "TP4", title: "Aras 11", instruction: "Klik jawapan sesuai: ___ makan rumput.", s: "Lembu Kerbau Kambing", a: ["Lembu", "Kerbau", "Kambing"] },
    { tp: "TP4", title: "Aras 12", instruction: "Klik jawapan sesuai: Kakak beli ___.", s: "roti susu gula", a: ["roti", "susu", "gula"] },
    { tp: "TP4", title: "Aras 13", instruction: "Cari kata nama am (Tempat).", s: "Kami mandi di pantai.", a: ["pantai"] },
    { tp: "TP4", title: "Aras 14", instruction: "Cari kata nama am (Benda).", s: "Abang asah pensel itu.", a: ["pensel"] },
    { tp: "TP5", title: "Aras 15", instruction: "Cari 3 kata nama am.", s: "Petani tanam padi di sawah.", a: ["Petani", "padi", "sawah"] },
    { tp: "TP5", title: "Aras 16", instruction: "Cari 3 kata nama am.", s: "Nelayan tangkap ikan di laut.", a: ["Nelayan", "fish", "laut"] },
    { tp: "TP5", title: "Aras 17", instruction: "Cari semua kata nama am.", s: "Monyet makan pisang atas pokok.", a: ["Monyet", "pisang", "pokok"] },
    { tp: "TP6", title: "Aras 18", instruction: "Analisis: Mana satu kata nama am?", s: "Lori bawa pasir ke tapak binaan.", a: ["Lori", "pasir", "tapak", "binaan"] },
    { tp: "TP6", title: "Aras 19", instruction: "Cari subjek dan objek (am).", s: "Tukang kayu itu buat meja.", a: ["Tukang", "kayu", "meja"] },
    { tp: "TP6", title: "Aras 20", instruction: "Cabaran Akhir: Cari semua kata nama am.", s: "Posmen hantar surat ke pejabat.", a: ["Posmen", "surat", "pejabat"] }
];

let currentLevel = 0;
let score = 0;
let lives = 5;
let foundInLevel = 0;

function loadLevel() {
    const container = document.getElementById('sentence-container');
    const nextBtn = document.getElementById('next-btn');
    const instructionText = document.getElementById('instructionText');
    const titleText = document.getElementById('level-title');
    const progressBar = document.getElementById('progress-bar');
    
    if (!container) return;
    container.innerHTML = '';
    nextBtn.style.display = 'none';
    foundInLevel = 0;

    titleText.innerText = levels[currentLevel].title;
    instructionText.innerHTML = `<span style="color:#007bff; font-weight:bold;">[${levels[currentLevel].tp}]</span> ${levels[currentLevel].instruction}`;
    
    if (levels[currentLevel].img) {
        const imgTag = document.createElement('img');
        imgTag.src = levels[currentLevel].img;
        imgTag.className = "game-img"; 
        container.appendChild(imgTag);
        container.appendChild(document.createElement('br'));
    }
    
    progressBar.style.width = `${(currentLevel / levels.length) * 100}%`;
    document.getElementById('high-score').innerText = localStorage.getItem('highScore') || 0;
    updateUI();

    const words = levels[currentLevel].s.split(" ");
    words.forEach(word => {
        const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        const span = document.createElement('span');
        span.innerText = word;
        span.className = 'word';

        span.onclick = () => {
            const isCorrect = levels[currentLevel].a.some(ans => 
                ans.toLowerCase() === cleanWord.toLowerCase()
            );

            if (isCorrect) {
                if (span.style.backgroundColor !== "rgb(40, 167, 69)") {
                    span.style.backgroundColor = "#28a745";
                    span.style.color = "white";
                    score += 10;
                    foundInLevel++;
                    updateUI();
                    if (foundInLevel === levels[currentLevel].a.length) {
                        nextBtn.style.display = 'block';
                    }
                }
            } else {
                if (span.style.backgroundColor !== "rgb(220, 53, 69)") {
                    span.style.backgroundColor = "#dc3545";
                    span.style.color = "white";
                    lives--;
                    updateUI();
                    if (lives <= 0) gameOver("Nyawa Habis! Cuba lagi.");
                }
            }
        };
        container.appendChild(span);
        container.appendChild(document.createTextNode(" "));
    });
}

function updateUI() {
    document.getElementById('score').innerText = score;
    document.getElementById('lives').innerText = lives;
}

function nextLevel() {
    currentLevel++;
    if (currentLevel >= levels.length) {
        gameOver("TAHNIAH! Anda mencapai TP6!");
    } else {
        loadLevel();
    }
}

function gameOver(msg) {
    const high = localStorage.getItem('highScore') || 0;
    if (score > high) localStorage.setItem('highScore', score);
    alert(msg + "\nSkor: " + score);
    location.reload();
}

document.addEventListener('DOMContentLoaded', loadLevel);
