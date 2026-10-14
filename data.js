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
    like: "https://youtu.be/PyNe0MWbMD8?si=SymxvVculx1VKV1h",
    unlock: "https://www.mediafire.com/file/pd0c9vpqi6rnbp0/Mod_120_FPS_Cao.zip/file"
  },
  mapiosv2: {
    like: "https://youtu.be/g6l0BEjJTV4?si=eFQ51hYwBW7E7ylJ",
    unlock: "https://testflight.apple.com/join/cfzYVv6g"
  },
  keymapiosv2: {
    like: "https://youtu.be/PyNe0MWbMD8?si=SymxvVculx1VKV1h",
    unlock: "https://ontops.link/BQu4wTn"
  },
  filele: {
    like: "https://youtu.be/Q1ILAP3DRMg?si=zPHrkH6nZW_aETZl",
    unlock: "https://nghialqtv.github.io/mod/file-le.html"
  },
  maphok: {
    like: "https://youtu.be/x4sYExej7dM?si=GsI4iPQ-VlJTetfT",
    unlock: "https://www.mediafire.com/file/atujehe5utxbmct/Mod_Map_Hok_Android_-_IOS.zip/file"
  },
  camxa: {
    like: "https://youtu.be/3RBcbwpJ3Ww?si=bMCamclQDxF6h5vZ",
    unlock: "https://www.mediafire.com/file/hffqcjyyvmzjj2s/Mod_Camera_Si%25C3%25AAu_Xa_LQ_S4.zip/file"
  },
  resources: {
    like: "https://youtu.be/tdlqZSzaXBg?si=gnJamB50NroBQkvG",
    unlock: "https://www.mediafire.com/file/at85hnqx1toiqia/Resources.zip/file"
  },
  ipaios: {
    like: "https://youtu.be/g6l0BEjJTV4?si=iJlqj7qdH6_Wvcur",
    unlock: "https://linkx.me/w4gC"
  },
  hackmenuios: {
    like: "https://youtu.be/9OC9VAh11i4?si=NPuX6jLZ8qTIZ9U6",
    unlock: "https://linkx.me/V88pY"
  },
  modmenuios: {
    like: "https://youtu.be/9OC9VAh11i4?si=NPuX6jLZ8qTIZ9U6",
    unlock: "https://linkx.me/wMK5wG"
  },
  keymenuios: {
    like: "https://youtu.be/9OC9VAh11i4?si=NPuX6jLZ8qTIZ9U6",
    unlock: "https://ontops.link/47R3QNj"
  },
  keyandroidv2: {
    like: "https://youtu.be/Q1ILAP3DRMg?si=K2e_fLRmdb92Muam",
    unlock: "https://www.vnmods.baby/GETKEY/trungnghia04"
  },
  hackv2goc: {
    like: "https://youtu.be/Q1ILAP3DRMg?si=K2e_fLRmdb92Muam",
    unlock: "https://www.mediafire.com/file/6jqqmzrd6gnf2yx/LQMOD_1.64.1.7.apk/file"
  },
  hackv2tachgoc: {
    like: "https://youtu.be/Q1ILAP3DRMg?si=K2e_fLRmdb92Muam",
    unlock: "https://www.mediafire.com/file/6jqqmzrd6gnf2yx/LQMOD_1.64.1.7.apk/file"
  },
  mod80skin2909: {
    like: "https://youtu.be/0f9CIvRB9NE?si=r30ihNMieLZM_Hva",
    unlock: "https://www.mediafire.com/file/15knju4gfarpvgf/Pack_80_Skin_By_Ngh%C4%A9alq_TV.zip/file"
  },
  mod35skin0310: {
    like: "https://youtu.be/Bwq63hPUVLE?si=FHznGoDCbDwJ2Jyg",
    unlock: "https://www.mediafire.com/file/51lnbiw9muxa1s0/%255B_Nut_-_TBH_%255D_Pack_35_Skin_Full_HD_By_Ngh%25C4%25A9alq_TV.zip/file"
  },
  modskinhok: {
    like: "https://youtu.be/g4YE8c3IMIg?si=6w-i4Vj7Q-wXUpiV",
    unlock: "https://nghialqtv.github.io/file-le.html"
  },
  mod123skin0610: {
    like: "https://youtu.be/w39vNVuMkik?si=JXfZbAl_33lc-ROF",
    unlock: "https://www.mediafire.com/file/arhvpwju2mvneik/Mod_Full_123_Skin_C%25C3%25B3_N%25C3%25BAt_By_Ngh%25C4%25A9a_Lq_TV.zip/file"
},
  mod56skin0110: {
    like: "https://youtu.be/JgzwNetOKds?si=X5_nRXPM2RfUpfhT",
    unlock: "https://www.mediafire.com/file/xxeer07vcmyd3d1/Pack_56_Skin_Full_HD_C%25C3%25B3_N%25C3%25BAt_B%25E1%25BA%25A5m_Kh%25C3%25B4ng_Tr%25C3%25B9ng.zip/file"
  },
  mod5skin0710: {
    like: "https://youtu.be/NMU262pngvI?si=cuKRHUKhEiRh-Wdn",
    unlock: "https://www.mediafire.com/file/vhkov4kmmvlkyjx/%255B_N%25C3%25BAt_-_TBH_%255DPack_5_Skin_Full_HD_By_Ngh%25C4%25A9alq_TV.zip/file"
  },
  mod7skin1010: {
    like: "https://youtu.be/QwQCrAS08Cg?si=5BauqfL84JNKKIve",
    unlock: "https://www.mediafire.com/file/57pgy24m4k9fjn8/%255B_N%25C3%25BAt_-_TBH_%255D_Mod_Full_7_Skin_TNVT.zip/file"
  }
};

// Tự động gán link mặc định cho các trang không cấu hình riêng biệt sub/tele
Object.keys(pages).forEach(key => {
  if (!pages[key].sub) pages[key].sub = DEFAULT_SUB;
  if (!pages[key].tele) pages[key].tele = DEFAULT_TELE;
  if (!pages[key].cyberMods) pages[key].cyberMods = CYBER_MODS_URL;
});
