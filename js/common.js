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
      { name: 'Base64 エンコーダー', file: 'base64.html' },
      { name: 'URLエンコーダー', file: 'url-encoder.html' }
    ],
    '画像': [
      { name: '画像フォーマット変換', file: 'image-converter.html' },
      { name: '画像リサイズ', file: 'image-resizer.html' }
    ],
    '変換': [
      { name: '単位変換', file: 'unit-converter.html' },
      { name: 'タイムスタンプ変換', file: 'timestamp.html' },
      { name: 'QRコード生成', file: 'qr-generator.html' },
      { name: 'カラーコード変換', file: 'color-converter.html' }
    ],
    '開発者向け': [
      { name: 'JSON フォーマッター', file: 'json-formatter.html' }
    ]
  };

  // toolsディレクトリ内かどうかを判定
  function isInToolsDir() {
    const path = window.location.pathname;
    return path.includes('/tools/');
  }

  // フッターナビゲーションを生成
  function generateFooterNav() {
    const toolsPrefix = isInToolsDir() ? '' : 'tools/';
    const rootPrefix = isInToolsDir() ? '../' : '';
    let html = '<nav class="footer__nav">';

    for (const [category, tools] of Object.entries(TOOLS)) {
      html += '<div class="footer__category">';
      html += `<span class="footer__category-title">${category}</span>`;
      for (const tool of tools) {
        html += `<a href="${toolsPrefix}${tool.file}" class="footer__link">${tool.name}</a>`;
      }
      html += '</div>';
    }

    html += '</nav>';

    // サイト情報リンク
    html += '<div class="footer__info">';
    html += `<a href="${rootPrefix}privacy.html" class="footer__info-link">プライバシーポリシー</a>`;
    html += `<a href="${rootPrefix}about.html" class="footer__info-link">運営者情報</a>`;
    html += '</div>';

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
