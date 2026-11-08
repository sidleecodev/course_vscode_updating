
$(function () {

    // 1. AJAX 取得 Footer 連結資料
    $.ajax({
        url: "JSON/footer_links.json",
        method: "GET",
        dataType: "json",

        success: function (data) {

            // 三個欄位分別顯示
            renderFooterLinks("#footer-contact", data.contact);
            renderFooterLinks("#footer-interview", data.interview);
            renderFooterLinks("#footer-social", data.social);
        },

        error: function () {

            console.error("Footer 連結資料載入失敗");

            $(".portfolio-footer .footer-links").text(
                "連結資料暫時無法載入"
            );
        }
    });


    // 2. 產生每個欄位的連結
    function renderFooterLinks(container, items) {

        let target = $(container);
        target.empty();

        if (!Array.isArray(items)) {
            return;
        }

        items.forEach(function (item) {

            let url = (item.url || "").trim();

            // 只允許一般網址、電話與 Email 連結
            let isValidUrl =
                /^https?:\/\//i.test(url) ||
                /^mailto:/i.test(url) ||
                /^tel:/i.test(url);

            let element;

            // 有網址就建立 a，沒有網址就顯示普通資訊
            if (isValidUrl) {

                element = $("<a></a>");

                element.attr("href", url);

                // 一般網站使用新分頁開啟
                if (/^https?:\/\//i.test(url)) {
                    element.attr("target", "_blank");
                    element.attr("rel", "noopener noreferrer");
                }

            } else {

                element = $("<div></div>");
                element.addClass("footer-link-static");
            }

            element.addClass("footer-link");

            // Font Awesome 圖示
            let icon = $("<i></i>");

            let iconClasses = (item.icon || "").split(" ");

            icon.addClass(
                iconClasses.filter(function (name) {
                    return /^fa-[a-z0-9-]+$/.test(name);
                }).join(" ")
            );

            icon.attr("aria-hidden", "true");

            // 連結文字
            let label = $("<span></span>");
            label.text(item.label || "");

            element.append(icon, label);

            // 可點擊連結才加入箭頭
            if (isValidUrl) {

                let arrow = $("<i></i>");

                arrow.addClass(
                    "fa-solid fa-arrow-up-right-from-square footer-link-arrow"
                );

                arrow.attr("aria-hidden", "true");

                element.append(arrow);
            }

            target.append(element);
        });
    }

});
