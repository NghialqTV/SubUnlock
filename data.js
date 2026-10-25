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
    unlock: "https://ctv.ppapikey.xyz/get-api-link?tokenID=134&package_id=478&username=hellophuc"
  },
  filele: {
    like: "https://youtu.be/Q1ILAP3DRMg?si=zPHrkH6nZW_aETZl",
    unlock: "https://nghialqtv.github.io/mod/file-le.html"
  },
  maphok: {
    like: "https://youtu.be/x4sYExej7dM?si=GsI4iPQ-VlJTetfT",
    unlock: "https://www.mediafire.com/file/5yk2hrndq5ybkzs/Mod_Map_Hok_New_%255B_Android_iOS_%255D.zip/file"
  },
  camxa: {
    like: "https://youtu.be/3RBcbwpJ3Ww?si=bMCamclQDxF6h5vZ",
    unlock: "https://www.mediafire.com/file/goq0vjcnb1zkf1a/Mod_Cam_Xa_M%25E1%25BB%259Bi_Nh%25E1%25BA%25A5t.zip/file"
  },
  resources: {
    like: "https://youtu.be/REhMvy3DY4Q?si=r29L1thnUtswbvOU",
    unlock: "https://www.mediafire.com/file/5cwdkfyadr8c795/Resources_C%25E1%25BA%25ADp_Nh%25E1%25BA%25ADt_16_Th%25C3%25A1ng_10.zip/file"
  },
  ipaios: {
    like: "https://youtu.be/IOvKa42RmGI?si=1YvfIVdFvf0OX5kj",
    unlock: "https://linkx.me/w4gC"
  },
  hackmenuios: {
    like: "https://youtu.be/_n7IbS0SK9Q?si=qpyZpz21lRhkz30A",
    unlock: "https://linkx.me/wcaCGca1"
  },
  modmenuios: {
    like: "https://youtu.be/_n7IbS0SK9Q?si=qpyZpz21lRhkz30A",
    unlock: "https://linkx.me/c8ZhXRYN"
  },
  keymenuios: {
    like: "https://youtu.be/_n7IbS0SK9Q?si=qpyZpz21lRhkz30A",
    unlock: "https://ontops.link/4-VcsQX"
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
  mod3skin: {
    like: "https://youtu.be/Lpmwou75a1c?si=rNxovMgC-M1Y1Aw8",
    unlock: "https://www.mediafire.com/file/7fywgsyy89ubdro/%255BAndroid%25E2%2580%25A2IOS%255D_Mod_Pack_3_Skin_Hot_Pick.zip/file"
  },
  mod55skinv5: {
    like: "https://youtu.be/U5_64XgYv4M?si=saiavjvmC6uBLlTw",
    unlock: "https://www.mediafire.com/file/kibzqzw6blxjebn/%255BVer5%255D_Mod_Pack_55_Skin_%25E2%2580%25A2_Full_N%25C3%25BAt_%25E2%2580%25A2_TBH_Kh%25C3%25B4ng_Tr%25C3%25B9ng.zip/file"
  },
  modskinhok: {
    like: "https://youtu.be/g4YE8c3IMIg?si=6w-i4Vj7Q-wXUpiV",
    unlock: "https://nghialqtv.github.io/file-le.html"
  },
  mod105skinv4: {
    like: "https://youtu.be/0SDXrji3Fp0?si=c8bQ_uixe8CTCozV",
    unlock: "https://www.mediafire.com/file/rtulsdegl5rvztr/%255B_Full_N%25C3%25BAt_Kh%25C3%25B4ng_Tr%25C3%25B9ng_%255D_Pack_107_Skin_By_Ngh%25C4%25A9alq_TV.zip/file"
  },
  mod80skinv3: {
    like: "https://youtu.be/a7_3b92oUzg?si=vHv09sjWkzd7bRp4",
    unlock: "https://www.mediafire.com/file/zy37i6njo9qs8ty/Mod_Pack_80_Skin_3_IN_1.zip/file"
  },
  mod100skinv2: {
    like: "https://youtu.be/a7_3b92oUzg?si=vHv09sjWkzd7bRp4",
    unlock: "https://www.mediafire.com/file/m4b3it0tunf4w0v/Mod_Pack_100_Skin_Ver_2_C%25E1%25BA%25ADp_Nh%25E1%25BA%25ADt_16_Th%25C3%25A1ng_10.zip/file"
  },
  mod48skinv1: {
    like: "https://youtu.be/a7_3b92oUzg?si=vHv09sjWkzd7bRp4",
    unlock: "https://www.mediafire.com/file/qhi3cndodd9idu7/Pack_48_Skin_Full_HD_C%25C3%25B3_N%25C3%25BAt_B%25E1%25BA%25A5m_Kh%25C3%25B4ng_Tr%25C3%25B9ng.zip/file"
  }
};

// Tự động gán link mặc định cho các trang không cấu hình riêng biệt sub/tele
Object.keys(pages).forEach(key => {
  if (!pages[key].sub) pages[key].sub = DEFAULT_SUB;
  if (!pages[key].tele) pages[key].tele = DEFAULT_TELE;
  if (!pages[key].cyberMods) pages[key].cyberMods = CYBER_MODS_URL;
});
