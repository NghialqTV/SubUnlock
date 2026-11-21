/* Load optional sharded data; fall back to legacy data.js if no manifest exists. */
(async function () {
  try {
    const response = await fetch('data/manifest.json?v=' + Date.now(), {cache:'no-store'});
    if (response.ok) {
      const manifest = await response.json();
      if (!Array.isArray(manifest.files) || manifest.files.length > 2000) throw Error('Invalid manifest');
      const parts = await Promise.all(manifest.files.map(async filename => {
        if (!/^part-[0-9]{5}\.json$/.test(filename)) throw Error('Invalid part filename');
        const r=await fetch('data/'+filename+'?v='+encodeURIComponent(manifest.version || ''),{cache:'no-store'});
        if (!r.ok) throw Error('Cannot load '+filename);
        return r.json();
      }));
      const merged=Object.create(null);
      for (const part of parts) {
        if (!part || typeof part!=='object' || Array.isArray(part)) throw Error('Invalid part');
        for(const [id,value] of Object.entries(part)) {
          if(Object.prototype.hasOwnProperty.call(merged,id)) throw Error('Duplicate ID '+id);
          merged[id]=value;
        }
      }
      if(Object.keys(merged).length!==manifest.count) throw Error('Incomplete dataset');
      window.__subunlockManifestVersion=String(manifest.version||'');
      pages=merged;
    }
  } catch(e) { console.error('Data shards could not be loaded. Using legacy fallback.',e); }
  const script=document.createElement('script');
  script.src=document.body.dataset.adminPage==='yes'?'admin.js?v=shards-v3':'app.js?v=shards-v3';
  document.body.appendChild(script);
})();
