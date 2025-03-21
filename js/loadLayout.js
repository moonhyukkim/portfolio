document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("index.html");
        if (!response.ok) throw new Error(`HTTP 오류! 상태: ${response.status}`);

        const data = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");

        // 네비게이션 삽입
        document.getElementById("header-container").innerHTML = doc.getElementById("navbar").innerHTML;

        // 푸터 삽입
        document.getElementById("footer-container").innerHTML = doc.getElementById("footer").innerHTML;

        // 공통 폰트 추가 (head에 삽입)
        const fonts = doc.getElementById("common-fonts")?.querySelectorAll("link");
        if (fonts) {
            fonts.forEach(font => {
                if (!document.querySelector(`link[href="${font.href}"]`)) {
                    document.head.appendChild(font.cloneNode(true)); // 중복 방지 후 삽입
                }
            });
        }

    } catch (error) {
        console.error("🚨 레이아웃 불러오기 오류:", error);
    }
});
