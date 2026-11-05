
$(function () {

    // JSON 路徑：如果 HTML 在 ex_SPA 資料夾，改成 ../carousel.json
    const jsonPath = "../carousel.json";

    // 取得 Bootstrap Carousel 元素
    const carouselElement = document.querySelector("#workCarousel");

    // 1. 使用 AJAX 讀取 JSON
    $.getJSON(jsonPath, function (works) {

        // 2. 顯示指定分類的作品
        function showWork(category) {

            // 根據分類取得資料
            let selectedWork = works[category];

            // 如果沒有這個分類，或沒有圖片，就停止
            if (!selectedWork ||
                !Array.isArray(selectedWork.images) ||
                selectedWork.images.length === 0) {
                return;
            }

            // 3. 更新分類文字
            $("#work-title").text(selectedWork.title);
            $("#work-tech").text(selectedWork.tech);
            $("#work-description").text(selectedWork.description);

            // 4. 移除舊的 Bootstrap Carousel 實例
            let oldCarousel = bootstrap.Carousel.getInstance(carouselElement);

            if (oldCarousel) {
                oldCarousel.dispose();
            }

            // 5. 動態產生圖片
            let imagesHTML = "";

            selectedWork.images.forEach(function (image, index) {

                // 只有第一張圖片加上 active
                let activeClass = "";

                if (index === 0) {
                    activeClass = "active";
                }

                imagesHTML += `
                    <div class="carousel-item ${activeClass}">
                        <div class="work-slide">
                            <img class="d-block w-100"
                                 alt="作品圖片 ${index + 1}">
                        </div>
                    </div>
                `;
            });

            // 將產生的 HTML 放進 Carousel
            $("#workCarousel .carousel-inner").html(imagesHTML);

            // 逐張設定圖片來源
            $("#workCarousel .carousel-item img").each(function (index) {
                $(this).attr("src", selectedWork.images[index]);
                $(this).attr(
                    "alt",
                    selectedWork.title + " 圖片 " + (index + 1)
                );
            });

            // 6. 動態產生底部圓點
            let dotsHTML = "";

            selectedWork.images.forEach(function (image, index) {

                let activeClass = "";
                let currentAttribute = "";

                if (index === 0) {
                    activeClass = "active";
                    currentAttribute = 'aria-current="true"';
                }

                dotsHTML += `
                    <button type="button"
                            data-bs-target="#workCarousel"
                            data-bs-slide-to="${index}"
                            class="${activeClass}"
                            ${currentAttribute}
                            aria-label="圖片 ${index + 1}">
                    </button>
                `;
            });

            // 將圓點放進 HTML
            $("#workCarousel .carousel-indicators").html(dotsHTML);

            // 7. 重新啟用 Bootstrap Carousel
            new bootstrap.Carousel(carouselElement, {
                interval: false,
                ride: false
            });

            // 8. 如果只有一張圖，隱藏左右箭頭及圓點
            if (selectedWork.images.length === 1) {
                $("#workCarousel .carousel-control-prev").hide();
                $("#workCarousel .carousel-control-next").hide();
                $("#workCarousel .carousel-indicators").hide();
            } else {
                $("#workCarousel .carousel-control-prev").show();
                $("#workCarousel .carousel-control-next").show();
                $("#workCarousel .carousel-indicators").show();
            }

        }

        // 9. 點擊分類按鈕
        $("#s14 .work-btn").on("click", function () {

            // 取得 data-category
            let category = $(this).data("category");

            // 更新按鈕樣式
            $("#s14 .work-btn").removeClass("active");
            $(this).addClass("active");

            // 更新分類內容與圖片
            showWork(category);

        });

        // 10. 網頁載入時先顯示第一個分類
        showWork("interactive");

    }).fail(function () {

        console.error("Section 14：carousel.json 載入失敗");

        $("#work-description").text(
            "作品資料暫時無法載入，請稍後再試。"
        );

    });

});
