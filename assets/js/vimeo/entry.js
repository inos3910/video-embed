class Main {
  constructor() {
    this.createModel();
    this.initMethods();
  }

  createModel(){
    this.vimeoPlayer = null;
  }

  initMethods() {
    this.addVimeoScript();
    this.onVimeoPlayerReady();
  }

  //Vimeo apiを読み込み
  addVimeoScript(){
    const $youtube_elem = $('#js-vimeo');
    if(!$youtube_elem[0]){
      return;
    }
    const tag = document.createElement('script');
    tag.src = "//player.vimeo.com/api/player.js";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  onVimeoPlayerReady() {
    const $player = $('#js-vimeo');
    if(!$player[0]){
      return;
    }

    const options = {
      id         : 524652180, //ID
      autoplay   : 1, //自動再生
      loop       : 1, //ループ再生
      byline     : 0, //投稿者情報の非表示
      portrait   : 0, //左上Vimeoのロゴ非表示
      title      : 0, //タイトルの非表示
      controls   : 0, //再生バー非表示
      responsive : 1,  //親要素に応じてサイズを変更
      muted      : 1,  //ミュート
      autopause  : 0
    };
    $(window).on('load', ()=> {
      this.vimeoPlayer = new Vimeo.Player('js-vimeo', options);
      this.vimeoPlayer.setVolume(0); // ミュート
      this.vimeoPlayer.play();    // 再生
      //再生が始まったらクラスを追加
      this.vimeoPlayer.on('play', () => {
        $player.addClass('is-loaded');
      });
    });
  }
}

new Main();