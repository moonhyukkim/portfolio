document.addEventListener("DOMContentLoaded", () => {
    // 1) .reveal 클래스를 달아둔 모든 요소 수집
    const revealElements = document.querySelectorAll('.reveal');

    // 2) IntersectionObserver 생성
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 뷰포트 안에 들어오면
                    entry.target.classList.add('show');
                } else {
                    // 뷰포트 밖으로 나가면
                    entry.target.classList.remove('show');
                }
            });
        },
        // 옵션: threshold나 rootMargin 등 필요에 맞게 조정
        {
            threshold: 0.1
        }
    );

    // 3) 각 reveal 요소를 관찰
    revealElements.forEach((el) => {
        observer.observe(el);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // 배경 애니메이션 설정
    const canvas = document.getElementById("animated-bg");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let linesArray = [];

    class Line {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.length = Math.random() * 80 + 50;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }
        }
        draw() {
            ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length);
            ctx.stroke();
        }
    }

    function init() {
        linesArray = [];
        for (let i = 0; i < 40; i++) { // 선 개수를 조절해서 깔끔한 느낌 유지
            linesArray.push(new Line());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let line of linesArray) {
            line.update();
            line.draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();

    // 메뉴 토글
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // 윈도우 리사이징 시 캔버스 크기 조정
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
});

let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

// 네비게이션 바의 애니메이션 설정
navbar.style.transition = "transform 0.4s ease-in-out";

window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop) {
        // 아래로 스크롤 시 네비게이션 숨김 (부드러운 애니메이션 적용)
        navbar.style.transform = "translateY(-100%)";
    } else {
        // 위로 스크롤 시 네비게이션 보이기
        navbar.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTop;
});

function wrapLettersInSpan(node, delayIncrement = 0.05, indexObj = { val: 0 }) {
    // node.childNodes는 유사배열이고, 한 번에 변할 수 있으므로 Array.from으로 복사
    const childNodes = Array.from(node.childNodes);

    childNodes.forEach(child => {
        // 1) 텍스트 노드(Text Node)
        if (child.nodeType === Node.TEXT_NODE) {
            const text = child.nodeValue;
            const fragment = document.createDocumentFragment();

            // 글자 단위로 분할
            text.split("").forEach(char => {
                if (char === " ") {
                    // 공백 문자면 그냥 공백만 추가
                    fragment.appendChild(document.createTextNode(" "));
                } else {
                    // 글자인 경우 span 생성
                    const span = document.createElement("span");
                    span.textContent = char;

                    // 순차 지연 (원하면 생략 가능)
                    span.style.transitionDelay = `${indexObj.val * delayIncrement}s`;
                    indexObj.val++; // 전역 인덱스 증가

                    fragment.appendChild(span);
                }
            });

            // 원래 텍스트 노드를 fragment로 교체
            node.replaceChild(fragment, child);

            // 2) 요소 노드(Element Node)
        } else if (child.nodeType === Node.ELEMENT_NODE) {
            // 자식들에게도 동일하게 적용(재귀)
            wrapLettersInSpan(child, delayIncrement, indexObj);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // 1) .reveal-letters 요소 전부 찾기
    const letterElements = document.querySelectorAll('.reveal-letters');

    // 2) 각 요소에 대해 wrapLettersInSpan 실행
    letterElements.forEach(el => {
        wrapLettersInSpan(el);
        // 위 함수가 끝나면, 내부 텍스트 노드들이 전부 <span>단위로 감싸집니다.
        // <span class="thin">태그</span>나 <strong>태그</strong>는 그대로 보존.
    });

    // 3) IntersectionObserver로 뷰포트 진입/이탈 시 .show 토글
   /* const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, { threshold: 0.1 });*/
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('show');
              observer.unobserve(entry.target);  // 한 번 감지되면 더 이상 관찰하지 않음
          }
      });
  }, { threshold: 0.1 });
  

    letterElements.forEach(el => observer.observe(el));
});


document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.getElementById("career-timeline");
    const items = document.querySelectorAll(".timeline-item");
  
    // (A) 타임라인 전체 감지
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 들어올 때
            timeline.classList.add("active");
          } else {
            // 나갈 때
            timeline.classList.remove("active");
          }
        });
      },
      { threshold: 0.2 }
    );
    timelineObserver.observe(timeline);
  
    // (B) 각 아이템 감지 + 보이면 .show 추가, 안 보이면 .show 제거
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 나타나는 타이밍
            entry.target.classList.add("show");
          } else {
            // 다시 화면 밖으로 나가는 타이밍
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );
  
    items.forEach((item) => {
      itemObserver.observe(item);
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    // 1) .reveal 클래스를 달아둔 모든 요소 수집
    const revealElements = document.querySelectorAll('.reveal-left');
  
    // 2) IntersectionObserver 생성
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 뷰포트 안에 들어오면
            entry.target.classList.add('show');
          } else {
            // 뷰포트 밖으로 나가면
            entry.target.classList.remove('show');
          }
        });
      },
      // 옵션: threshold나 rootMargin 등 필요에 맞게 조정
      {
        threshold: 0.1
      }
    );
  
    // 3) 각 reveal 요소를 관찰
    revealElements.forEach((el) => {
      observer.observe(el);
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    // 1) .reveal 클래스를 달아둔 모든 요소 수집
    const revealElements = document.querySelectorAll('.reveal-right');
  
    // 2) IntersectionObserver 생성
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 뷰포트 안에 들어오면
            entry.target.classList.add('show');
          } else {
            // 뷰포트 밖으로 나가면
            entry.target.classList.remove('show');
          }
        });
      },
      // 옵션: threshold나 rootMargin 등 필요에 맞게 조정
      {
        threshold: 0.1
      }
    );
  
    // 3) 각 reveal 요소를 관찰
    revealElements.forEach((el) => {
      observer.observe(el);
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    let skills = document.querySelectorAll(".skill-fill");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let skill = entry.target;
                let percent = skill.getAttribute("data-percent");
                
                // 애니메이션 적용
                skill.style.width = percent + "%";
                
                let percentageText = skill.querySelector(".skill-percentage");
                percentageText.style.left = percent + "%";
                
                observer.unobserve(skill); // 한 번 실행되면 더 이상 감지하지 않음
            }
        });
    }, { threshold: 0.2 }); // 20% 이상 보이면 실행

    // 각 skill 요소를 감시 대상으로 추가
    skills.forEach(skill => observer.observe(skill));
});


/*window.addEventListener("scroll", function () {
    const section = document.querySelector(".scroll-section");
    const images = document.querySelector(".image-container");
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollBottom = window.scrollY + window.innerHeight; // 현재 스크롤 하단 위치

    // 🚀 수정된 스크롤 감지 로직
    if (scrollBottom >= sectionTop && window.scrollY <= sectionTop + sectionHeight) {

        // 🛠 스크롤 진행률을 섹션 전체 높이를 기준으로 계산
        const progress = (scrollBottom - sectionTop) / (sectionHeight + window.innerHeight);
        const moveX = progress * 200 - 100; // -100vw에서 100vw까지 이동

        images.style.transform = `translateX(${moveX}vw)`;
    }
});*/
document.addEventListener("DOMContentLoaded", function () {
    const projectNames = document.querySelectorAll(".projects-name");

    projectNames.forEach((project) => {
        const textElement = project.querySelector(".project-text");
        const imageElement = project.querySelector(".portfolio-item");

        if (textElement && imageElement) {
            // 텍스트에 마우스를 올리면 이미지 표시
            textElement.addEventListener("mouseenter", function () {
                imageElement.style.opacity = "1";
                imageElement.style.visibility = "visible";
                imageElement.style.pointerEvents = "auto";
            });

            // 부모 요소에서 마우스가 벗어나면 이미지 숨김
            project.addEventListener("mouseleave", function () {
                imageElement.style.opacity = "0";
                imageElement.style.pointerEvents = "none";
            });
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("target");
    const project = button.closest(".projects-name"); // 버튼이 포함된 부모 요소 찾기

    if (button && project) {
        // 마우스 오버 이벤트 발생
        setTimeout(() => {
        const event = new Event("mouseenter");
        button.dispatchEvent(event);
    }, 1500);
        // 2초 후에 부모 요소에 마우스 떠남 이벤트 발생
        setTimeout(() => {
            const leaveEvent = new Event("mouseleave");
            project.dispatchEvent(leaveEvent);
        }, 4000);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const fakeCursor = document.getElementById("fakeCursor");
    const targetElement = document.getElementById("target");
    const fixedContainer = document.querySelector(".fixed"); // Sticky 요소
    
    function moveCursorToTarget() {
        const targetRect = targetElement.getBoundingClientRect();
        const fixedRect = fixedContainer.getBoundingClientRect(); // .fixed의 위치
        
        const cursorSize = 20; // 가짜 커서 크기 반영
        
        // .fixed 내에서의 상대적 위치 계산
        const leftPos = targetRect.left - fixedRect.left + targetRect.width / 2 - cursorSize / 2;
        const topPos = targetRect.top - fixedRect.top + targetRect.height / 2 - cursorSize / 2;
        
        fakeCursor.style.left = `${leftPos + 200}px`; // 초기 위치 (오른쪽 100px)
        fakeCursor.style.top = `${topPos}px`;
        fakeCursor.style.opacity = "1";

        // 0.2초 후 타겟 위치로 이동
        setTimeout(() => {
            fakeCursor.style.left = `${leftPos}px`;
        }, 200);

        // 1.2초 후 원래 위치로 돌아가면서 페이드 아웃
        setTimeout(() => {
            fakeCursor.style.left = `${leftPos + 100}px`; // 다시 오른쪽으로 이동
            fakeCursor.style.opacity = "0";
        }, 3000);
    }

    // 50ms 후 커서 이동 시작
    setTimeout(moveCursorToTarget, 50);

    // 마우스 움직이면 가짜 커서 숨기기
    /*document.addEventListener("mousemove", () => {
        fakeCursor.style.display = "none";
        window.removeEventListener("scroll", moveCursorToTarget);
    });*/
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