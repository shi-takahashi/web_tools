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

  // ツールリスト（ツール追加時はここに追加するだけでOK）
  const TOOLS = {
    'テキスト': [
      { name: '文字数カウンター', file: 'char-counter.html' },
      { name: 'Base64 エンコーダー', file: 'base64.html' }
    ],
    '画像': [
      { name: '画像フォーマット変換', file: 'image-converter.html' },
      { name: '画像リサイズ', file: 'image-resizer.html' }
    ],
    '変換': [
      { name: '単位変換', file: 'unit-converter.html' },
      { name: 'タイムスタンプ変換', file: 'timestamp.html' }
    ],
    '開発者向け': [
      { name: 'JSON フォーマッター', file: 'json-formatter.html' }
    ]
  };

  // トップページかどうかを判定
  function isTopPage() {
    const path = window.location.pathname;
    return path === '/' || path.endsWith('/index.html') || path.endsWith('/');
  }

  // フッターナビゲーションを生成
  function generateFooterNav() {
    const prefix = isTopPage() ? 'tools/' : '';
    let html = '<nav class="footer__nav">';

    for (const [category, tools] of Object.entries(TOOLS)) {
      html += '<div class="footer__category">';
      html += `<span class="footer__category-title">${category}</span>`;
      for (const tool of tools) {
        html += `<a href="${prefix}${tool.file}" class="footer__link">${tool.name}</a>`;
      }
      html += '</div>';
    }

    html += '</nav>';
    return html;
  }

  // フッターを構築
  function buildFooter() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    const container = footer.querySelector('.container');
    if (!container) return;

    // フッターナビゲーションとコピーライトを挿入
    container.innerHTML = generateFooterNav() +
      '<p class="footer__copyright">&copy; 2026 Web Tools. All rights reserved.</p>';
  }

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
  function init() {
    buildFooter();
    insertPrivacyNotice();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
