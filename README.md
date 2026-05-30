<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&color=0:FF512F,50:F09819,100:FF6B6B&height=240&section=header&text=NewsTracker&fontSize=80&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Your%20Daily%20Dose%20of%20Global%20Headlines&descSize=22&descAlignY=62&descAlign=50"/>

<h3>📰 A Lightning-Fast, AI-Powered News Aggregator Built with Modern React ⚡</h3>

<p><em>Powered by React • Zustand • Google Gemini AI • Bootstrap • NewsData.io API</em></p>

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black&labelColor=000000"/>
  <img src="https://img.shields.io/badge/Zustand-4D4D4D?style=for-the-badge&logo=react&logoColor=white&labelColor=000000"/>
  <img src="https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white&labelColor=000000"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white&labelColor=000000"/>
  <img src="https://img.shields.io/badge/NewsData.io-API-FF6B6B?style=for-the-badge&labelColor=000000"/>
</p>

<p>
  <img src="https://img.shields.io/badge/Status-Live-00C853?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Architecture-Functional_Components-4285F4?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge"/>
</p>

</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 🎬 Live Preview

> **[🚀 View Live on Vercel](https://news-tracker-git-main-ameers-projects-44e10a15.vercel.app/)** *(Note: AI features require a local API key for security reasons)*

<div align="center">
  <img src="https://github.com/user-attachments/assets/c992049b-67a5-4d7c-98bc-18ccb701726f" width="85%" alt="NewsApp Home"/>
</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features (New!)](#-key-features-new)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation & Setup](#-installation--setup)
- [🔐 AI & API Configuration](#-ai--api-configuration)
- [👨‍💻 Author](#-author)

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 🌟 Overview

**NewsTracker** is a highly professional, **AI-powered single-page application (SPA)** built with **Modern React (Functional Components & Hooks)**. It fetches real-time global headlines via the **[NewsData.io API](https://newsdata.io/)** and offers an unparalleled reading experience with state-of-the-art frontend architecture.

Moving beyond standard fetching, NewsTracker implements **Zustand** for global state management, **Infinite Scrolling** for seamless pagination, a stunning **Glassmorphism Light/Dark Theme**, and direct integration with **Google Gemini AI** for instant article summarization.

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## ✨ Key Features (New!)

<table>
  <tr>
    <td width="50%">
      <h3>🧠 AI Summarization (Gemini 2.5)</h3>
      <p>Integrated with Google's Generative AI. Users can click "✨ Summarize" on any article to instantly generate a concise 2-bullet point summary of the content.</p>
    </td>
    <td width="50%">
      <h3>💾 Global State & Persistence</h3>
      <p>State management powered by <b>Zustand</b>. User preferences (Theme, Country) and saved Bookmarks persist across sessions via <code>localStorage</code>.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🌓 Dynamic Glassmorphism Theme</h3>
      <p>A highly premium UI utilizing CSS-variables to instantly toggle between crisp Light Mode and immersive Dark Mode with blurred glass elements.</p>
    </td>
    <td width="50%">
      <h3>♾️ Infinite Scrolling Feed</h3>
      <p>Clunky pagination is gone. Uses <code>react-infinite-scroll-component</code> to auto-fetch and render new articles as the user scrolls, creating a seamless feed.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔍 Debounced Real-Time Search</h3>
      <p>Live search functionality that filters global headlines instantly. API requests are optimized using custom debouncing logic.</p>
    </td>
    <td width="50%">
      <h3>🔖 Bookmarking System</h3>
      <p>Save articles for later with a single click. View all saved content on a dedicated <code>/bookmarks</code> route managed by React Router.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🦴 Skeleton Loaders</h3>
      <p>Improves perceived performance by rendering animated skeleton cards (using <code>react-loading-skeleton</code>) instead of generic spinners while data is fetching.</p>
    </td>
    <td width="50%">
      <h3>🛡️ Graceful Error Handling</h3>
      <p>Custom fallback UIs handle API rate-limits and 404s gracefully without crashing the React application.</p>
    </td>
  </tr>
</table>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 🏗️ Architecture

### 🔥 Modern React & Zustand Flow

NewsTracker has been completely overhauled from legacy Class components into **Modern Functional Components** utilizing React Hooks (`useState`, `useEffect`) and **Zustand** for centralized state.

```text
                ┌─────────────────────────────┐
                │     👤 USER (Browser)       │
                └──────────────┬──────────────┘
                               │
                               ▼
        ╔══════════════════════════════════════════════╗
        ║         🧠 ZUSTAND GLOBAL STORE              ║
        ║   (Theme, Search, Country, Bookmarks)        ║
        ╚══════════════════════════════════════════════╝
                               │
        ┌──────────────────────┼───────────────────────┐
        ▼                      ▼                       ▼
 ┌──────────────┐     ┌────────────────┐      ┌──────────────┐
 │ 🧭 Navbar    │     │ 📰 News Feed   │      │ 🃏 News Card │
 │ (Search/Mode)│     │ (Infinite)     │      │ (AI/Bookmark)│
 └──────────────┘     └────────┬───────┘      └────────┬─────┘
                               │                       │
                               ▼                       ▼
                ┌─────────────────────────────┐  ┌────────────────┐
                │  📡 NewsData.io API Fetch   │  │ ✨ Gemini AI   │
                │  (Real-Time Headlines)      │  │ (Summarizer)   │
                └─────────────────────────────┘  └────────────────┘
```

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:---|:---|:---|
| ⚛️ **Framework** | `React 18` | Modern Functional Component UI |
| 🧠 **State Mgmt** | `Zustand` | Lightweight, scalable global state |
| ✨ **Artificial Intelligence** | `@google/generative-ai` | Article Summarization (Gemini 2.5) |
| 🛣️ **Routing** | `React Router DOM` | Client-side SPA navigation |
| 🎨 **Styling** | `CSS Variables / Bootstrap` | Glassmorphism & layout |
| ♾️ **Pagination** | `react-infinite-scroll` | Seamless content loading |
| 🦴 **UX Enhancements** | `react-loading-skeleton` | Perceived performance optimization |
| 🔣 **Iconography** | `Lucide React` | Clean, modern vector icons |
| 🌐 **Deployment** | `Vercel` | CI/CD cloud hosting |

</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ameer2402/NewsTracker.git
cd NewsTracker
```

### 2️⃣ Install Dependencies

```bash
npm install
```

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 🔐 AI & API Configuration

This app requires two API keys to function fully locally.

1. **NewsData.io API Key:** For fetching live articles.
2. **Google Gemini API Key:** For the AI summarization feature.

Create a `.env` file in the project root and add your keys:

```env
REACT_APP_MEDIASTACK_API_KEY=YOUR_NEWSDATA_KEY
REACT_APP_GEMINI_API_KEY=YOUR_GEMINI_KEY
```

> 🔒 **Security Note:** The `.env` file is included in `.gitignore` to prevent leaking API keys to the public repository. This is an intentional security architecture choice.

### 🚀 Run Locally
```bash
npm start
```
Visit `http://localhost:3000` to interact with the full, AI-powered application!

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

## 👨‍💻 Author

<div align="center">

### **Mohammed Ameer Khan**

*Full Stack Software Engineer • Ex-Google Apprentice • AI Builder*

<p>
  <a href="https://www.linkedin.com/in/mohammed-ameerkhan-22368626a/">
    <img src="https://img.shields.io/badge/LinkedIn-CONNECT-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=000000"/>
  </a>
  <a href="mailto:ameerkhan20241a0497@gmail.com">
    <img src="https://img.shields.io/badge/Email-REACH%20OUT-D14836?style=for-the-badge&logo=gmail&logoColor=white&labelColor=000000"/>
  </a>
  <a href="https://github.com/ameer2402">
    <img src="https://img.shields.io/badge/GitHub-FOLLOW-181717?style=for-the-badge&logo=github&logoColor=white&labelColor=000000"/>
  </a>
  <a href="https://portfolio-frontend-rho-blond.vercel.app/">
    <img src="https://img.shields.io/badge/Portfolio-EXPLORE-FF5722?style=for-the-badge&logo=googlechrome&logoColor=white&labelColor=000000"/>
  </a>
</p>

</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%"/>
</div>

<div align="center">

### ⭐ If NewsTracker keeps you informed, **drop a star!** It motivates further development. 🚀

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:F09819,50:FF512F,100:FF6B6B&height=140&section=footer&text=Built%20with%20❤️%20by%20Ameer%20Khan&fontSize=22&fontColor=ffffff&animation=twinkling&fontAlignY=70"/>

</div>
