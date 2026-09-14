# you-are-up-next
A React-based website for the board game “You Are Up Next”. Implemented dynamic character cards using props and data arrays, smooth hash-based navigation with React Router, interactive UI elements like “Buy” modals, and responsive design using CSS media queries.

## Executioner Chat

The site includes a floating Gemini-powered chat with the Executioner's game
personality. The Gemini key is used only by the server endpoint and must not be
referenced from React code or named as a client-side `VITE_*` variable.

For local development, put the key in a root `.env.local` file using the names
shown in `.env.example`:

```env
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-3.6-flash
```

The Vite development server also understands the existing `src/.env` file as a
temporary compatibility path, but moving the key to root `.env.local` and
renaming it to `GEMINI_API_KEY` is recommended. For production, add
`GEMINI_API_KEY` and optionally `GEMINI_MODEL` in the Vercel project environment
settings. The browser calls `/api/executioner-chat`; it never receives the key.

<img width="1904" height="952" alt="image" src="https://github.com/user-attachments/assets/3ce8e048-cf83-416e-9785-5d3b955f723a" />
<img width="1899" height="954" alt="image" src="https://github.com/user-attachments/assets/896f2c02-3a24-4ff1-9066-ff73bcc57ddc" />
<img width="1902" height="567" alt="image" src="https://github.com/user-attachments/assets/81d06af4-827f-4e97-8fd3-d62df1195f9b" />


