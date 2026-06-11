// Cấu hình các link mặc định dùng chung để tránh trùng lặp dữ liệu
const DEFAULT_SUB = "https://youtube.com/@cybertv_v2?si=wTDp5vhgQBlGlq-J";
const DEFAULT_TELE = "https://t.me/+gI22PHmUi5xhMDA9";

const pages = {
  fps: {
    like: "https://youtu.be/OanRin_99vQ?si=FWFIGxX9Fflyc59a",
    unlock: "https://www.mediafire.com/file/4gldcj37uk9ab2w/Mod_120_FPS_Cao_Li%25C3%25AAn_Qu%25C3%25A2n_Android.zip/file"
  },
  filele: {
    like: "https://youtu.be/6T5qfJAGP3c?si=P3KlCv9nNPgaO8CM",
    unlock: "https://nghialqtv.github.io/mod/file-le.html"
  },
  camxa: {
    like: "https://youtu.be/94QS7vaI4I8?si=nkjNuf9NHgOVYHtb",
    unlock: "https://www.mediafire.com/file/cj8rf3k2dnmt99z/Mod_Camxa_Li%25C3%25AAn_Qu%25C3%25A2n_Android_-_IOS.zip/file"
  },
  resources: {
    like: "https://youtu.be/6T5qfJAGP3c?si=i3QjRuq5TQ90Y3Ui",
    unlock: "https://www.mediafire.com/file/fmg9hcixqsb3cwh/Resources_C%25E1%25BA%25ADp_Nh%25E1%25BA%25ADt_4_th%25C3%25A1ng_6.zip/file"
  },
  keyandroid: {
    like: "https://youtu.be/u8Ua7v_Z5rg?si=0rc_EDvDWYAeYulr",
    unlock: "https://duymmo.io.vn/ctvkey/3fun.php"
  },
  modmenuandroid64: {
    like: "https://youtu.be/u8Ua7v_Z5rg?si=0rc_EDvDWYAeYulr",
    unlock: "https://www.mediafire.com/file/ck8cfrapf1ptqj2/Menu_Li%25C3%25AAn_Qu%25C3%25A2n_ModSkin_.apk/file"
  },
  modmenuandroid32: {
    like: "https://youtu.be/u8Ua7v_Z5rg?si=0rc_EDvDWYAeYulr",
    unlock: "https://www.mediafire.com/file/j21h804l6ojsn44/Menu_Mod_Skin_32_Bit_Fix.apk/file"
  },
  hackmenuandroid64: {
    like: "https://youtu.be/u8Ua7v_Z5rg?si=0rc_EDvDWYAeYulr",
    unlock: "https://www.mediafire.com/file/l54f3cq8798eo6d/Menu_Hack_Map_%255B_64_Bit_%255D.apk/file"
  },
  ipaios: {
    like: "https://youtu.be/QxU_WqDb11E?si=62Fn0AM8CzZN2qn2",
    unlock: "https://www.mediafire.com/file/l3cg6df68x7rsum/AovMod_1.62.11625414.ipa/file"
  },
  hackmenuios: {
    like: "https://youtu.be/f4OB08TciwY?si=jsoYiRMvHKnzOloJ",
    unlock: "https://ipas.cc/byem9u"
  },
  modmenuios: {
    like: "https://youtu.be/zfOV13NgRLI?si=YBnSeJkNJZj3Ae_h",
    unlock: "https://ipas.cc/pyev1a"
  },
  keymenuios: {
    like: "https://youtu.be/zfOV13NgRLI?si=YBnSeJkNJZj3Ae_h",
    unlock: "https://funlink.io/PwQB1jV"
  },
  mod45skin0606: {
    like: "https://youtu.be/Zxy1adX0CJY?si=0Ai-v3y0xWoE4_By",
    unlock: "https://linkx.me/jUdf8f0"
  },
};

// Tự động gán link mặc định cho các trang không cấu hình riêng biệt sub/tele
Object.keys(pages).forEach(key => {
  if (!pages[key].sub) pages[key].sub = DEFAULT_SUB;
  if (!pages[key].tele) pages[key].tele = DEFAULT_TELE;
});
