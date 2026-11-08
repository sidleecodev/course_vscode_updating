
$(function () {

    // 儲存 AJAX 取得的作品資料
    let projects = [];

    // 目前選擇的分類
    let selectedTechnical = "全部";
    let selectedProduct = "全部";

    // 1. AJAX 讀取作品資料
    $.ajax({
        url: "JSON/index_content.json",
        method: "GET",
        dataType: "json",

        success: function (data) {
            projects = data.projects;
            filterProjects();
        },

        error: function () {
            $("#projects-result-count").text("");

            $("#projects-result").html(
                '<div class="projects-empty">資料載入失敗，請確認 JSON 路徑。</div>'
            );
        }
    });

    // 2. 將 category 統一轉成陣列
    function getCategories(item) {

        if (Array.isArray(item.category)) {
            return item.category;
        }

        if (item.category) {
            return [item.category];
        }

        return [];
    }

    // 3. 顯示搜尋結果
    function renderResults(list) {

        $("#projects-result").empty();

        $("#projects-result-count").text(
            `共 ${list.length} 筆`
        );

        // 沒有符合條件的資料
        if (list.length === 0) {

            $("#projects-result").html(
                '<div class="projects-empty">找不到符合條件的作品。</div>'
            );

            return;
        }

        // 逐筆產生作品卡片
        list.forEach(function (item) {

            let card = $('<div class="projects-result-card"></div>');

            // 作品名稱
            let title = $('<div class="projects-result-title"></div>');
            title.text(item.title);

            // 作品說明
            let note = $('<div class="projects-result-note"></div>');
            note.text(item.note || "尚無說明");

            // 技術標籤
            let tags = $('<div class="projects-tags"></div>');

            getCategories(item).forEach(function (category) {

                let tag = $('<span class="projects-tag"></span>');

                tag.text(category);
                tags.append(tag);
            });

            // 學習 / 作品標籤
            let productClass = $('<span class="projects-class"></span>');

            productClass.text(item.class);
            tags.append(productClass);

            // 加入標題、說明、標籤
            card.append(title, note, tags);

            // 作品連結
            if (item.url) {

                let link = $('<a class="projects-result-link"></a>');

                link.text("查看作品 ↗");

                link.attr("href", item.url);
                link.attr("target", "_blank");
                link.attr("rel", "noopener noreferrer");

                card.append(link);
            }

            // 加入搜尋結果
            $("#projects-result").append(card);
        });
    }

    // 4. 篩選作品
    function filterProjects() {

        let keyword = $("#projects-keyword")
            .val()
            .trim()
            .toLowerCase();

        let filtered = projects.filter(function (item) {

            let categories = getCategories(item);

            // 關鍵字搜尋模式
            if (keyword !== "") {

                let searchText = [
                    item.title || "",
                    item.note || "",
                    item.class || "",
                    ...categories
                ].join(" ").toLowerCase();

                return searchText.includes(keyword);
            }

            // 技術類別
            let matchTechnical =
                selectedTechnical === "全部" ||
                categories.includes(selectedTechnical);

            // 成品類別
            let matchProduct =
                selectedProduct === "全部" ||
                item.class === selectedProduct;

            return matchTechnical && matchProduct;
        });

        renderResults(filtered);
    }

    // 5. 重設分類按鈕
    function resetButtons() {

        $("#projects .projects-filter-btn")
            .removeClass("active");

        $("#projects-technical .projects-filter-btn")
            .first()
            .addClass("active");

        $("#projects-product .projects-filter-btn")
            .first()
            .addClass("active");
    }

    // 6. 關鍵字搜尋
    $("#projects-keyword").on("input", function () {

        // 搜尋時取消分類條件
        selectedTechnical = "全部";
        selectedProduct = "全部";

        resetButtons();
        filterProjects();
    });

    // 7. 技術分類按鈕
    $("#projects-technical .projects-filter-btn")
        .on("click", function () {

            selectedTechnical = $(this).attr("data-value");

            // 切換到分類模式，清空搜尋框
            $("#projects-keyword").val("");

            // 同組只能選一個
            $("#projects-technical .projects-filter-btn")
                .removeClass("active");

            $(this).addClass("active");

            filterProjects();
        });

    // 8. 成品分類按鈕
    $("#projects-product .projects-filter-btn")
        .on("click", function () {

            selectedProduct = $(this).attr("data-value");

            $("#projects-keyword").val("");

            $("#projects-product .projects-filter-btn")
                .removeClass("active");

            $(this).addClass("active");

            filterProjects();
        });

});
