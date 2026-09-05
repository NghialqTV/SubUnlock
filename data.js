// Cấu hình các link mặc định dùng chung để tránh trùng lặp dữ liệu
const DEFAULT_SUB = "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg";
const DEFAULT_TELE = "https://t.me/+gI22PHmUi5xhMDA9";
const CYBER_MOD_SUB = "https://youtube.com/@cyber_aov?si=rPa3JdbJuRreQbVh";

const pages = {
  tainguyen: {
    like: "https://youtu.be/bPZSoST8WKI?si=kaLP0oWHq7P8WyKD",
    unlock: "https://gofile.io/d/dqDr1WCQ"
  },
  keyandroidv2: {
    like: "https://youtu.be/GhRB8MCRWjg?si=aewIEDSygdFf6wA-",
    unlock: "https://vn.modhack.uk/GETKEY/TrungNghia04"
  },
  hackv2goc: {
    like: "https://youtu.be/GhRB8MCRWjg?si=aewIEDSygdFf6wA-",
    unlock: "https://www.mediafire.com/file/hi0d7m0zkn0yh7k/M%25C3%25A1p_S%25C3%25A1ng_V2.1_Gop_G%25E1%25BB%2591c.apk/file"
  },
  hackv2tachgoc: {
    like: "https://youtu.be/GhRB8MCRWjg?si=aewIEDSygdFf6wA-",
    unlock: "https://www.mediafire.com/file/mt6j3ooe0w8v2ol/Map_S%25C3%25A1ng_V2.1_._T%25C3%25A1ch_G%25E1%25BB%2591c.apk/file"
  },
  fullfilele: {
    like: "https://youtu.be/1nQrhNtpMYU?si=ihvptkE5dgDGq-HB",
    unlock: "https://linkx.me/CVv0"
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
    like: "https://youtu.be/ce5_ie9fH5o?si=SMX3V7mRYyyjMGdF",
    unlock: "https://gofile.io/d/dqDr1WCQ"
  },
  keyandroid: {
    like: "https://youtu.be/sPBXNLncD5A?si=IWFdJ-zIcruHspt8",
    unlock: "https://duymmo.io.vn/ctvkey/3fun.php"
  },
  modmenuandroid64: {
    like: "https://youtu.be/sPBXNLncD5A?si=IWFdJ-zIcruHspt8",
    unlock: "https://www.mediafire.com/file/f87v1gq03gli3fh/Menu_%255B_Mod_Skin_%255D_Android_S3.apk/file"
  },
  keymapios: {
    like: "https://youtu.be/caXg4cYE7U8?si=6Gy7i0nFW4-qii1r",
    unlock: "https://ontops.link/91xoQoX"
  },
  modmenuiosv2: {
    like: "https://youtu.be/caXg4cYE7U8?si=lM3SjFbB2I0g2jSR",
    unlock: "https://linkx.me/Wv9E9i"
  },
  ipaios: {
    like: "https://youtu.be/3GFaSIbM9_w?si=Z0jrpcqVp3JVGOTl",
    unlock: "https://linkx.me/JwbO075"
  },
  hackmenuios: {
    like: "https://youtu.be/zrCz3IJkNmM?si=eCRwcIFPEIzrNkxO",
    unlock: "https://storeipa.com/ZHduf3"
  },
  modmenuios: {
    like: "https://youtu.be/zrCz3IJkNmM?si=eCRwcIFPEIzrNkxO",
    unlock: "https://linkx.me/r20x0l"
  },
  keymenuios: {
    like: "https://youtu.be/zrCz3IJkNmM?si=eCRwcIFPEIzrNkxO",
    unlock: "https://ontops.link/_P_H7-g"
  },
  mod65skin1006: {
    like: "https://youtu.be/jZwGXnvgQpo?si=6ZTA2xJhwzPVb3Jy",
    unlock: "https://www.mediafire.com/file/v5bwknqjg6nk6wd/Pack_64_Skin.zip/file"
  },
  mod70skin1306: {
    like: "https://youtu.be/EkblSdRM9Cw?si=3xsPsFGL05CQCFJ2",
    unlock: "https://www.mediafire.com/file/2m4cn3adoisp52q/Pack_70_Skin_Android_-_IOS_-_Cyber_Mods.zip/file"
  },
  mod123skin1606: {
    like: "https://youtu.be/Ra_mVFbME98?si=jv3FyODlqs3FvnVy",
    unlock: "https://www.mediafire.com/file/byovvv3l8g00s3t/Mod_Pack_123_Skin_Android_-_IOS_By_Cyber_Mods.zip/file"
  },
  mod35skin2106: {
    like: "https://youtu.be/qXaXwoKc3ps?si=o33pS0xolpoof3Ii",
    unlock: "https://www.mediafire.com/file/y8lp46ssvmdg3pi/Mod_Pack_35_Skin_Li%25C3%25AAn_Qu%25C3%25A2n_By_Cyber_Mods.zip/file"
  },
  mod56skin2506: {
    like: "https://youtu.be/rcuin9zADdI?si=TlGVUrlcntPpLFON",
    unlock: "https://www.mediafire.com/file/qnxy2ettj1tbdlp/Pack_56_Skin_Li%25C3%25AAn_Qu%25C3%25A2n_Android_-_IOS.zip/file"
  },
  mod70skin1007: {
    like: "https://youtu.be/F9L26B5tuNc?si=FPw_iyabcxTIzD-r",
    unlock: "https://www.mediafire.com/file/t0pb267ck9iu0b7/Mod_Pack_70_Skin_S3_By_Ngh%25C4%25A9alq_TV.zip/file"
  },
  mod200skin2806: {
    like: "https://youtu.be/Aik5e6BIpB8?si=DJP5jzRf5qtCCcqb",
    unlock: "https://www.mediafire.com/file/dpzl87jctfcm8km/Mod_Full_200_Skin_Max_IN_5_Skin_By_Ngh%25C4%25A9alq_TV.zip/file"
  },
  mod500skin1507: {
    like: "https://youtu.be/KAOAP4IaPhE?si=0vjsB30ljkAjjfgR",
    unlock: "https://www.mediafire.com/file/j3hyowds9ns7usp/Mod_Full_Skin_Max_IN_5_Skin.zip/file"
  },
  mod80skin1807: {
    like: "https://youtu.be/zJFpBlSbFbI?si=qrWzx9jsys2oVKdb",
    unlock: "https://www.mediafire.com/file/4zvrl2oy07a6y1b/Mod_Pack_80_Skin_Android_-_IOS_-_Fix_Reset.zip/file"
 },
  mod122skin2107: {
    like: "https://youtu.be/JYPFCtdzgYc?si=PbXF2p6RcDIUKH5c",
    unlock: "https://www.mediafire.com/file/48u4hv7mksa65rs/Pack_122_Skin_Full_HD.zip/file"
 },
  mod50skin2507: {
    like: "https://youtu.be/6gfFAI4M5t8?si=VMJzajA_eb8gzB1y",
    unlock: "https://www.mediafire.com/file/wfpasqcy2z9ffo5/Mod_Full_50_Skin_C%25C3%25B3_N%25C3%25BAt_B%25E1%25BA%25A5m_By_Ngh%25C4%25A9aLq_TV.zip/file"
 },
  mod500skin2707: {
    like: "https://youtu.be/VlzxNvmzOZQ?si=QpKDnK3axVokjMxO",
    unlock: "https://www.mediafire.com/file/wd5sztuhfz8xhoj/Mod_500_Skin_Max_In_6.zip/file"
 },
  mod55skin3107: {
    like: "https://youtu.be/bc2JbfaQJwQ?si=uQm7empNCkNLZE-T",
    unlock: "https://www.mediafire.com/file/savo128ezen6gg5/Mod_Pack_55_Skin_C%25C3%25B3_N%25C3%25BAt_B%25E1%25BA%25A5m_By_Ngh%25C4%25A9alq_TV.zip/file"
 },
  mod123skin0308: {
    like: "https://youtu.be/KUG574Ic85U?si=YZhqDMWhK9Qm62r0",
    unlock: "https://www.mediafire.com/file/ra350vvdwgyo6yo/Mod_Full_123_Skin_Li%25C3%25AAn_Qu%25C3%25A2n.zip/file"
 },
  mod500skin0608: {
    like: "https://youtu.be/6rFLGFTJquM?si=OS9dFSVSm8dyVbjz",
    unlock: "https://www.mediafire.com/file/c228ivjvcdu4x0e/Mod_Full_500_Skin_Max_In_5.zip/file"
  },
  mod123skin0908: {
    like: "https://youtu.be/gLRC-w_Cwzg?si=_uzKh0_sgaUSXXI4",
    unlock: "https://www.mediafire.com/file/voikesbl8avbmc7/Mod_Full_123_Skin_C%25C3%25B3_N%25C3%25BAt_B%25E1%25BA%25A5m_By_Ngh%25C4%25A9aLQ_TV.zip/file"
  },
  mod85skin1208: {
    like: "https://youtu.be/jkJLZLwWu9c?si=WIBxDvEwLYCuUN7U",
    unlock: "https://www.mediafire.com/file/nkrudepcxx0qb69/Mod_Pack_85_Skin_C%25C3%25B3_n%25C3%259At_B%25E1%25BA%25A5m_By_Ngh%25C4%25A9alq_TV.zip/file"
  },
  mod123skin1408: {
    like: "https://youtu.be/zlR18CMlaIE?si=wOnQ-WXmNBHc_nDA",
    unlock: "https://www.mediafire.com/file/k7hbcemjkoercr1/%255B_C%25C3%25B3_N%25C3%25BAt_%255D_Mod_Full_123_Skin_Li%25C3%25AAn_Qu%25C3%25A2n_By_Ngh%25C4%25A9alq_TV.zip/file"
  },
  mod250skin2508: {
    like: "https://youtu.be/knGjZ_mRo_g?si=JLWh7lRVfiFQ4CYH",
    unlock: "https://www.mediafire.com/file/nrp1xpv5cnr234s/Mod_250_Skin_Max_IN_1.zip/file"
  },
  mod60skin2908: {
    like: "https://youtu.be/a-buucqnu6I?si=hBKRn8PhzA14HpVe",
    unlock: "https://www.mediafire.com/file/o8d2dswemu0okmj/Pack_60_Skin_C%25C3%25B3_N%25C3%25BAt_B%25E1%25BA%25A5m_By_Ngh%25C4%25A9alq_TV.zip/file"
  },
  mod500skin0109: {
    like: "https://youtu.be/9XgcLymOUFs?si=G0Ts2S70q-jPpYsr",
    unlock: "https://www.mediafire.com/file/mk6fyyskcwtxeyy/Mod_Full_500_Skin_IN_1.zip/file"
  },
  mod50skin0509: {
    like: "https://youtu.be/gWk7Zxs2T1g?si=9MxX-vnY18QIMNUZ",
    unlock: "https://www.mediafire.com/file/fwdeuzk1aijr0cq/Mod_Pack_50_Skin_By_Ngh%25C4%25A9alq_TV.zip/file"
  },
  
};

// Tự động gán link mặc định cho các trang không cấu hình riêng biệt sub/tele
Object.keys(pages).forEach(key => {
  if (!pages[key].sub) pages[key].sub = DEFAULT_SUB;
  if (!pages[key].tele) pages[key].tele = DEFAULT_TELE;
  if (!pages[key].cyberSub) pages[key].cyberSub = CYBER_MOD_SUB;
});
