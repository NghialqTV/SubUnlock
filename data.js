// Cấu hình các link mặc định dùng chung để tránh trùng lặp dữ liệu
const DEFAULT_SUB = "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg";
const DEFAULT_TELE = "https://t.me/+gI22PHmUi5xhMDA9";
const CYBER_MODS_URL = "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb";

const pages = {
  tainguyen: {
    like: "https://youtu.be/bPZSoST8WKI?si=kaLP0oWHq7P8WyKD",
    unlock: "https://gofile.io/d/dqDr1WCQ"
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
    like: "https://youtu.be/tdlqZSzaXBg?si=CjB_4CLeuqUcV9bU",
    unlock: "https://www.mediafire.com/file/at85hnqx1toiqia/Resources.zip/file"
  },
  keymapios: {
    like: "https://youtu.be/KFnaxVcAlIA?si=keZ9xkJkmr4RA8Wd",
    unlock: "https://ontops.link/Gw8QLm2"
  },
  ipaios: {
    like: "https://youtu.be/3GFaSIbM9_w?si=Z0jrpcqVp3JVGOTl",
    unlock: "https://linkx.me/JwbO075"
  },
  hackmenuios: {
    like: "https://youtu.be/KFnaxVcAlIA?si=keZ9xkJkmr4RA8Wd",
    unlock: "https://linkx.me/9iCXUM"
  },
  modmenuios: {
    like: "https://youtu.be/KFnaxVcAlIA?si=keZ9xkJkmr4RA8Wd",
    unlock: "https://linkx.me/r20x0l"
  },
  keymenuios: {
    like: "https://youtu.be/KFnaxVcAlIA?si=keZ9xkJkmr4RA8Wd",
    unlock: "https://ontops.link/mOQ7cz2"
  },
};

// Tự động gán link mặc định cho các trang không cấu hình riêng biệt sub/tele
Object.keys(pages).forEach(key => {
  if (!pages[key].sub) pages[key].sub = DEFAULT_SUB;
  if (!pages[key].tele) pages[key].tele = DEFAULT_TELE;
  if (!pages[key].cyberMods) pages[key].cyberMods = CYBER_MODS_URL;
});
