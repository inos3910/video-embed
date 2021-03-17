class Main {
  constructor() {
    this.createModel();
    this.initMethods();
  }

  createModel(){
    this.ytPlayer   = null;
    this.ytID       = 'Nhxf7Sq7LDE';
  }

  initMethods() {
    this.addYoutubeScript();
    this.onYouTubeIframeAPIReady();
  }

  //YouTube iframe apiを読み込み
  addYoutubeScript(){
    const $youtube_elem = $('#js-youtube');
    if(!$youtube_elem[0]){
      return;
    }

    const tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  //Youtube Player APIの読み込み
  onYouTubeIframeAPIReady() {
    const $player = $('#js-youtube');
    if(!$player[0]){
      return;
    }
    $(window).on('load', ()=> {
      this.ytPlayer = new YT.Player('js-youtube', {
        videoId    : this.ytID,
        playerVars : {
          start          : 0,
          // 関連動画の非表示
          rel            : 0,
          // プレイヤーコントロールの非表示
          controls       : 0,
          // キーボード操作をオフ
          disablekb      : 1,
          // タイトルなどの非表示
          showinfo       : 0,
          // YouTubeロゴの非表示
          modestbranding : 1,
          // アノテーションの非表示
          iv_load_policy : 3,
          wmode          : 'transparent',
          fs             : 0,
          autoplay       : 1,
          // loop           : 1,
          // playlist       : this.ytID,
          playsinline    : 1
        },
        events: {
          onReady       : this.onPlayerReady,
          onStateChange : this.onPlayerStateChange
        }
      });
    });
  }

  //動画の準備完了後の動作
  onPlayerReady(e){
    e.target.setPlaybackQuality('default');
    e.target.mute();
    e.target.playVideo();
  }

  //動画再生中と再生後の動作
  onPlayerStateChange(e){
    const ytStatus = e.target.getPlayerState();
    //再生中
    if (ytStatus == YT.PlayerState.PLAYING) {
      const $player = $('#js-youtube');
      $player.parent().addClass('is-loaded');

      const duration = e.target.getDuration();
      const timer = setTimeout(() => {
        e.target.seekTo(0);
        clearTimeout(timer);
      }, duration * 1000);
    }
  }
}

new Main();