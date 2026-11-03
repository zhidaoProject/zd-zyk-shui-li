/*
 * @Author: ZHAO
 * @Date: 2026-06-17 12:46:51
 * @LastEditTime: 2026-11-03 08:42:01
 * @LastEditors: ZHAO
 * @Description: 
 * @FilePath: \zd-zyk-shui-li\src\utils\rem.ts
 * 
 */
// 自定义配置rem基数（UI设计稿为735px时，<html></html>的font-size为100px）

(function (doc, win) {
    var docEl = doc.documentElement,
        widthPoint = 375,
        resizeEvt =
            "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            // 归一化到 100% 缩放下等效的视口宽度，避免 ctrl+滚轮缩放时被 recalc 抵消，从而保留浏览器原生缩放
            var zoom = (win.outerWidth / win.innerWidth) || 1;
            var baseWidth = clientWidth * zoom;
            var fontSize = 100 * (baseWidth / widthPoint);
            if (baseWidth <= 1024) {
                // 小屏下桌面设计稿(1920px)会被 postcss-pxtorem+rem 等比压缩过小，
                // 这里提高 html font-size（用更窄基准）放大移动端内容，桌面端不受影响。
                if (baseWidth <= 768) {
                    // 手机：放大到约 1.5 倍
                    fontSize = Math.max(fontSize, 100 * (baseWidth / 100));
                } else {
                    // 平板：温和放大到约 1.25 倍
                    fontSize = Math.max(fontSize, 100 * (baseWidth / 200));
                }
            }
            docEl.style.fontSize = fontSize + "px";
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);

    docEl.addEventListener(
        "touchstart",
        function (event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        },
        false
    );
})(document, window);