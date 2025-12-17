# アーキテクチャ図

このドキュメントは、ポケモンスリープ寝顔図鑑管理アプリのアーキテクチャを図解します。

## システム全体構成

```mermaid
graph TB
    subgraph "Client (Browser)"
        UI[Next.js App<br/>React Components]
        Auth[Auth State]
        LocalState[Local State<br/>React]
        LocalStorage[LocalStorage<br/>ゲストユーザー用]
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
    UI --> LocalStorage
    UI --> Firestore
    FAuth -.認証トークン.-> Firestore
    LocalStorage -.起動時リストア.-> UI
    LocalStorage -.オフラインキャッシュ.-> UI
    
    style UI fill:#4285f4,color:#fff
    style FAuth fill:#ffca28,color:#000
    style Firestore fill:#ff6f00,color:#fff
    style LocalStorage fill:#34a853,color:#fff
```

## コンポーネント構成
 
 ```mermaid
 graph LR
     subgraph "Pages"
         Page[app/page.tsx<br/>Main Dashboard]
         Layout[app/layout.tsx<br/>Root Layout]
     end
     
     subgraph "Components"
         AuthBtn[AuthButton]
         PokemonCard["PokemonCard<br/>(Memoized)"]
         FilterPanel[FilterPanel]
         ProgressSummary[ProgressSummary]
         StatusModal[CollectionStatusModal]
         StatusItem[CollectionStatusItem]
         ErrorBoundary[ErrorBoundary]
     end
     
     subgraph "Hooks"
         useAuth[useAuth]
         useCollection[useCollection]
         useFilters[useFilters]
         useProgress[useProgress]
     end
     
     subgraph "Data Layer"
         MockData[mockData.ts]
         DB[lib/db.ts]
         LocalStore[lib/localStorage.ts]
     end
     
     Layout --> ErrorBoundary
     ErrorBoundary --> Page
     
     Page --> useAuth
     Page --> useCollection
     Page --> useFilters
     Page --> useProgress
     
     Page --> AuthBtn
     Page --> PokemonCard
     Page --> FilterPanel
     Page --> ProgressSummary
     Page --> StatusModal
     StatusModal --> StatusItem
     
     useCollection --> DB
     useCollection --> LocalStore
     useFilters --> DB
     
     style Page fill:#4285f4,color:#fff
     style ErrorBoundary fill:#ea4335,color:#fff
     style useCollection fill:#fbbc04,color:#000
 ```
 
 ## データフロー（ログイン時）
 
 ```mermaid
 sequenceDiagram
     participant U as User
     participant Page as app/page.tsx
     participant Hook as useAuth
     participant FB as Firebase Auth
     participant FS as Firestore
     
     U->>Page: アクセス
     Page->>Hook: useAuth()
     Hook->>FB: onAuthStateChanged()
     FB-->>Hook: User認証情報
     Hook-->>Page: user state更新
     
     Page->>FS: useCollection -> subscribeToUserCollection
     FS-->>Page: リアルタイム同期開始
     Page->>Page: collectedStyles更新
 ```
 
 ## データフロー（寝顔選択時 - ログインユーザー）
 
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

## データフロー（寝顔選択時 - ゲストユーザー）

```mermaid
sequenceDiagram
    participant U as User
    participant Card as PokemonCard
    participant Hook as useCollection
    participant LS as LocalStorage

    U->>Card: 寝顔スタイルをクリック
    Card->>Hook: toggleStyle(styleId)
    Hook->>Hook: setCollectedStyles (関数型更新)
    Note right of Hook: 即座にメモリ内ステートを更新
    Hook-->>Card: 新しいcollectedStyles
    Card-->>U: UI更新

    Hook->>Hook: useEffect (ステート変更検知)
    Hook->>LS: saveToLocalStorage()
    LS-->>Hook: 保存完了
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
        
        Preferences[preferences/]
        FiltersDoc["filters"]
        FilterData["selectedField<br/>selectedSleepType<br/>showUncollectedOnly"]
    end
    
    Users --> UserDoc
    UserDoc --> Collections
    UserDoc --> Preferences
    Collections --> PokemonDoc
    PokemonDoc --> Data
    Preferences --> FiltersDoc
    FiltersDoc --> FilterData
    
    style Users fill:#ff6f00,color:#fff
    style Collections fill:#ff6f00,color:#fff
    style Data fill:#4285f4,color:#fff
    style Preferences fill:#ff6f00,color:#fff
    style FilterData fill:#4285f4,color:#fff
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
      },
      "preferences": {
        "filters": {
          "selectedField": "all",
          "selectedSleepType": "all",
          "showUncollectedOnly": false
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

## データ同期フロー（Server Wins戦略）

```mermaid
sequenceDiagram
    participant User
    participant LS as LocalStorage
    participant App
    participant FS as Firestore
    
    User->>App: アプリ起動
    LS->>App: 前回状態をロード
    App->>User: 即座に表示 (Cache)
    
    App->>FS: 接続・同期開始
    FS-->>App: 最新データ (Master)
    App->>LS: 最新状態で更新
    App->>User: 表示更新 (Master)
    
    Note over App, FS: サーバーデータが優先される
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
    FBHost[Firebase Hosting<br/>本番環境]
    
    Dev -->|ビルド| Build
    Build -->|デプロイ| FBHost
    
    FBHost --> Users[エンドユーザー]
    
    style FBHost fill:#ffca28,color:#000
```

## 状態管理フロー
 
 ```mermaid
 graph TB
     subgraph "Custom Hooks"
         useAuth["useAuth<br/>(User State)"]
         useCollection["useCollection<br/>(Collected Styles)"]
         useFilters["useFilters<br/>(Filter State)"]
         useProgress["useProgress<br/>(Calculated Stats)"]
     end
     
     subgraph "UI Components"
         Page[app/page.tsx]
         FilterPanel[FilterPanel]
         PokemonCard[PokemonCard]
         ProgressSummary[ProgressSummary]
     end
     
     useAuth --> Page
     useCollection --> Page
     useFilters --> Page
     useProgress --> Page
     
     Page -->|Props| FilterPanel
     Page -->|Props| PokemonCard
     Page -->|Props| ProgressSummary
     
     FilterPanel -->|Action| useFilters
     PokemonCard -->|Action| useCollection
     
     style useCollection fill:#34a853,color:#fff
     style Page fill:#4285f4,color:#fff
 ```

 ## エラーハンドリング設計

 ### 1. Error Boundary
 - **範囲**: アプリケーション全体 (`app/layout.tsx` でラップ)
 - **捕捉対象**: レンダリング中の予期せぬエラー
 - **動作**: エラー画面を表示し、アプリケーションのクラッシュを防止
 - **開発環境**: エラー詳細（スタックトレース）を表示

 ### 2. 入力バリデーション
 - **場所**: `lib/db.ts`, `lib/localStorage.ts`
 - **対象**: 全てのデータ書き込み操作
 - **チェック内容**:
   - 型チェック (string, boolean, array)
   - 必須値チェック (userId, pokemonId)
   - 空文字チェック
   - 容量制限チェック (LocalStorage 5MB)

 ### 3. 非同期エラー処理
 - **場所**: `hooks/useCollection.ts`
 - **動作**:
   - Optimistic UI更新後のAPI呼び出し失敗をcatch
   - **Toast通知**: `window.alert` の代わりに `ToastProvider` を使用し、非ブロッキングな通知を表示
   - **リトライ**: ネットワークエラー等はFirestore SDKが自動リトライするため、即座にエラーとはしない
   - 重大なエラー（権限等）のみ通知を行う
