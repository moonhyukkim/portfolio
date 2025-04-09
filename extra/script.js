document.addEventListener("DOMContentLoaded", () => {
    // 탭 (chicken, kolpop, side, pizza, anju)
    let selectedTab = "chicken"; // 기본 탭
    
    // 부위 / 타입 / 메뉴
    // 아무것도 선택 안 했으면 => 그 탭의 모든 메뉴
    let selectedArea = "";
    let selectedType = "";
    let selectedMenu = "";
  
    // 요소
    const tabButtons = document.querySelectorAll(".tab-list li");
    const filterGroups = document.querySelectorAll(".filter-list");
    const menuItems = document.querySelectorAll(".menu-item");
    const filterContainer = document.querySelector(".filter-container"); // 필터 전체 래퍼
  
    // ─────────────────────────
    // (1) 탭 클릭: 토글 없이, 그냥 해당 탭으로 변경
    // ─────────────────────────
    tabButtons.forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
        // 만약 이미 active 탭을 다시 누르면, 토글 할지 말지는 기획에 따라
        // 여기서는 그냥 그대로 유지한다고 가정.
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabBtn.classList.add("active");
  
        selectedTab = tabBtn.getAttribute("data-tab");
        if (selectedTab === "chicken") {
          filterContainer.style.display = "block";
        } else {
          filterContainer.style.display = "none";
        }
        // 탭 바뀌면 필터도 전부 해제 (원한다면 유지도 가능)
        selectedArea = "";
        selectedType = "";
        selectedMenu = "";
  
        // 필터 버튼에서 .black 제거
        filterGroups.forEach((group) => {
          group.querySelectorAll("li").forEach((btn) => btn.classList.remove("black"));
        });
  
        applyFiltering();
      });
    });
  
    // ─────────────────────────
    // (2) 필터: 토글 구현 (한 그룹 당 하나만)
    // ─────────────────────────
    filterGroups.forEach((group) => {
      const filterItems = group.querySelectorAll("li");
      const filterGroupName = group.getAttribute("data-filter-group");
  
      filterItems.forEach((item) => {
        item.addEventListener("click", () => {
          const isActive = item.classList.contains("black");
          const category = item.getAttribute("data-category");
  
          if (isActive) {
            // 이미 active → 해제
            item.classList.remove("black");
            // 해당 그룹값을 ""로
            if (filterGroupName === "area") selectedArea = "";
            else if (filterGroupName === "type") selectedType = "";
            else if (filterGroupName === "menu") selectedMenu = "";
          } else {
            // 이 그룹 내 다른 버튼 해제
            filterItems.forEach((btn) => btn.classList.remove("black"));
            // 클릭된 것만 black
            item.classList.add("black");
            // 상태값 지정
            if (filterGroupName === "area") selectedArea = category;
            else if (filterGroupName === "type") selectedType = category;
            else if (filterGroupName === "menu") selectedMenu = category;
          }
  
          applyFiltering();
        });
      });
    });
  
    // ─────────────────────────
    // (3) 필터 적용 함수
    // ─────────────────────────
    function applyFiltering() {
      menuItems.forEach((item) => {
        const itemTab = item.getAttribute("data-tab");
        const itemArea = item.getAttribute("data-area");
        const itemType = item.getAttribute("data-type");
        const itemMenu = item.getAttribute("data-menu");
  
        // 탭 불일치 → 숨김
        if (itemTab !== selectedTab) {
          item.style.display = "none";
          return;
        }
        // 부위
        const matchArea = (selectedArea === "" || itemArea === selectedArea);
        // 타입
        const matchType = (selectedType === "" || itemType === selectedType);
        // 메뉴
        const matchMenu = (selectedMenu === "" || itemMenu === selectedMenu);
  
        if (matchArea && matchType && matchMenu) {
          // 모두 만족시 보이기
          item.style.display = "block";
        } else {
          // 하나라도 불만족이면 숨김
          item.style.display = "none";
        }
      });
    }
  
    // 초기 표시
    applyFiltering();
  });
  