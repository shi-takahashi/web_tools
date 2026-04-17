// 共通JavaScript

(function() {
  // Google Analytics
  const GA_ID = 'G-PQ1RM31LSQ';
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', GA_ID);
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
