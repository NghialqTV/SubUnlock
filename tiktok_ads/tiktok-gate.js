/* Task -> leave to task URL -> return -> open one random ad in a new tab */
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

  /*
   * New flow:
   * 1) User is sent directly to the YouTube task.
   * 2) The task page is left completely; no ad is opened first.
   * 3) When the user comes back with Back/forward navigation, app.js calls
   *    this function again and one random ad is opened.
   */
  window.tiktokAdGate=function(destination){
    if(!destination) return false;
    if(!ADS.length) return false;

    const ad=pick();
    let popup=null;

    try{
      popup=window.open('about:blank','_blank','noopener,noreferrer');
      if(popup){
        try{ popup.opener=null; }catch(e){}
        try{ popup.location.replace(ad); }catch(e){ popup.location.href=ad; }
      }
    }catch(e){ popup=null; }

    return !!popup;
  };
})();
