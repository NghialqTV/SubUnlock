// Cấu hình các link mặc định dùng chung để tránh trùng lặp dữ liệu
const DEFAULT_SUB = "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg";
const DEFAULT_TELE = "https://t.me/+gI22PHmUi5xhMDA9";
const CYBER_MODS_URL = "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb";

const pages = {
  tainguyen: {
    like: "https://youtu.be/sdUtuButNfg?si=yZ4eMTnHJqiX_zJd",
    unlock: "https://gofile.io/d/dqDr1WCQ"
  },
  fps: {
    like: "https://youtu.be/DJgeoNOFq_E?si=OEHoTpMmK6oqS6Vc",
    unlock: "https://www.mediafire.com/file/o9mwxdr41y14bxi/120_FPS.zip/file"
  },
  filele: {
    like: "https://youtu.be/SEVLK6skI7c?si=6P1n-_OlCjuzBvTy",
    unlock: "https://nghialqtv.github.io/mod/file-le.html"
  },
  camxa: {
    like: "https://youtu.be/K5UU7sFOspo?si=6zcNrcNiXuYSyafH",
    unlock: "https://www.mediafire.com/file/9xihuxnqnqsyiwi/Cam_Xa_S3_2026.zip/file"
  },
  resources: {
    like: "https://youtu.be/tdlqZSzaXBg?si=1PFi3tHNT-H4QIv-",
    unlock: "https://www.mediafire.com/file/at85hnqx1toiqia/Resources.zip/file"
  },
  ipaios: {
    like: "https://youtu.be/3GFaSIbM9_w?si=Z0jrpcqVp3JVGOTl",
    unlock: "https://linkx.me/JwbO075"
  },
  hackmenuios: {
    like: "https://youtu.be/KFnaxVcAlIA?si=keZ9xkJkmr4RA8Wd",
    unlock: "https://linkx.me/V88pY"
  },
  modmenuios: {
    like: "https://youtu.be/KFnaxVcAlIA?si=keZ9xkJkmr4RA8Wd",
    unlock: "https://linkx.me/wMK5wG"
  },
  keymenuios: {
    like: "https://youtu.be/KFnaxVcAlIA?si=keZ9xkJkmr4RA8Wd",
    unlock: "https://ontops.link/47R3QNj"
  },
  keyandroidv2: {
    like: "https://youtu.be/GhRB8MCRWjg?si=aewIEDSygdFf6wA-",
    unlock: "https://vnmods.baby/GETKEY/trungnghia04"
  },
  hackv2goc: {
    like: "https://youtu.be/GhRB8MCRWjg?si=aewIEDSygdFf6wA-",
    unlock: "https://www.mediafire.com/file/6jqqmzrd6gnf2yx/LQMOD_1.64.1.7.apk/file"
  },
  hackv2tachgoc: {
    like: "https://youtu.be/GhRB8MCRWjg?si=aewIEDSygdFf6wA-",
    unlock: "https://www.mediafire.com/file/6jqqmzrd6gnf2yx/LQMOD_1.64.1.7.apk/file"
  },
  mod80skin2909: {
    like: "https://youtu.be/0f9CIvRB9NE?si=r30ihNMieLZM_Hva",
    unlock: "https://www.mediafire.com/file/15knju4gfarpvgf/Pack_80_Skin_By_Ngh%C4%A9alq_TV.zip/file"
  },
  mod123skin0110: {
    like: "https://youtu.be/w39vNVuMkik?si=JXfZbAl_33lc-ROF",
    unlock: "https://www.mediafire.com/file/arhvpwju2mvneik/Mod_Full_123_Skin_C%25C3%25B3_N%25C3%25BAt_By_Ngh%25C4%25A9a_Lq_TV.zip/file"
}
};

// Tự động gán link mặc định cho các trang không cấu hình riêng biệt sub/tele
Object.keys(pages).forEach(key => {
  if (!pages[key].sub) pages[key].sub = DEFAULT_SUB;
  if (!pages[key].tele) pages[key].tele = DEFAULT_TELE;
  if (!pages[key].cyberMods) pages[key].cyberMods = CYBER_MODS_URL;
});
