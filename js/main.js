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


let lastScrollTop = 0;
const navbar = document.querySelector(".navbar-pc");

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

let mobileLastScrollTop = 0;
const mobilenavbar = document.querySelector(".mobile-navbar");

// 네비게이션 바의 애니메이션 설정
mobilenavbar.style.transition = "transform 0.4s ease-in-out";

window.addEventListener("scroll", () => {
  // 음수 스크롤값 보정
  let scrollTop = Math.max(window.scrollY, 0);

  if (scrollTop === 0) {
      mobilenavbar.style.transform = "translateY(0)";
  } else if (scrollTop > mobileLastScrollTop) {
      mobilenavbar.style.transform = "translateY(-100%)";
  } else {
      mobilenavbar.style.transform = "translateY(0)";
  }
  
  mobileLastScrollTop = scrollTop;
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
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu   = document.getElementById("mobileMenu");
  const dimOverlay   = document.getElementById("dimOverlay");

  // 1) 햄버거 버튼 클릭 -> 메뉴와 딤 토글
  hamburgerBtn.addEventListener("click", function() {
    mobileMenu.classList.toggle("open");
    dimOverlay.classList.toggle("open");
  });

  // 2) 메뉴 링크 클릭 -> 메뉴와 딤 닫기
  const menuLinks = document.querySelectorAll(".mobile-menu-list a");
  menuLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      if (link.classList.contains('subnav-toggle')) {
        // '포트폴리오' 클릭이면 전체 메뉴 닫기 로직을 실행하지 않는다
        e.preventDefault();
        return;
      }
      // 나머지 a 태그는 메뉴 닫기
      mobileMenu.classList.remove("open");
      dimOverlay.classList.remove("open");
    });
  });

  // 3) 오버레이 자체를 클릭해도 닫게 하고 싶으면 (옵션)
  dimOverlay.addEventListener("click", function() {
    mobileMenu.classList.remove("open");
    dimOverlay.classList.remove("open");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const subnavToggles = document.querySelectorAll(".subnav-toggle");

  subnavToggles.forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault(); // '#' 링크 이동 막기
      
      const parentLi = this.parentElement; // <li class="has-subnav">
      const subnav   = parentLi.querySelector(".mobile-subnav");
      
      // 이미 .open인가?
      const isOpen = parentLi.classList.contains("open");

      if (!isOpen) {
        // [열려있지 않을 때: "열기" 애니메이션]
        
        // 1) 먼저 display를 block으로 바꿔야 높이 측정 가능
        subnav.style.display = "block";
        // 2) 트랜지션 설정
        subnav.style.transition = "height 0.3s ease"; 
        // 3) 처음 height: 0 → 강제로 0으로 만들고 reflow
        subnav.style.height = "0";
        subnav.offsetHeight; // 강제 리플로우(forced reflow)
        // 4) 실제 높이(px)로 변경
        const targetHeight = subnav.scrollHeight + "px";
        subnav.style.height = targetHeight;
        
        // 5) .open 클래스 부여 (화살표 회전 등)
        parentLi.classList.add("open");

        // 6) transition 끝난 뒤에 height:auto로 고정
        subnav.addEventListener("transitionend", function onEnd() {
          // transition 이벤트가 여러 번 일어나지 않도록 remove
          subnav.removeEventListener("transitionend", onEnd);
          // 최종적으로 auto로 설정하면 내용 변경에도 자연스럽게 대응
          subnav.style.height = "auto";
        });

      } else {
        // [열려 있을 때: "닫기" 애니메이션]
        
        // 1) 현재 높이를 가져와서 고정
        const currentHeight = subnav.scrollHeight + "px";
        subnav.style.height = currentHeight;
        // display가 block 상태일 것이므로 그대로 둔다
        
        // 2) reflow 후 height=0으로 트랜지션
        subnav.offsetHeight; // 강제 리플로우
        subnav.style.transition = "height 0.3s ease";
        subnav.style.height = "0";

        // 3) .open 클래스 제거
        parentLi.classList.remove("open");

        // 4) transition 끝난 뒤에 display:none으로 완전히 숨김
        subnav.addEventListener("transitionend", function onEnd() {
          subnav.removeEventListener("transitionend", onEnd);
          subnav.style.display = "none";
          // height도 0으로 초기화해두면 다음 열림 때 다시 0 → scrollHeight
          subnav.style.height = "0";
        });
      }
    });
  });
});
