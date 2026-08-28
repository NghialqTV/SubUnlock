/* TikTok Ads Gate - stable mobile version */
(function(){
  'use strict';

  const ADS = Array.isArray(window.TIKTOK_AD_LINKS)
    ? window.TIKTOK_AD_LINKS.map(String).filter(u => /^https?:\/\//i.test(u))
    : [];

  let queue = [];

  function refill(){
    queue = ADS.slice();
    for(let i = queue.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
  }

  function pickAd(){
    if(!queue.length) refill();
    return queue.shift() || '';
  }

  window.tiktokAdGate = function(destination){
    if(!destination) return false;

    const ad = pickAd();

    // Không có quảng cáo: đi thẳng link đích.
    if(!ad){
      window.location.href = destination;
      return true;
    }

    let popup = null;

    // Tạo popup ngay trong chính thao tác click để giảm lỗi popup blocker.
    try {
      popup = window.open('about:blank', '_blank');
      if(popup){
        try { popup.opener = null; } catch(e) {}
        popup.location.href = ad;
      }
    } catch(e) {
      popup = null;
    }

    // Cho tab quảng cáo thời gian bắt đầu redirect, sau đó mới đi link đích.
    // Nếu popup bị chặn, vẫn chuyển link đích và không làm trang bị đơ.
    window.setTimeout(function(){
      try { window.location.href = destination; }
      catch(e) { window.location.assign(destination); }
    }, popup ? 1200 : 100);

    return true;
  };
})();
