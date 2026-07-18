# Password Generator

A secure, client-side password generator built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. Generate strong, customizable passwords instantly — all processing happens in your browser, nothing is sent to any server.

## Features

- **Customizable Length** — Choose between 4 and 64 characters
- **Character Sets** — Toggle uppercase, lowercase, numbers, and symbols on/off
- **Exclude Ambiguous Characters** — Avoid characters like `o`, `O`, `0`, `l`, `I`, `1` that are easy to misread
- **Password Strength Indicator** — Visual bar with labels: Weak, Fair, Good, Strong
- **One-Click Copy** — Copy the generated password to your clipboard instantly
- **Fully Client-Side** — All generation happens in your browser; no data is ever sent to a server
- **Responsive Design** — Works on desktop and mobile

## Tech Stack

- **Framework:** Next.js 16
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## How It Works

The password is generated entirely on the client side using cryptographically random values. You can configure:

- **Length** — Slide from 4 to 64 characters
- **Character Sets** — Toggle uppercase (A-Z), lowercase (a-z), numbers (0-9), and symbols (!@#$...)
- **Exclude Ambiguous** — Removes easily confused characters like `o`, `O`, `0`, `l`, `I`, `1`
- **Strength Meter** — Real-time visual feedback on password strength

## Project Structure

```
frontend/
├── src/
│   └── app/
│       ├── globals.css       # Global styles with Tailwind
│       ├── layout.tsx        # Root layout with metadata
│       ├── page.tsx          # Main page with password generator UI
│       └── lib/
│           └── password.ts   # Password generation & strength logic
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## License

MIT
