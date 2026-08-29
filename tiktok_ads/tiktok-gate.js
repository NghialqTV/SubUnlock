/* Ads Gate - mobile stable flow */
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

  window.tiktokAdGate=function(destination){
    if(!destination)return false;
    if(!ADS.length){window.location.assign(destination);return true;}

    const ad=pick();
    let popup=null;
    try{
      // Popup is opened directly from the user's click so Chrome is less likely to block it.
      popup=window.open(ad,'_blank','noopener,noreferrer');
    }catch(e){popup=null;}

    // Never open another tab for the destination. The current task tab becomes YouTube/Telegram.
    // This avoids the old flow where both the ad and destination competed for new tabs.
    window.setTimeout(function(){
      try{window.location.assign(destination);}catch(e){window.location.href=destination;}
    },1200);

    return true;
  };
})();
