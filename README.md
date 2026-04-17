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
├── css/
│   └── styles.css          # 共通スタイル
├── js/
│   └── common.js           # 共通JavaScript（必要に応じて）
├── tools/
│   ├── json-formatter.html # JSONフォーマッター
│   └── (今後追加)
└── README.md               # このファイル
```

## ツール一覧

### 実装済み
1. **JSONフォーマッター** (`tools/json-formatter.html`) - JSONの整形・検証・圧縮ツール

### 実装予定
1. Base64エンコーダー/デコーダー
2. 文字数カウンター
3. （随時追加）

## 新しいツールを追加する手順

1. `tools/` ディレクトリに新しいHTMLファイルを作成
2. 共通CSSを読み込む: `<link rel="stylesheet" href="../css/styles.css">`
3. SEO用のmeta タグを設定（title, description, keywords）
4. `index.html` のツール一覧に追加
5. このREADMEの「実装済み」セクションを更新

## 共通デザインガイドライン

- レスポンシブ対応（モバイルファースト）
- ダークモード対応（prefers-color-scheme）
- アクセシビリティに配慮（ARIA属性、キーボード操作）
- 各ツールページは独立して動作（他のツールへの依存なし）

## デプロイ

AWS S3にファイルをアップロードし、CloudFrontで配信。

```bash
# HTML, JS, CSSはno-cache
aws s3 sync . s3://dev-tools-site \
  --exclude "*" --include "*.html" --include "*.js" --include "*.css" \
  --exclude ".git/*" --exclude "README.md" \
  --cache-control "no-cache"

# それ以外（画像など）はキャッシュ有効（1日）
aws s3 sync . s3://dev-tools-site \
  --exclude "*.html" --exclude "*.js" --exclude "*.css" \
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
