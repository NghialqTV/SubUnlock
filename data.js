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
    like: "https://youtu.be/SEVLK6skI7c?si=6P1n-_OlCjuzBvTy",
    unlock: "https://nghialqtv.github.io/mod/file-le.html"
  },
  camxa: {
    like: "https://youtu.be/K5UU7sFOspo?si=6zcNrcNiXuYSyafH",
    unlock: "https://www.mediafire.com/file/j7qapbspgapkvc6/Mod_Cam_Xa_%255BS3_2026%255D.zip/file"
  },
  resources: {
    like: "https://youtu.be/SEVLK6skI7c?si=6P1n-_OlCjuzBvTy",
    unlock: "https://www.mediafire.com/file/2phivcrdkkx5fkt/Resources_S3_C%25E1%25BA%25ADp_Nh%25E1%25BA%25ADt_Ng%25C3%25A0y_08_Th%25C3%25A1ng_7.zip/file"
  },
  keyandroid: {
    like: "https://youtu.be/iGYxtDpFP70?si=c6kzC-qD6C-xjIx9",
    unlock: "https://duymmo.io.vn/ctvkey/3fun.php"
  },
  modmenuandroid64: {
    like: "https://youtu.be/iGYxtDpFP70?si=c6kzC-qD6C-xjIx9",
    unlock: "https://www.mediafire.com/file/f87v1gq03gli3fh/Menu_%255B_Mod_Skin_%255D_Android_S3.apk/file"
  },
  modmenuandroid32: {
    like: "https://youtu.be/iGYxtDpFP70?si=c6kzC-qD6C-xjIx9",
    unlock: "https://www.mediafire.com/file/j21h804l6ojsn44/Menu_Mod_Skin_32_Bit_Fix.apk/file"
  },
  hackmenuandroid64: {
    like: "https://youtu.be/iGYxtDpFP70?si=c6kzC-qD6C-xjIx9",
    unlock: "https://www.mediafire.com/file/cy5uk5y5v4dyaql/Menu_%255B_Hack_Map_%255D_Android_S3.apk/file"
  },
  ipaios: {
    like: "https://youtu.be/XvMaFr4lcA8?si=6jHdbxHgVEk7zRMm",
    unlock: "https://linkx.me/1TXdi"
  },
  hackmenuios: {
    like: "https://youtu.be/zrCz3IJkNmM?si=eCRwcIFPEIzrNkxO",
    unlock: "https://linkx.me/enSKC3w"
  },
  modmenuios: {
    like: "https://youtu.be/zrCz3IJkNmM?si=eCRwcIFPEIzrNkxO",
    unlock: "https://linkx.me/pAQHHZ2"
  },
  keymenuios: {
    like: "https://youtu.be/zrCz3IJkNmM?si=eCRwcIFPEIzrNkxO",
    unlock: "https://funlink.io/Pz20MGW"
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
};

// Tự động gán link mặc định cho các trang không cấu hình riêng biệt sub/tele
Object.keys(pages).forEach(key => {
  if (!pages[key].sub) pages[key].sub = DEFAULT_SUB;
  if (!pages[key].tele) pages[key].tele = DEFAULT_TELE;
});
