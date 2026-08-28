/* TikTok Ads - one random ad per user action, then destination */
(function(){
  const ADS = Array.isArray(window.TIKTOK_AD_LINKS)
    ? window.TIKTOK_AD_LINKS.filter(u => /^https?:\/\//i.test(String(u)))
    : [];
  const WAIT_MS = 1800;
  let queue = [];
  let busy = false;

  function refillQueue(){
    queue = ADS.slice();
    for(let i = queue.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
  }

  function pick(){
    if(!queue.length) refillQueue();
    return queue.shift();
  }

  window.tiktokAdGate = function(destination){
    if(!destination || busy) return false;

    if(!ADS.length){
      window.location.assign(destination);
      return false;
    }

    busy = true;
    const ad = pick();
    let adWindow = null;

    try {
      adWindow = window.open(ad, "_blank", "noopener,noreferrer");
    } catch(e) {}

    setTimeout(function(){
      busy = false;
      window.location.assign(destination);
    }, adWindow ? WAIT_MS : 0);

    return true;
  };
})();
