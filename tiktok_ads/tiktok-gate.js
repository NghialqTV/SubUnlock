/* TikTok Ads - random 1/5 per task, then destination */
(function(){
  const ADS = Array.isArray(window.TIKTOK_AD_LINKS) ? window.TIKTOK_AD_LINKS.map(String).filter(u => /^https?:\/\//i.test(u)) : [];
  let queue=[];
  function refill(){ queue=ADS.slice(); for(let i=queue.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [queue[i],queue[j]]=[queue[j],queue[i]];} }
  function pick(){ if(!queue.length) refill(); return queue.shift(); }
  window.tiktokAdGate=function(destination){
    if(!destination) return false;
    if(!ADS.length){ location.assign(destination); return true; }
    const ad=pick();
    // Keep the popup creation directly inside the user's click event.
    // Then immediately continue to the destination in the current tab.
    try { window.open(ad,'_blank'); } catch(e) {}
    location.assign(destination);
    return true;
  };
})();
