class Main {
  constructor() {
    this.createModel();
    this.initMethods();
  }

  createModel(){
    this.ytPlayer   = null;
    this.played     = false;
  }

  initMethods() {
    this.addYoutubeScript();
    this.onYouTubeIframeAPIReady();
  }

  //YouTube IFrame Player APIを読み込み
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

  //動画の再生
  onYouTubeIframeAPIReady() {
    const $player = $('#js-youtube');
    if(!$player[0]){
      return;
    }
    $(window).on('load', ()=> {
      const ytID    = $player.data('youtube-id'); //動画ID
      this.ytPlayer = new YT.Player('js-youtube', {
        videoId    : ytID,
        playerVars : {
          start          : 0, // 動画開始位置
          rel            : 0, // 関連動画の非表示
          controls       : 0, // プレイヤーコントロールの非表示
          disablekb      : 1, // キーボード操作をオフ
          showinfo       : 0, // タイトルなどの非表示
          modestbranding : 1, // YouTubeロゴの非表示
          iv_load_policy : 3, // アノテーションの非表示
          fs             : 0, //全画面表示ボタンの非表示
          autoplay       : 1, //自動再生
          playsinline    : 1, //インライン再生
          loop           : 0, //ループ
          //playlist       : ytID //ループさせる動画のID
        },
        events: {
          onReady       : this.onPlayerReady,
          onStateChange : (e) => {
            this.onPlayerStateChange(e);
          }
        }
      });
    });
  }

  //動画の準備完了後の動作
  onPlayerReady(e){
    e.target.setPlaybackQuality('highres');
    e.target.mute();
    e.target.playVideo();
  }

  //動画再生中の操作
  onPlayerStateChange(e){
    const ytStatus = e.target.getPlayerState();
    //再生中
    if (ytStatus == YT.PlayerState.PLAYING) {
      const $player = $('#js-youtube');
      $player.parent().addClass('is-loaded');
      if(!this.played){
        this.played = true;
        const duration = this.ytPlayer.getDuration();
        const timer = setInterval(() => {
          this.ytPlayer.seekTo(0);
          this.ytPlayer.playVideo();
        }, parseInt(duration * 1000))
      }
    }
    //再生後
    // if (ytStatus == YT.PlayerState.ENDED) {
    //   console.log('end');
    //   const $player = $('#js-youtube');
    //   $player.parent().removeClass('is-loaded');
    //   e.target.seekTo(0);
    // }
  }
}

new Main();