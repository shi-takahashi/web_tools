// 共通JavaScript

(function() {
  // プライバシー説明を挿入
  function insertPrivacyNotice() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    const notice = document.createElement('div');
    notice.className = 'privacy-notice';
    notice.innerHTML = '<div class="container">このツールはブラウザ上で動作し、入力データはサーバーに送信されません。</div>';

    footer.parentNode.insertBefore(notice, footer);
  }

  // DOM読み込み後に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertPrivacyNotice);
  } else {
    insertPrivacyNotice();
  }
})();
