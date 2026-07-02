// Cấu hình các link mặc định dùng chung để tránh trùng lặp dữ liệu
const DEFAULT_SUB = "https://youtube.com/@nghiatv_04?si=as_Caho0FZASI8Yg";
const DEFAULT_TELE = "https://t.me/+gI22PHmUi5xhMDA9";

const pages = {
  tainguyen: {
    like: "https://youtu.be/bPZSoST8WKI?si=kaLP0oWHq7P8WyKD",
    unlock: "https://gofile.io/d/jnHUzb"
  },
  fps: {
    like: "https://youtu.be/X_u_4jzzRzk?si=sXGjMFo_OF8-t93G",
    unlock: "https://www.mediafire.com/file/4gldcj37uk9ab2w/Mod_120_FPS_Cao_Li%25C3%25AAn_Qu%25C3%25A2n_Android.zip/file"
  },
  filele: {
    like: "https://youtu.be/GdMkWKfPMkQ?si=lBZzR1BHun0knzkQ",
    unlock: "https://nghialqtv.github.io/mod/file-le.html"
  },
  camxa: {
    like: "https://youtu.be/K5UU7sFOspo?si=6zcNrcNiXuYSyafH",
    unlock: "https://www.mediafire.com/file/cj8rf3k2dnmt99z/Mod_Camxa_Li%25C3%25AAn_Qu%25C3%25A2n_Android_-_IOS.zip/file"
  },
  resources: {
    like: "https://youtu.be/GdMkWKfPMkQ?si=I6dnBi8lDE-I64Q2",
    unlock: "https://www.mediafire.com/file/rdt6b8yoo3bbmeo/Resources_C%25E1%25BA%25ADp_Nh%25E1%25BA%25ADt_10_Th%25C3%25A1ng_6.zip/file"
  },
  keyandroid: {
    like: "https://youtu.be/2XH9WjIkQQs?si=KApKyYg2lmfT8vKo",
    unlock: "https://duymmo.io.vn/ctvkey/3fun.php"
  },
  modmenuandroid64: {
    like: "https://youtu.be/2XH9WjIkQQs?si=KApKyYg2lmfT8vKo",
    unlock: "https://www.mediafire.com/file/ck8cfrapf1ptqj2/Menu_Li%25C3%25AAn_Qu%25C3%25A2n_ModSkin_.apk/file"
  },
  modmenuandroid32: {
    like: "https://youtu.be/2XH9WjIkQQs?si=KApKyYg2lmfT8vKo",
    unlock: "https://www.mediafire.com/file/j21h804l6ojsn44/Menu_Mod_Skin_32_Bit_Fix.apk/file"
  },
  hackmenuandroid64: {
    like: "https://youtu.be/2XH9WjIkQQs?si=KApKyYg2lmfT8vKo",
    unlock: "https://www.mediafire.com/file/l54f3cq8798eo6d/Menu_Hack_Map_%255B_64_Bit_%255D.apk/file"
  },
  ipaios: {
    like: "https://youtu.be/XvMaFr4lcA8?si=6jHdbxHgVEk7zRMm",
    unlock: "https://www.mediafire.com/file/l3cg6df68x7rsum/AovMod_1.62.11625414.ipa/file"
  },
  hackmenuios: {
    like: "https://youtu.be/90_IyzW8TC4?si=Em1st1RFnpCsax1N",
    unlock: "https://linkx.me/iVn9J"
  },
  modmenuios: {
    like: "https://youtu.be/90_IyzW8TC4?si=Em1st1RFnpCsax1N",
    unlock: "https://linkx.me/HZI7Z9u"
  },
  keymenuios: {
    like: "https://youtu.be/90_IyzW8TC4?si=Em1st1RFnpCsax1N",
    unlock: "https://funlink.io/PwQB1jV"
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
  mod200skin2806: {
    like: "https://youtu.be/Aik5e6BIpB8?si=DJP5jzRf5qtCCcqb",
    unlock: "https://www.mediafire.com/file/dpzl87jctfcm8km/Mod_Full_200_Skin_Max_IN_5_Skin_By_Ngh%25C4%25A9alq_TV.zip/file"
  },
};

// Tự động gán link mặc định cho các trang không cấu hình riêng biệt sub/tele
Object.keys(pages).forEach(key => {
  if (!pages[key].sub) pages[key].sub = DEFAULT_SUB;
  if (!pages[key].tele) pages[key].tele = DEFAULT_TELE;
});
