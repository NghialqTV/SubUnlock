/* Ads Gate - ad is triggered ONLY when the user presses "Xác nhận bước" */
(function(){
  'use strict';

  const ADS=Array.isArray(window.TIKTOK_AD_LINKS)
    ? window.TIKTOK_AD_LINKS.map(String).filter(u=>/^https?:\/\//i.test(u)) : [];

  let queue=[];
  function refill(){
    queue=ADS.slice();
    for(let i=queue.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [queue[i],queue[j]]=[queue[j],queue[i]];
    }
  }
  function pick(){if(!queue.length)refill();return queue.shift()||'';}

  // Open one random ad. Destination is intentionally NOT touched here.
  // This function is called directly from the "Xác nhận bước" button,
  // so the browser treats it as a user-initiated popup.
  window.tiktokAdGate=function(){
    if(!ADS.length)return false;
    const ad=pick();
    try{
      const popup=window.open(ad,'_blank','noopener,noreferrer');
      return !!popup;
    }catch(e){
      return false;
    }
  };
})();
