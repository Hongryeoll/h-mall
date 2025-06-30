# h-mall 🛒

Next.js + Supabase 기반의 쇼핑몰 프로젝트입니다.  
일반 사용자와 관리자(Admin)의 권한을 구분하여 상품 탐색, 장바구니, 주문, 리뷰, Q&A 기능부터 관리자 전용 상품 관리, 주문 관리 기능까지 제공합니다.

> **배포:** [https://h-malltest.vercel.app](https://h-malltest.vercel.app)

---

## 📚 프로젝트 소개

- Next.js App Router 기반의 풀스택 쇼핑몰
- Supabase를 활용한 인증, 데이터베이스, 스토리지, 서버리스 API 처리
- React Query, React Hook Form 기반의 상태 관리와 폼 처리
- 일반 사용자와 관리자(Admin) 계정 구분 및 미들웨어 기반 권한 처리
- Vercel을 통한 프론트 + 백엔드 통합 클라우드 배포

---

## 🔥 기술 스택

### 🖥️ Frontend

- **Next.js 15 (App Router)**
  - 서버 컴포넌트, 클라이언트 컴포넌트 혼합
  - RSC + SSR + CSR 아키텍처
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 3**
- **React Query (TanStack Query) v5**
  - 서버 상태 및 캐싱
- **React Hook Form**
  - 폼 상태 및 검증

---

### 🔗 Backend / Infra

- **Supabase**
  - Database (PostgreSQL)
  - Auth (JWT + Session 기반)
  - Storage (이미지 및 파일 저장)
  - Edge Functions (서버리스 API)
- **Vercel**
  - 프론트엔드 + API + 서버리스 백엔드 배포

---

## ✨ 주요 기능 (Features)

### 🛍️ 사용자 (User)

- 상품 카테고리 및 상세 페이지 탐색
- 장바구니 담기, 수정, 삭제
- 주문 생성 및 주문 내역 조회
- 상품 리뷰 작성/수정/삭제
- 상품 QnA 등록/수정/삭제 (비밀글 지원)
- 마이페이지에서 개인 정보 및 주문 관리

### 🔧 관리자 (Admin)

- 상품 목록 조회, 등록, 수정, 삭제
- 카테고리 및 섹션 관리
- 주문 내역 관리
- 리뷰 및 QnA 관리 (답변 가능)

### 🔐 인증 및 권한

- Supabase 기반 회원가입/로그인/로그아웃
- 미들웨어를 통한 접근 제어 (관리자/일반 사용자 구분)

### 📦 기타

- 반응형 UI
- 이미지 스토리지 연동 (Supabase Storage)
- 서버 액션(Server Actions) 기반 API 처리
- React Query 기반 서버 상태 관리 및 캐싱

## 📂 폴더 구조 (Folder Structure)

```plaintext
src/
├── actions/           # 서버 액션 (Server Actions)
│   ├── auth/          # 인증 관련 액션
│   ├── menu/          # 메뉴/카테고리 관련 액션
│   └── product/       # 상품 관련 액션
├── app/               # Next.js App Router 라우트
│   ├── (admin)/       # 관리자 페이지 그룹
│   ├── (login)/       # 로그인 및 회원가입 페이지 그룹
│   ├── (mall)/        # 사용자용 쇼핑몰 페이지 그룹
│   ├── auth/          # 인증 콜백 및 에러 처리
│   ├── layout.tsx     # 전역 레이아웃
│   ├── page.tsx       # 메인 페이지
│   └── not-found.tsx  # 404 처리
├── assets/            # 아이콘, 폰트, 스타일 등 정적 자산
├── components/        # UI 컴포넌트
├── data/              # 키워드 데이터, 메뉴 데이터
├── hooks/             # 커스텀 훅 (useCart, useOrder 등)
├── library/           # Supabase 클라이언트 및 유틸
├── types/             # 전역 타입 정의
├── middleware.ts      # 인증 및 권한 미들웨어
```

## 🔐 미들웨어 인증 및 권한 처리

### ✅ 경로 접근 규칙

| 경로                    | 권한                            |
| ----------------------- | ------------------------------- |
| `/admin/**`             | **관리자만 접근 가능**          |
| `/order/**`, `/cart/**` | **로그인한 사용자만 접근 가능** |
| `/mypage/**`            | **로그인한 사용자만 접근 가능** |
| `/checkout/**`          | **로그인한 사용자만 접근 가능** |

### ✅ 동작 방식

- Supabase 세션을 기반으로 JWT 확인
- 미들웨어에서 로그인 상태 및 관리자 권한 판별
- 권한 미충족 시 로그인 페이지 또는 메인 페이지로 리디렉트

## 🗄️ 데이터베이스 구조

### 🔸 주요 테이블

| 테이블명      | 설명                             |
| ------------- | -------------------------------- |
| `users`       | 사용자 정보 (Supabase Auth 연동) |
| `products`    | 상품 정보                        |
| `categories`  | 카테고리 정보                    |
| `sections`    | 중간 카테고리                    |
| `subsections` | 세부 카테고리                    |
| `subtabs`     | 세부 탭                          |
| `cart_items`  | 장바구니 아이템                  |
| `orders`      | 주문 정보                        |
| `order_items` | 주문 상세                        |
| `reviews`     | 상품 리뷰                        |
| `qna`         | 상품 QnA                         |

## 🗺️ H-Mall Database ERD

![Database ERD](./public/ERD-image.png)

---

## 🗄️ Tables

### 🛍️ `products`

| Column      | Type      | Description         |
| ----------- | --------- | ------------------- |
| id          | uuid      | PK. Product ID      |
| name        | text      | Product name        |
| description | text      | Product description |
| price       | numeric   | Base price          |
| category_id | uuid      | FK. categories.id   |
| section_id  | uuid      | FK. sections.id     |
| subtab_id   | uuid      | FK. subtabs.id      |
| created_at  | timestamp | Created date        |

---

### 🗂️ `categories`

| Column | Type | Description          |
| ------ | ---- | -------------------- |
| id     | uuid | PK. Category ID      |
| code   | text | Unique category code |
| name   | text | Category name        |

### 🗂️ `sections`

| Column      | Type | Description       |
| ----------- | ---- | ----------------- |
| id          | uuid | PK. Section ID    |
| category_id | uuid | FK. categories.id |
| name        | text | Section name      |

### 🗂️ `subtabs`

| Column     | Type | Description     |
| ---------- | ---- | --------------- |
| id         | uuid | PK. Subtab ID   |
| section_id | uuid | FK. sections.id |
| name       | text | Subtab name     |

---

### 🛒 `cart_items`

| Column     | Type      | Description      |
| ---------- | --------- | ---------------- |
| id         | uuid      | PK. Cart item ID |
| user_id    | uuid      | FK. userinfo.id  |
| product_id | uuid      | FK. products.id  |
| quantity   | int       | Quantity         |
| created_at | timestamp | Created date     |

---

### 🧾 `orders`

| Column       | Type      | Description           |
| ------------ | --------- | --------------------- |
| id           | uuid      | PK. Order ID          |
| user_id      | uuid      | FK. userinfo.id       |
| total_amount | numeric   | Total order amount    |
| status       | text      | Order status          |
| receiver     | text      | Receiver name         |
| phone        | text      | Receiver phone number |
| address      | text      | Receiver address      |
| created_at   | timestamp | Order date            |

### 📦 `order_items`

| Column     | Type    | Description                  |
| ---------- | ------- | ---------------------------- |
| id         | uuid    | PK. Order item ID            |
| order_id   | uuid    | FK. orders.id                |
| product_id | uuid    | FK. products.id              |
| quantity   | int     | Quantity                     |
| unit_price | numeric | Price per unit at order time |

---

### ⭐ `reviews`

| Column     | Type      | Description         |
| ---------- | --------- | ------------------- |
| id         | uuid      | PK. Review ID       |
| user_id    | uuid      | FK. userinfo.id     |
| product_id | uuid      | FK. products.id     |
| rating     | int       | Rating (1-5)        |
| content    | text      | Review content      |
| images     | text[]    | Array of image URLs |
| created_at | timestamp | Created date        |

---

### ❓ `qnas`

| Column     | Type      | Description             |
| ---------- | --------- | ----------------------- |
| id         | uuid      | PK. QnA ID              |
| user_id    | uuid      | FK. userinfo.id         |
| product_id | uuid      | FK. products.id         |
| question   | text      | QnA question            |
| answer     | text      | QnA answer              |
| is_private | boolean   | Private question toggle |
| created_at | timestamp | Created date            |

---

### 👤 `userinfo`

| Column     | Type      | Description  |
| ---------- | --------- | ------------ |
| id         | uuid      | PK. User ID  |
| email      | text      | User email   |
| name       | text      | User name    |
| phone      | text      | User phone   |
| created_at | timestamp | Created date |

---

## 🔍 Views

- 🔍 **`products_with_review`**
  → 상품 정보 + 평균 별점 + 리뷰 수 포함

- 🔍 **`qna_with_user_info`**
  → QnA 정보 + 사용자 정보 포함

- 🔍 **`reviews_with_userinfo`**
  → 리뷰 + 작성자 이름 및 이메일 포함

---

## 🚦 Row Level Security (RLS) Policy

| Table       | Public | Logged-In User | Admin |
| ----------- | ------ | -------------- | ----- |
| products    | ✅     | ✅             | ✅    |
| categories  | ✅     | ✅             | ✅    |
| sections    | ✅     | ✅             | ✅    |
| subtabs     | ✅     | ✅             | ✅    |
| cart_items  | ❌     | ✅ (본인만)    | ✅    |
| orders      | ❌     | ✅ (본인만)    | ✅    |
| order_items | ❌     | ✅ (본인만)    | ✅    |
| reviews     | ❌     | ✅ (본인만)    | ✅    |
| qnas        | ❌     | ✅ (본인만)    | ✅    |
| userinfo    | ❌     | ✅ (본인만)    | ✅    |

---
