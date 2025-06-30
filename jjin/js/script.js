

document.addEventListener("DOMContentLoaded", function() {
        const sheet = document.getElementById('sheet');
        let startY = 0;
        let startTime = 0;
        let startTranslateY = 0;
        let currentTranslateY = 250;
        const minTranslateY = 0;
        const maxTranslateY = 250;
        const velocityThreshold = 0.5; // px/ms
        let dragging = false;
        const backgroundButtons = document.getElementById('backgroundButtons');
        const showThreshold = 150; // 시트를 얼마나 내려야 버튼이 나타날지 기준
        const container = document.querySelector('.container-mo');

        function updateBackgroundButtonVisibility() {
            if (currentTranslateY > showThreshold) {
                backgroundButtons.classList.add('show');
            } else {
                backgroundButtons.classList.remove('show');
            }
        }

        function isButton(target) {
            return target.closest('.content button');
        }

        function startDrag(y, target) {
            if (isButton(target)) return;
            dragging = true;
            startY = y;
            startTime = Date.now();
            const matrix = window.getComputedStyle(sheet).transform;
            if (matrix !== 'none') {
                const match = matrix.match(/matrix.*\((.+)\)/);
                if (match) {
                    const values = match[1].split(', ');
                    startTranslateY = parseFloat(values[5]);
                }
            } else {
                startTranslateY = 0;
            }
            sheet.classList.add('dragging');
        }
        // doDrag과 stopDrag 안에서 호출
        function doDrag(y) {
            if (!dragging) return;
            const delta = y - startY;
            let newY = startTranslateY + delta;
            newY = Math.min(maxTranslateY, Math.max(minTranslateY, newY));
            currentTranslateY = newY;
            sheet.style.transform = `translateY(${newY}px)`;
            updateBackgroundButtonVisibility(); // 버튼 상태 갱신
        }

        function stopDrag() {
            if (!dragging) return;
            dragging = false;
            sheet.classList.remove('dragging');

            const endY = currentTranslateY;
            const endTime = Date.now();
            const distance = endY - startTranslateY;
            const time = endTime - startTime;
            const speed = distance / time;

            if (Math.abs(speed) > velocityThreshold) {
                currentTranslateY = speed > 0 ? maxTranslateY : minTranslateY;
            } else {
                currentTranslateY = currentTranslateY > maxTranslateY / 2 ? maxTranslateY : minTranslateY;
            }

            sheet.style.transition = 'transform 0.25s ease';
            sheet.style.transform = `translateY(${currentTranslateY}px)`;
            updateBackgroundButtonVisibility(); // 최종 위치에서도 상태 갱신
        }
        // Mouse
        sheet.addEventListener('mousedown', e => startDrag(e.clientY, e.target));
        window.addEventListener('mousemove', e => doDrag(e.clientY));
        window.addEventListener('mouseup', stopDrag);

        // Touch
        sheet.addEventListener('touchstart', e => startDrag(e.touches[0].clientY, e.target));
        window.addEventListener('touchmove', e => doDrag(e.touches[0].clientY));
        window.addEventListener('touchend', stopDrag);

        updateBackgroundButtonVisibility();
        // 1초 뒤 자동으로 시트를 위로 올리기
        setTimeout(() => {
            currentTranslateY = 0;
            sheet.style.transition = 'transform 0.8s ease';
            sheet.style.transform = `translateY(${currentTranslateY}px)`;
            updateBackgroundButtonVisibility(); // 상태 업데이트
        }, 500);

        setTimeout(() => {
            container.style.transform = 'scale(1)';
        }, 100); // 약간 딜레이 줘야 트랜지션 발동 확실
    });
