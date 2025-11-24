# アーキテクチャ図

このドキュメントは、ポケモンスリープ寝顔図鑑管理アプリのアーキテクチャを図解します。

## システム全体構成

```mermaid
graph TB
    subgraph "Client (Browser)"
        UI[Next.js App<br/>React Components]
        Auth[Auth State]
        LocalState[Local State]
    end
    
    subgraph "Firebase (GCP)"
        FAuth[Firebase Authentication]
        Firestore[Cloud Firestore]
        Hosting[Firebase Hosting]
    end
    
    User([User]) --> UI
    UI --> Auth
    Auth --> FAuth
    UI --> LocalState
    UI --> Firestore
    FAuth -.認証トークン.-> Firestore
    
    style UI fill:#4285f4,color:#fff
    style FAuth fill:#ffca28,color:#000
    style Firestore fill:#ff6f00,color:#fff
```

## コンポーネント構成

```mermaid
graph LR
    subgraph "Pages"
        Page[app/page.tsx<br/>Main Dashboard]
    end
    
    subgraph "Components"
        AuthBtn[AuthButton<br/>認証UI]
        PokemonCard[PokemonCard<br/>カード表示]
    end
    
    subgraph "Data Layer"
        MockData[mockData.ts<br/>マスターデータ]
        DB[lib/db.ts<br/>Firestore操作]
    end
    
    subgraph "Firebase"
        Config[firebase/config.ts<br/>初期化]
        Rules[firestore.rules<br/>セキュリティ]
    end
    
    Page --> AuthBtn
    Page --> PokemonCard
    Page --> DB
    AuthBtn --> Config
    DB --> Config
    DB --> MockData
    Config -.適用.-> Rules
    
    style Page fill:#4285f4,color:#fff
    style AuthBtn fill:#34a853,color:#fff
    style PokemonCard fill:#34a853,color:#fff
    style DB fill:#ea4335,color:#fff
    style Config fill:#fbbc04,color:#000
```

## データフロー（ログイン時）

```mermaid
sequenceDiagram
    participant U as User
    participant UI as app/page.tsx
    participant Auth as AuthButton
    participant FB as Firebase Auth
    participant FS as Firestore
    
    U->>Auth: クリック「Googleでログイン」
    Auth->>FB: signInWithPopup()
    FB-->>Auth: User認証情報
    Auth-->>UI: onAuthStateChanged(user)
    UI->>FS: subscribeToUserCollection(userId)
    FS-->>UI: リアルタイム同期開始
    FS-->>UI: 既存の収集データ
    UI->>UI: collectedStyles更新
    UI-->>U: UI更新（進捗表示）
```

## データフロー（寝顔選択時）

```mermaid
sequenceDiagram
    participant U as User
    participant Card as PokemonCard
    participant Page as app/page.tsx
    participant DB as lib/db.ts
    participant FS as Firestore
    
    U->>Card: 寝顔スタイルをクリック
    Card->>Page: onToggleStyle(styleId)
    Page->>DB: toggleSleepStyle(userId, pokemonId, styleId)
    DB->>FS: setDoc() with arrayUnion/arrayRemove
    FS-->>DB: 書き込み完了
    FS-->>Page: onSnapshot (リアルタイム更新)
    Page->>Page: collectedStyles更新
    Page-->>Card: 新しいcollectedStyles
    Card-->>U: UI更新（チェック状態変更）
```

## Firestoreデータ構造

```mermaid
graph TB
    subgraph "Firestore Collections"
        Users[users/]
        UserDoc["{userId}"]
        Collections[collections/]
        PokemonDoc["{pokemonId}"]
        Data["collectedStyles: string[]"]
    end
    
    Users --> UserDoc
    UserDoc --> Collections
    Collections --> PokemonDoc
    PokemonDoc --> Data
    
    style Users fill:#ff6f00,color:#fff
    style Collections fill:#ff6f00,color:#fff
    style Data fill:#4285f4,color:#fff
```

### データ例

```json
{
  "users": {
    "user123": {
      "collections": {
        "pikachu": {
          "collectedStyles": [
            "pikachu-1",
            "pikachu-2"
          ]
        },
        "bulbasaur": {
          "collectedStyles": [
            "bulbasaur-1"
          ]
        }
      }
    }
  }
}
```

## 認証フロー

```mermaid
stateDiagram-v2
    [*] --> 未ログイン
    未ログイン --> ログイン中: Googleログインボタンクリック
    ログイン中 --> ログイン済み: 認証成功
    ログイン中 --> 未ログイン: 認証失敗
    ログイン済み --> 未ログイン: ログアウト
    
    未ログイン: ローカルストレージのみ
    ログイン済み: Firestore同期有効
```

## セキュリティモデル

```mermaid
graph TB
    subgraph "Firestore Security Rules"
        Auth{認証済み?}
        Owner{自分のデータ?}
        Allow[読み書き許可]
        Deny[拒否]
    end
    
    Request[リクエスト] --> Auth
    Auth -->|No| Deny
    Auth -->|Yes| Owner
    Owner -->|Yes| Allow
    Owner -->|No| Deny
    
    style Allow fill:#34a853,color:#fff
    style Deny fill:#ea4335,color:#fff
```

## 技術スタック

```mermaid
graph LR
    subgraph "Frontend"
        Next[Next.js 16]
        React[React 19]
        TS[TypeScript]
        Tailwind[Tailwind CSS 4]
    end
    
    subgraph "Backend (BaaS)"
        FBAuth[Firebase Auth]
        FBStore[Cloud Firestore]
    end
    
    subgraph "Development"
        ESLint[ESLint]
        PostCSS[PostCSS]
    end
    
    Next --> React
    Next --> TS
    Next --> Tailwind
    Next --> FBAuth
    Next --> FBStore
    
    style Next fill:#000,color:#fff
    style React fill:#61dafb,color:#000
    style FBAuth fill:#ffca28,color:#000
    style FBStore fill:#ff6f00,color:#fff
```

## デプロイメント構成

```mermaid
graph TB
    Dev[開発環境<br/>localhost:3000]
    Build[npm run build]
    Vercel[Vercel<br/>本番環境]
    FBHost[Firebase Hosting<br/>代替案]
    
    Dev -->|ビルド| Build
    Build -->|デプロイ| Vercel
    Build -.代替.-> FBHost
    
    Vercel --> Users[エンドユーザー]
    FBHost -.-> Users
    
    style Vercel fill:#000,color:#fff
    style FBHost fill:#ffca28,color:#000
```

## 状態管理フロー

```mermaid
graph TB
    subgraph "State Management"
        UserState["user: User or null"]
        CollectedState["collectedStyles: Set of string"]
        FilterState["selectedField: string"]
    end
    
    subgraph "Effects"
        AuthEffect["useEffect: Auth監視"]
        SyncEffect["useEffect: Firestore同期"]
    end
    
    subgraph "Actions"
        Toggle["toggleStyle"]
        ToggleAll["toggleAllPokemonStyles"]
        ToggleGlobal["toggleGlobal"]
    end
    
    AuthEffect --> UserState
    UserState --> SyncEffect
    SyncEffect --> CollectedState
    
    Toggle --> CollectedState
    ToggleAll --> CollectedState
    ToggleGlobal --> CollectedState
    
    FilterState --> UI["UI Rendering"]
    CollectedState --> UI
    
    style UserState fill:#4285f4,color:#fff
    style CollectedState fill:#34a853,color:#fff
    style UI fill:#ea4335,color:#fff
```
