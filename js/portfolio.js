document.addEventListener("DOMContentLoaded", function () {
    let currentSteps = [1, 2, 3, 4]; // 현재 단계
    let progressFills = [
        document.getElementById("progress-fill-1"),
        document.getElementById("progress-fill-2"),
        document.getElementById("progress-fill-3"),
        document.getElementById("progress-fill-4")
    ];
    let stepContainers = document.querySelectorAll(".steps");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let index = Array.from(stepContainers).indexOf(entry.target);
                if (index === -1) return;

                let stepsContainer = stepContainers[index];
                let steps = stepsContainer.querySelectorAll(".step");
                let currentStep = currentSteps[index];
                let progressFill = progressFills[index];

                let totalSteps = steps.length - 1;
                let prevPercent = ((currentStep - 2) / totalSteps) * 100;
                let currPercent = ((currentStep - 1) / totalSteps) * 100;

                // 초기 상태: 이전 단계까지 채운 상태로 설정
                progressFill.style.transition = "none";
                progressFill.style.width = Math.max(prevPercent, 0) + "%";

                // 짧은 지연 후 애니메이션으로 현재 단계까지 채움
                setTimeout(() => {
                    progressFill.style.transition = "width 1.0s ease-in-out";
                    progressFill.style.width = currPercent + "%";
                }, 100);

                // step 상태 업데이트
                steps.forEach((step, stepIndex) => {
                    step.classList.remove("active", "completed");
                    if (stepIndex < currentStep - 1) {
                        step.classList.add("completed");
                    }
                    if (stepIndex === currentStep - 1) {
                        step.classList.add("active");
                    }
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    stepContainers.forEach(container => observer.observe(container));
});


document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".slider-1 img");
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove("active"); // 현재 이미지 숨기기
        currentIndex = (currentIndex + 1) % images.length; // 다음 이미지로 변경
        images[currentIndex].classList.add("active"); // 새 이미지 표시
    }

    images[currentIndex].classList.add("active"); // 첫 번째 이미지 활성화
    setInterval(showNextImage, 3000); // 3초마다 이미지 변경
});

document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".slider-2 img");
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove("active"); // 현재 이미지 숨기기
        currentIndex = (currentIndex + 1) % images.length; // 다음 이미지로 변경
        images[currentIndex].classList.add("active"); // 새 이미지 표시
    }

    images[currentIndex].classList.add("active"); // 첫 번째 이미지 활성화
    setInterval(showNextImage, 3000); // 3초마다 이미지 변경
});

document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".slider-3 img");
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove("active"); // 현재 이미지 숨기기
        currentIndex = (currentIndex + 1) % images.length; // 다음 이미지로 변경
        images[currentIndex].classList.add("active"); // 새 이미지 표시
    }

    images[currentIndex].classList.add("active"); // 첫 번째 이미지 활성화
    setInterval(showNextImage, 3000); // 3초마다 이미지 변경
});

document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".slider-4 img");
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove("active"); // 현재 이미지 숨기기
        currentIndex = (currentIndex + 1) % images.length; // 다음 이미지로 변경
        images[currentIndex].classList.add("active"); // 새 이미지 표시
    }

    images[currentIndex].classList.add("active"); // 첫 번째 이미지 활성화
    setInterval(showNextImage, 3000); // 3초마다 이미지 변경
});
document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll(".main-page");
    let currentIndex = 0;
  
    function showNextImage() {
        images[currentIndex].classList.remove("active"); // 현재 이미지 숨기기
        currentIndex = (currentIndex + 1) % images.length; // 다음 이미지로 변경
        images[currentIndex].classList.add("active"); // 새 이미지 표시
    }
  
    images[currentIndex].classList.add("active"); // 첫 번째 이미지 활성화
    setInterval(showNextImage, 3000); // 3초마다 이미지 변경
  });
var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

