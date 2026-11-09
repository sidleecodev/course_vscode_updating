
$(function () {

    // ========================================
    // 1. 設定檔案路徑
    // ========================================

    // 如果頁面是 ex_SPA/portfolio.html，使用 "../"
    // 如果頁面是根目錄 index.html，改成 "./"
    const rootPath = "../JSON/";

    const jsonPath = rootPath + "carousel.json";

    const carouselElement = document.querySelector("#workCarousel");

    // 把 JSON 的相對路徑轉成可使用的網址
    function getUrl(path) {

        if (!path) {
            return "";
        }

        // 完整網址直接使用，例如 https://...
        if (/^https?:\/\//i.test(path)) {
            return path;
        }

        // 專案內的檔案補上根目錄相對路徑
        return rootPath + path.replace(/^\.?\//, "");
    }

    // ========================================
    // 2. 影片播放與暫停
    // ========================================

    // 暫停這組 Carousel 中的所有影片
    function pauseVideos() {

        $("#workCarousel video").each(function () {
            this.pause();
        });

    }

    // 如果目前輪播項目是影片，就播放
    function playActiveVideo() {

        pauseVideos();

        let video = document.querySelector(
            "#workCarousel .carousel-item.active video"
        );

        // 如果目前不是影片，就不需要處理
        if (!video) {
            return;
        }

        video.muted = true;

        // 從影片開頭播放
        video.currentTime = 0;

        // 自動播放
        let playPromise = video.play();

        // 如果瀏覽器拒絕播放，避免 Console 出現未處理錯誤
        if (playPromise !== undefined) {
            playPromise.catch(function () {
                console.log("瀏覽器未允許影片自動播放");
            });
        }

    }

    // Carousel 開始切換時，先暫停影片
    carouselElement.addEventListener(
        "slide.bs.carousel",
        function () {
            pauseVideos();
        }
    );

    // Carousel 切換完成後，檢查是否需要播放影片
    carouselElement.addEventListener(
        "slid.bs.carousel",
        function () {
            playActiveVideo();
        }
    );

    // ========================================
    // 3. 使用 AJAX 讀取 JSON
    // ========================================

    $.getJSON(jsonPath, function (works) {

        // ========================================
        // 4. 建立作品連結
        // ========================================

        function showLinks(selectedWork) {

            let linksBox = $("#s14 .work-links");

            // 先清除上一個分類的連結
            linksBox.empty();

            let url = selectedWork.url || "";
            let contrast = selectedWork.contrast || "";

            // 建立一顆連結按鈕
            function addLink(path, label, icon, style) {

                let link = $("<a></a>");

                link.addClass("work-link");
                link.addClass(style);

                link.attr("href", getUrl(path));
                link.attr("target", "_blank");
                link.attr("rel", "noopener noreferrer");

                // Font Awesome 圖示
                let iconElement = $("<i></i>");
                iconElement.addClass("fa-solid " + icon);
                iconElement.attr("aria-hidden", "true");

                link.append(iconElement);
                link.append(document.createTextNode(label));

                linksBox.append(link);

            }

            // 有 AI 修飾版本
            if (contrast !== "") {

                if (url !== "") {
                    addLink(
                        url,
                        "原始稿",
                        "fa-pen-to-square",
                        "work-link-original"
                    );
                }

                addLink(
                    contrast,
                    "AI 修飾",
                    "fa-wand-magic-sparkles",
                    "work-link-ai"
                );

            } else if (url !== "") {

                // 沒有 AI 對照，只有一般作品連結
                addLink(
                    url,
                    "查看作品",
                    "fa-arrow-up-right-from-square",
                    "work-link-original"
                );

            }

        }

        // ========================================
        // 5. 顯示指定分類
        // ========================================

        function showWork(category) {

            let selectedWork = works[category];

            // 確認分類與媒體資料存在
            if (!selectedWork ||
                !Array.isArray(selectedWork.media) ||
                selectedWork.media.length === 0) {

                console.warn("找不到作品資料：" + category);
                return false;
            }

            // 更新分類文字
            $("#work-title").text(selectedWork.title);
            $("#work-tech").text(selectedWork.tech);
            $("#work-description").text(selectedWork.description);

            // 更新作品連結
            showLinks(selectedWork);

            // ====================================
            // 6. 清除舊的 Carousel
            // ====================================

            // 停止所有影片
            pauseVideos();

            // 取得目前 Bootstrap Carousel 實例
            let oldCarousel = bootstrap.Carousel.getInstance(
                carouselElement
            );

            // 如果存在就移除實例
            if (oldCarousel) {
                oldCarousel.dispose();
            }

            // 清空原本的圖片和圓點
            let carouselInner = $("#workCarousel .carousel-inner");
            let indicators = $("#workCarousel .carousel-indicators");

            carouselInner.empty();
            indicators.empty();

            // ====================================
            // 7. forEach 動態建立圖片或影片
            // ====================================

            selectedWork.media.forEach(function (item, index) {

                // 建立 carousel-item
                let carouselItem = $('<div class="carousel-item"></div>');

                // 第一張圖片或影片加上 active
                if (index === 0) {
                    carouselItem.addClass("active");
                }

                // 建立圖片／影片容器
                let workSlide = $('<div class="work-slide"></div>');

                // 判斷媒體類型
                if (item.type === "image") {

                    // 建立圖片
                    let img = $("<img>");

                    img.addClass("d-block w-100");
                    img.attr("src", getUrl(item.src));
                    img.attr(
                        "alt",
                        selectedWork.title + " 圖片 " + (index + 1)
                    );

                    workSlide.append(img);

                } else if (item.type === "video") {

                    // 建立影片
                    let video = $("<video></video>");

                    video.attr("src", getUrl(item.src));
                    video.attr("preload", "metadata");
                    video.attr("muted", "");
                    video.attr("loop", "");
                    video.attr("playsinline", "");

                    video.prop("muted", true);
                    video.prop("loop", true);

                    // 不加 controls，維持 GIF 風格的展示
                    workSlide.append(video);

                }

                carouselItem.append(workSlide);
                carouselInner.append(carouselItem);

                // ====================================
                // 8. forEach 同時建立圓點
                // ====================================

                let dot = $("<button></button>");

                dot.attr("type", "button");
                dot.attr("data-bs-target", "#workCarousel");
                dot.attr("data-bs-slide-to", index);
                dot.attr("aria-label", "第 " + (index + 1) + " 張");

                if (index === 0) {
                    dot.addClass("active");
                    dot.attr("aria-current", "true");
                }

                indicators.append(dot);

            });

            // ====================================
            // 9. 重新啟用 Bootstrap Carousel
            // ====================================

            new bootstrap.Carousel(carouselElement, {
                interval: false,
                ride: false
            });

            // 如果只有一個項目，隱藏控制按鈕
            if (selectedWork.media.length === 1) {

                $("#workCarousel .carousel-control-prev").hide();
                $("#workCarousel .carousel-control-next").hide();
                indicators.hide();

            } else {

                $("#workCarousel .carousel-control-prev").show();
                $("#workCarousel .carousel-control-next").show();
                indicators.show();

            }

            // 如果第一個項目是影片，立即播放
            playActiveVideo();

            return true;
        }

        // ========================================
        // 10. 點擊分類按鈕
        // ========================================

        $("#s14 .work-btn").on("click", function () {

            // 取得分類名稱
            let category = $(this).data("category");

            // 更新輪播與分類資料
            if (!showWork(category)) {
                return;
            }

            // 更新按鈕的 active 樣式
            $("#s14 .work-btn").removeClass("active");
            $(this).addClass("active");

        });

        // ========================================
        // 11. 首次載入
        // ========================================

        showWork("interactive");

    }).fail(function () {

        console.error("Section 14：carousel.json 載入失敗");

        $("#work-description").text(
            "作品資料載入失敗，請檢查 JSON 路徑。"
        );

    });

});
