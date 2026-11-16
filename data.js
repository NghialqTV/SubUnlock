// SubUnlock data.js – tạo bởi SubUnlock Studio. Không cần sửa file thủ công.
// Quản trị tại admin.html. Các link đích và nhiệm vụ được lưu dưới đây.

const DEFAULT_SUB = "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg";
const DEFAULT_TIKTOK = "https://www.tiktok.com/@ytb_nghialq_tv";
const DEFAULT_TELE = "https://t.me/+gI22PHmUi5xhMDA9";
const CYBER_MODS_URL = "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb";

const pages = {
  "tainguyen": {
    "unlock": "https://gofile.io/d/dqDr1WCQ",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "fps": {
    "unlock": "https://www.mediafire.com/file/pd0c9vpqi6rnbp0/Mod_120_FPS_Cao.zip/file",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "filele": {
    "unlock": "https://nghialqtv.github.io/mod/file-le.html",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "maphok": {
    "unlock": "https://www.mediafire.com/file/5yk2hrndq5ybkzs/Mod_Map_Hok_New_%255B_Android_iOS_%255D.zip/file",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "camxa": {
    "unlock": "https://www.mediafire.com/file/5drp1sxqfv326ui/Mod_Cam_Xa_By_Ngh%25C4%25A9alq_TV.zip/file",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "resources": {
    "unlock": "https://www.mediafire.com/file/pistid6s2d7995n/%255BNgh%25C4%25A9alqTV%255D_Resources_C%25E1%25BA%25ADp_Nh%25E1%25BA%25ADt_4_Th%25C3%25A1ng_11.zip/file",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "ipaios": {
    "unlock": "https://linkx.me/VQxmGUP",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "modmenuios": {
    "unlock": "https://linkx.me/GxRCa8",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "keymenuios": {
    "unlock": "https://ontops.link/ryQX6nY",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "keyandroidv2": {
    "unlock": "https://www.vnmods.baby/GETKEY/trungnghia04",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "hackv2goc": {
    "unlock": "https://www.mediafire.com/file/6jqqmzrd6gnf2yx/LQMOD_1.64.1.7.apk/file",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "hackv2tachgoc": {
    "unlock": "https://www.mediafire.com/file/6jqqmzrd6gnf2yx/LQMOD_1.64.1.7.apk/file",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "mod80skinver10": {
    "unlock": "https://www.mediafire.com/file/n8351ywsaa9kdx8/Mod_80_Skin_%255B_Android_-_IOS_%255D.zip/file",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "mod124skinv7": {
    "unlock": "https://www.mediafire.com/file/p2r3yk9l3siusuq/Mod_124_Skin_Full_Hi%25E1%25BB%2587u_%25E1%25BB%25A8ng_%255BAndroid_-_IOS%255D.zip/file",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "mod124skinv5": {
    "unlock": "https://www.mediafire.com/file/vztf7ptfg6wt1ad/%255BAndroid_-_IOS%255D_Mod_Full_124_Skin_Full_N%25C3%25BAt_B%25E1%25BA%25A5m_TBH_-_Kh%25C3%25B4ng_Tr%25C3%25B9ng.zip/file",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "mod100v4": {
    "unlock": "https://www.mediafire.com/file/3wn9ubo7zdfupg7/%255BAndroid_IOS%255D_Mod_Pack_100_Skin_1_IN_3_SKIN_VER4.zip/file",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "mod55skinv3": {
    "unlock": "https://www.mediafire.com/file/b9madhdvlg9rorw/%255BFull_N%25C3%25BAt_-_TBH_Kh%25C3%25B4ng_Tr%25C3%25B9ng%255D_Mod_Pack_55_Skin_Ver3_-_Android_IOS.zip/file",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "mod10skinv2": {
    "unlock": "https://linkx.me/2rkJ26",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "mod60skinv1": {
    "unlock": "https://linkx.me/w01ROn4e",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
  },
  "modvip01029": {
    "unlock": "https://nghialqtv.github.io/SubUnlock/?id=fps",
    "sub": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg",
    "followTikTok": "https://www.tiktok.com/@ytb_nghialq_tv",
    "tele": "https://t.me/+gI22PHmUi5xhMDA9",
    "cyberMods": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb",
    "title": "MOD VIP",
    "tasks": [
      {
        "type": "youtube",
        "label": "Đăng Kí Kênh",
        "url": "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg"
      },
      {
        "type": "youtube",
        "label": "Đăng Kí Kênh",
        "url": "https://youtube.com/@cyber_aov?si=bHs6leUzcdTxPpPb"
      },
      {
        "type": "tiktok",
        "label": "Follow TikTok",
        "url": "https://www.tiktok.com/@ytb_nghialq_tv"
      },
      {
        "type": "telegram",
        "label": "Tham Gia Telegram",
        "url": "https://t.me/+gI22PHmUi5xhMDA9"
      }
    ]
  }
};

Object.keys(pages).forEach(function (key) {
  if (!pages[key].sub) pages[key].sub = DEFAULT_SUB;
  if (!pages[key].followTikTok) pages[key].followTikTok = DEFAULT_TIKTOK;
  if (!pages[key].tele) pages[key].tele = DEFAULT_TELE;
  if (!pages[key].cyberMods) pages[key].cyberMods = CYBER_MODS_URL;
});
