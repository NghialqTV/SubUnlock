// ==========================================
// CẤU HÌNH LINK MẶC ĐỊNH DÙNG CHUNG
// ==========================================

const DEFAULT_SUB = "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg";

const DEFAULT_TIKTOK = "https://www.tiktok.com/@ytb_nghialq_tv";

const DEFAULT_TELE = "https://t.me/+gI22PHmUi5xhMDA9";

const CYBER_MODS_URL = "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb";


// ==========================================
// CẤU HÌNH CÁC TRANG
// ==========================================

const pages = {
  tainguyen: {
    unlock: "https://gofile.io/d/dqDr1WCQ"
  },

  fps: {
    unlock: "https://www.mediafire.com/file/pd0c9vpqi6rnbp0/Mod_120_FPS_Cao.zip/file"
  },

  mapiosv2: {
    unlock: "https://testflight.apple.com/join/cfzYVv6g"
  },

  keymapiosv2: {
    unlock: "https://ctv.ppapikey.xyz/get-api-link?tokenID=134&package_id=478&username=hellophuc"
  },

  filele: {
    unlock: "https://nghialqtv.github.io/mod/file-le.html"
  },

  maphok: {
    unlock: "https://www.mediafire.com/file/5yk2hrndq5ybkzs/Mod_Map_Hok_New_%255B_Android_iOS_%255D.zip/file"
  },

  camxa: {
    unlock: "https://www.mediafire.com/file/goq0vjcnb1zkf1a/Mod_Cam_Xa_M%25E1%25BB%259Bi_Nh%25E1%25BA%25A5t.zip/file"
  },

  resources: {
    unlock: "https://www.mediafire.com/file/gs3o8ol0ucwv1br/Resources_C%25C3%25A2p_Nh%25E1%25BA%25ADt_30_Th%25C3%25A1ng_10.zip/file"
  },

  ipaios: {
    unlock: "https://linkx.me/VQxmGUP"
  },

  hackmenuios: {
    unlock: "https://linkx.me/wcaCGca1"
  },

  modmenuios: {
    unlock: "https://linkx.me/c8ZhXRYN"
  },

  keymenuios: {
    unlock: "https://ontops.link/4-VcsQX"
  },

  keyandroidv2: {
    unlock: "https://www.vnmods.baby/GETKEY/trungnghia04"
  },

  hackv2goc: {
    unlock: "https://www.mediafire.com/file/6jqqmzrd6gnf2yx/LQMOD_1.64.1.7.apk/file"
  },

  hackv2tachgoc: {
    unlock: "https://www.mediafire.com/file/6jqqmzrd6gnf2yx/LQMOD_1.64.1.7.apk/file"
  },

  mod3skin: {
    unlock: "https://www.mediafire.com/file/7fywgsyy89ubdro/%255BAndroid%25E2%2580%25A2IOS%255D_Mod_Pack_3_Skin_Hot_Pick.zip/file"
  },

  mod55skinv5: {
    unlock: "https://www.mediafire.com/file/kibzqzw6blxjebn/%255BVer5%255D_Mod_Pack_55_Skin_%25E2%2580%25A2_Full_N%25C3%25BAt_%25E2%2580%25A2_TBH_Kh%25C3%25B4ng_Tr%25C3%25B9ng.zip/file"
  },

  modskinhok: {
    unlock: "https://nghialqtv.github.io/file-le.html"
  },

  mod105skinv4: {
    unlock: "https://www.mediafire.com/file/rtulsdegl5rvztr/%255B_Full_N%25C3%25BAt_Kh%25C3%25B4ng_Tr%25C3%25B9ng_%255D_Pack_107_Skin_By_Ngh%25C4%25A9alq_TV.zip/file"
  },

  mod80skinv3: {
    unlock: "https://www.mediafire.com/file/zy37i6njo9qs8ty/Mod_Pack_80_Skin_3_IN_1.zip/file"
  },

  mod100skinv2: {
    unlock: "https://www.mediafire.com/file/m4b3it0tunf4w0v/Mod_Pack_100_Skin_Ver_2_C%25E1%25BA%25ADp_Nh%25E1%25BA%25ADt_16_Th%25C3%25A1ng_10.zip/file"
  },

  mod48skinv1: {
    unlock: "https://www.mediafire.com/file/qhi3cndodd9idu7/Pack_48_Skin_Full_HD_C%25C3%25B3_N%25C3%25BAt_B%25E1%25BA%25A5m_Kh%25C3%25B4ng_Tr%25C3%25B9ng.zip/file"
  }
};


// ==========================================
// TỰ ĐỘNG GÁN LINK MẶC ĐỊNH CHO TẤT CẢ TRANG
// ==========================================

Object.keys(pages).forEach(key => {
  if (!pages[key].sub) {
    pages[key].sub = DEFAULT_SUB;
  }

  if (!pages[key].followTikTok) {
    pages[key].followTikTok = DEFAULT_TIKTOK;
  }

  if (!pages[key].tele) {
    pages[key].tele = DEFAULT_TELE;
  }

  if (!pages[key].cyberMods) {
    pages[key].cyberMods = CYBER_MODS_URL;
  }
});
