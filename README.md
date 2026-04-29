# SQL Trainer

A modern SQL practice app built with Next.js 15, TypeScript, and CSS Modules.

## What it does

- offers hands-on SQL exercises across DDL, DML, DQL, and JOIN topics
- validates answers with lightweight SQL checks and guided feedback
- supports light mode, dark mode, and German/English UI switching
- stores training progress locally in the browser

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
```

## Project structure

- `src/app` – app routes, layout, global styles
- `src/components` – reusable UI and trainer components
- `src/data` – exercise data and shared types
- `src/hooks` – local progress, locale, and trainer state
- `src/lib` – SQL validation and i18n helpers
