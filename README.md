# 🛠️ IT Service Provider Dashboard

A modern, responsive, and fully functional dashboard for an IT service provider company. This application is built with **React**, **TypeScript**, **Ant Design**, **Redux Toolkit**, **Firebase**, and **Vite** — offering a fast, scalable, and maintainable architecture.

🔗 Live: [10fix.netlify.app](https://10.fix.netlify.app)

---

## 🚀 Features

- 🔐 **Authentication** with Firebase (Email & Google login)
- 🎨 **Rich UI** with Ant Design components
- 📊 **Dynamic Charts** using Nivo (Line, Bar, etc.)
- 📝 **WYSIWYG Editor** with `react-draft-wysiwyg`
- 🔄 **Global State Management** with Redux Toolkit & Redux Persist
- 🧠 **Form Validation** with React Hook Form + Zod
- 🌙 **Dark/Light Theme** Ready (if applicable)
- 📅 **Date Handling** with Day.js
- 🔍 **Search Highlighting** with `react-highlight-words`
- 🔔 **Toasts/Notifications** using `sonner`
- ⚡️ Fast bundling and dev experience via Vite

---

## 🧩 Tech Stack

| Technology      | Description                       |
| --------------- | --------------------------------- |
| React           | Frontend Library                  |
| TypeScript      | Typed JavaScript                  |
| Vite            | Lightning-fast Build Tool         |
| Ant Design      | UI Component Library              |
| Redux Toolkit   | Global State Management           |
| Firebase        | Authentication                    |
| Zod             | Runtime Schema Validation         |
| React Hook Form | Form Handling & Validation        |
| Nivo            | Beautiful and customizable charts |

---

## 📁 Project Structure

```bash
src/
├── app.tsx # App bootstrap with routes/layouts
├── main.tsx # Vite entry file
├── index.css # Tailwind/global CSS
├── firebase.init.ts # Firebase config/init
├── assets/ # Static assets (images/icons)
├── auth/ # Auth pages & hooks
├── component/ # Reusable UI components
├── config/ # App-wide constants and config
├── hooks/ # Custom React hooks
├── layout/ # Layout components (Sidebar/Header)
├── lib/ # Utility libraries/helpers
├── pages/ # Page-level components
├── redux/ # Redux slices & store
├── routes/ # Route definitions
├── styles/ # Global SCSS/Tailwind/Ant overrides
├── types/ # Global TS types & interfaces
└── utils/ # Utility functions (date, format, etc.)
```

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/it-service-provider-dashboard.git
cd it-service-provider-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Firebase

Create a file: src/firebase.init.ts

```ts
// Add your Firebase config here
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  ...
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### 4. 🔐 Environment Variables

Create a `.env` file in the root of your project and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Start the dev server

Create a file: src/firebase.init.ts

```bash
npm run dev
```

### 📦 Build for Production

Create a file: src/firebase.init.ts

```bash
npm run build
```

## 📝 License

This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for details.
