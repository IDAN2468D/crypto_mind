'use client';

import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (container.current && !container.current.querySelector("script")) {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BINANCE:BTCUSDT",
          "interval": "D",
          "timezone": "Asia/Jerusalem",
          "theme": "dark",
          "style": "1",
          "locale": "he_IL",
          "enable_publishing": false,
          "backgroundColor": "rgba(10, 14, 23, 1)",
          "gridColor": "rgba(34, 211, 238, 0.05)",
          "hide_top_toolbar": false,
          "hide_legend": false,
          "save_image": false,
          "calendar": false,
          "hide_volume": false,
          "support_host": "https://www.tradingview.com"
        }`;
            container.current.appendChild(script);
        }
    }, []);

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
            <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
            <div className="tradingview-widget-copyright">
                <a href="https://il.tradingview.com/" rel="noopener nofollow" target="_blank">
                    <span className="blue-text">עקוב אחר כל השווקים</span>
                </a> ב-TradingView
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);
