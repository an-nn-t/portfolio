// --- Skill Modal Logic ---
const skillData = {
    "Python": {
        role: "Main Language / AI / Data Analysis",
        description: "最も使用頻度が高い言語です。Pytorch、Numpy、Pandas、Matplotlib、OpenCVなどの使用経験があります。",
        images: [
        ],

        links: [
            // { label: "GitHub Profile", url: "https://github.com/an-nn-t" },
            // { label: "制作物デモ", url: "https://example.com" } 
        ]
    },
    "HTML/CSS": {
        role: "Web Design",
        description: "このポートフォリオや会社のホームページを作成しました。",
        images: [],
        links: [
            { label: "会社のHPを見る", url: "https://tosikaihatu.com/" }
        ]
    },
    "Arduino": {
        role: "IoT & Robotics Control",
        description: "2年のマイコンの授業や実習、DCONのプロトタイプ制作で使用しました。 DCONのプロトタイプ制作では、ESP32を使用し、サーボモーターをBluetoothで接続してスマートフォンから操作できるようにしました。",
        images: [],
        links: [] 
    },
    "Blender": {
        role: "3D Modeling",
        description: "中学生の時に、ゲーム（荒野行動）の武器をモデリングしていました。",
        images: ["IMG/m4a1.png","IMG/m4.JPG","IMG/syuryuudan.png","IMG/手りゅう弾.PNG"],
        links: []
    },
    "AtCoder": {
        role: "Algorithm",
        description: "ABCにたまに参加しています。",
        images: [],
        links: [
            { label: "AtCoder Profile", url: "https://atcoder.jp/users/an_nn_t" }
        ]
    },
    "Video Editing": {
        role: "CupCut / ゆっくりムービーメーカー",
        description: "小学生の時から趣味で動画編集をしていました。DCON2025の二次審査の動画編集を担当しました。学校の課題でYouTubeの動画も作成しました。",
        images: [],
        links: [
            // { label: "YouTube Channel", url: "https://youtube.com/" },
            { label: "YouTubeの動画を見る", url: "https://youtu.be/5z5cuMZl7jg" }
        ]
    },
    "Scratch": {
        role: "",
        description: "小学生の時に使用していました。",
        images: ["IMG/パックマン.png"],
        links: [ {label: "ゲームを見る", url: "https://scratch.mit.edu/projects/187335258"}]
    }
};

const modal = document.getElementById('skill-modal');
const modalTitle = document.getElementById('modal-skill-name');
const modalRole = document.getElementById('modal-skill-role');
const modalDesc = document.getElementById('modal-skill-desc');
const closeBtn = document.querySelector('.modal-close');

// スキルカードにクリックイベントを追加
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
        const skillName = card.getAttribute('data-skill');
        const data = skillData[skillName];

        if (data) {
            modalTitle.textContent = skillName;
            modalRole.textContent = data.role;
            
            // 説明文をセット
            let contentHTML = `<p>${data.description}</p>`;
            
            // 画像配列 (images) をループして全て表示する
            if (data.images && data.images.length > 0) {
                contentHTML += `<div style="margin-top:20px; text-align:center;">`;
                data.images.forEach(src => {
                    contentHTML += `<img src="${src}" style="max-width:100%; height:auto; border-radius:8px; border:1px solid rgba(255,255,255,0.1); margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;">`;
                });
                contentHTML += `</div>`;
            }

            // ★追加機能：複数のリンクをボタンとして表示する処理
            if (data.links && data.links.length > 0) {
                // 区切り線とコンテナ
                contentHTML += `
                    <div style="margin-top:10px; padding-top:20px; border-top:1px solid rgba(255,255,255,0.1);">
                        <div style="display:flex; flex-wrap:wrap; gap:15px; justify-content:flex-start;">
                `;

                // リンクの数だけボタンを作成
                data.links.forEach(link => {
                    contentHTML += `
                        <a href="${link.url}" target="_blank" 
                           style="
                               display:inline-flex; 
                               align-items:center;
                               padding:10px 16px; 
                               background: rgba(0, 243, 255, 0.1); 
                               border: 1px solid var(--primary-neon); 
                               color: var(--primary-neon); 
                               border-radius: 50px; 
                               text-decoration: none; 
                               transition: all 0.3s ease;
                               font-size: 0.9rem;
                               font-weight: bold;
                           "
                           onmouseover="this.style.background='var(--primary-neon)'; this.style.color='#000'; this.style.boxShadow='0 0 15px var(--primary-neon)';"
                           onmouseout="this.style.background='rgba(0, 243, 255, 0.1)'; this.style.color='var(--primary-neon)'; this.style.boxShadow='none';"
                        >
                           ${link.label} <i class="fas fa-external-link-alt" style="margin-left:8px;"></i>
                        </a>
                    `;
                });

                contentHTML += `</div></div>`;
            }

            modalDesc.innerHTML = contentHTML;
            modal.classList.add('active');
        }
    });
});

// 閉じるボタン
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// モーダルの外側をクリックしても閉じる
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});


// --- Slider Logic ---
const sliders = {};

function initSlider(id) {
    sliders[id] = { index: 0 };
}

function moveSlide(id, direction) {
    if (!sliders[id]) initSlider(id);
    
    const wrapper = document.getElementById(id);
    const track = wrapper.querySelector('.slider-track');
    const slides = track.querySelectorAll('.slide-img');
    const totalSlides = slides.length;

    sliders[id].index += direction;

    if (sliders[id].index < 0) {
        sliders[id].index = totalSlides - 1;
    } else if (sliders[id].index >= totalSlides) {
        sliders[id].index = 0;
    }

    const offset = sliders[id].index * -100;
    track.style.transform = `translateX(${offset}%)`;
}

// --- Scroll Observer ---
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    const headerTitle = document.querySelector('header h1');
    if(headerTitle) {
        headerTitle.style.opacity = 0;
        setTimeout(() => {
            headerTitle.style.transition = 'opacity 1s';
            headerTitle.style.opacity = 1;
        }, 500);
    }

    // Init Canvas
    initCanvas();
    animateCanvas();
});

// --- Lightweight Canvas Logic (Optimized) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

// パーティクル数を少なめに固定（十分リッチに見えるが軽い数）
const particleCount = 60; 

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; // ゆっくり
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#00f3ff' : '#bc13fe'; 
        // 点滅用
        this.alpha = Math.random();
        this.alphaSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // 画面端で跳ね返り
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // ゆっくり点滅
        this.alpha += this.alphaSpeed;
        if(this.alpha > 1 || this.alpha < 0.2) {
            this.alphaSpeed *= -1;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha)); // 透明度適用
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1.0; // リセット
    }
}

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateCanvas() {
    // 背景クリア
    ctx.clearRect(0, 0, width, height);
    
    // ループ処理
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animateCanvas);
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initCanvas, 100);
});