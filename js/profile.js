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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  }, { threshold: 0.1 });

  letterElements.forEach(el => observer.observe(el));
});

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