# Bank Management Frontend

Frontend React terpisah untuk backend Spring Boot `bank-management`.

## Stack
- Vite + React + TypeScript
- Tailwind CSS
- React Router
- TanStack Query
- Axios (dengan auto refresh token)
- React Hook Form + Zod
- Komponen UI dasar ala shadcn (`Button`, `Input`, `Card`)

## Menjalankan
1. Install dependency
```bash
npm install
```

2. Set env
```bash
cp .env.example .env
```

3. Jalankan
```bash
npm run dev
```

Default URL frontend: `http://localhost:5173`  
Default API di frontend: `/api/v1` (diproxy Vite ke `http://localhost:8080`)

## Flow Auth yang sudah siap
- Login: `POST /auth/login`
- Simpan access + refresh token di localStorage
- Auto refresh access token saat kena `401` (kecuali endpoint login/refresh)
- Logout: `POST /auth/logout`

## Struktur penting
- `src/lib/http.ts`: axios instance + interceptor refresh token
- `src/lib/auth-storage.ts`: storage session auth
- `src/pages/LoginPage.tsx`: form login
- `src/pages/DashboardPage.tsx`: cek profile `/auth/me`
- `src/layouts/AppLayout.tsx`: layout app + logout
