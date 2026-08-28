/* TikTok Ads Gate - stable mobile flow */
(function(){
  'use strict';

  const ADS = Array.isArray(window.TIKTOK_AD_LINKS)
    ? window.TIKTOK_AD_LINKS.map(String).filter(u => /^https?:\/\//i.test(u))
    : [];

  let queue = [];
  function refill(){
    queue = ADS.slice();
    for(let i=queue.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [queue[i],queue[j]]=[queue[j],queue[i]];
    }
  }
  function pick(){
    if(!queue.length) refill();
    return queue.shift() || '';
  }

  window.tiktokAdGate=function(destination){
    if(!destination) return false;
    if(!ADS.length){ window.location.href=destination; return true; }

    const ad=pick();
    let popup=null;

    // Mở quảng cáo trong chính thao tác click. Trang nhiệm vụ vẫn giữ nguyên.
    try{
      popup=window.open('about:blank','_blank');
      if(popup){
        try{popup.opener=null;}catch(e){}
        popup.location.replace(ad);
      }
    }catch(e){ popup=null; }

    // Không được phép chặn trang nếu popup bị trình duyệt chặn.
    // Sau thời gian ngắn, tab nhiệm vụ đi tới link đích có sẵn trong data.js.
    window.setTimeout(function(){
      try{ window.location.href=destination; }
      catch(e){ window.location.assign(destination); }
    }, popup ? 1800 : 250);

    return true;
  };
})();
