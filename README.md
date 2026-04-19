# Web Tools

便利ツールを集めたWebサイト。

## プロジェクト概要

- **目的**: 便利なWebツールを提供
- **公開先**: AWS S3 + CloudFront（独自ドメイン）
- **将来計画**: AdSense等での収益化を視野に入れたSEO対策

## 技術方針

| 項目 | 選択 | 理由 |
|------|------|------|
| サイト構成 | 個別HTMLファイル | SEOに有利、管理しやすい |
| CSS | 素のCSS（フレームワークなし） | 外部依存なし、軽量、カスタマイズ自由 |
| JavaScript | Vanilla JS | 外部依存なし |
| ビルドツール | なし | 静的ファイルのみで構成 |

## ディレクトリ構造

```
/
├── index.html              # トップページ（ツール一覧）
├── privacy.html            # プライバシーポリシー
├── about.html              # 運営者情報・お問い合わせ
├── sitemap.xml             # サイトマップ
├── robots.txt              # クローラー設定
├── css/
│   └── styles.css          # 共通スタイル
├── js/
│   └── common.js           # 共通JavaScript
├── tools/
│   ├── json-formatter.html # JSONフォーマッター
│   └── (今後追加)
└── README.md               # このファイル
```

## ツール一覧

### 実装済み
1. **JSONフォーマッター** (`tools/json-formatter.html`) - JSONの整形・検証・圧縮ツール
2. **Base64エンコーダー/デコーダー** (`tools/base64.html`) - テキストのBase64エンコード・デコード（日本語対応）
3. **文字数カウンター** (`tools/char-counter.html`) - 文字数・行数・バイト数をリアルタイムカウント
4. **タイムスタンプ変換** (`tools/timestamp.html`) - Unixタイムスタンプと日時の相互変換（秒・ミリ秒対応）
5. **画像フォーマット変換** (`tools/image-converter.html`) - PNG/JPEG/WebP/SVGの相互変換（品質調整可能）
6. **画像リサイズ** (`tools/image-resizer.html`) - 画像の幅・高さを変更（アスペクト比維持対応）
7. **単位変換** (`tools/unit-converter.html`) - 長さ・面積・体積・重さ・速度・温度の単位変換
8. **QRコード生成** (`tools/qr-generator.html`) - テキストやURLからQRコードを生成（PNG形式でダウンロード可能）

### 実装予定
（随時追加）

## 新しいツールを追加する手順

1. `tools/` ディレクトリに新しいHTMLファイルを作成
2. 共通CSSを読み込む: `<link rel="stylesheet" href="../css/styles.css">`
3. 共通JSを読み込む: `<script src="../js/common.js"></script>`（`</body>`の前に）
4. フッターは空の要素だけ配置: `<footer class="footer"><div class="container"></div></footer>`
5. SEO用のmeta タグを設定（title, description, keywords）
6. `index.html` のツール一覧に追加
7. `js/common.js` の `TOOLS` オブジェクトに追加（フッターナビゲーションに反映される）
8. `sitemap.xml` に新しいURLを追加
9. このREADMEの「実装済み」セクションを更新

## 共通デザインガイドライン

- レスポンシブ対応（モバイルファースト）
- ダークモード対応（prefers-color-scheme）
- アクセシビリティに配慮（ARIA属性、キーボード操作）
- 各ツールページは独立して動作（他のツールへの依存なし）

## デプロイ

AWS S3にファイルをアップロードし、CloudFrontで配信。

```bash
# HTML, JS, CSS, XMLはno-cache
aws s3 sync . s3://dev-tools-site \
  --exclude "*" --include "*.html" --include "*.js" --include "*.css" --include "*.xml" \
  --exclude ".git/*" --exclude "README.md" \
  --cache-control "no-cache"

# それ以外（画像など）はキャッシュ有効（1日）
aws s3 sync . s3://dev-tools-site \
  --exclude "*.html" --exclude "*.js" --exclude "*.css" --exclude "*.xml" \
  --exclude ".git/*" --exclude "README.md" \
  --cache-control "max-age=86400"

# CloudFrontインバリデーション
aws cloudfront create-invalidation \
  --distribution-id E2ME0SJ8M2SVKD \
  --paths "/*" "/"
```

## 開発ログ

### 2026-04-17: プロジェクト開始
- プロジェクトの方針決定
  - 個別HTMLファイル構成
  - 素のCSS使用
  - 最初のツールはJSONフォーマッター
- 実装完了:
  - ディレクトリ構造作成 (`css/`, `js/`, `tools/`)
  - 共通CSS (`css/styles.css`) - ダークモード対応、レスポンシブ対応
  - トップページ (`index.html`) - ツール一覧表示
  - JSONフォーマッター (`tools/json-formatter.html`) - 整形・圧縮・検証機能
  - Base64エンコーダー/デコーダー (`tools/base64.html`) - UTF-8対応
  - 文字数カウンター (`tools/char-counter.html`) - リアルタイムカウント
  - 共通JS (`js/common.js`) - フッターナビゲーション動的生成、プライバシー説明、Google Analytics
  - SEO対策: sitemap.xml、robots.txt作成、Google Search Console登録
  - アクセス解析: Google Analytics (GA4) 導入

### 2026-04-18: AdSense準備・ツール追加
- 実装完了:
  - タイムスタンプ変換 (`tools/timestamp.html`)
  - 画像フォーマット変換 (`tools/image-converter.html`)
  - 画像リサイズ (`tools/image-resizer.html`)
  - 単位変換 (`tools/unit-converter.html`)
  - プライバシーポリシー (`privacy.html`)
  - 運営者情報 (`about.html`) - Googleフォームでお問い合わせ対応
- フッターナビゲーション改善:
  - `common.js`の`isInToolsDir()`でパス判定（ルート or tools/内）
  - 全ページからツール間・サイト情報ページへのナビゲーション可能に
