# you-are-up-next

A React-based website for the board game “You Are Up Next”. Implemented dynamic character cards using props and data arrays, smooth hash-based navigation with React Router, interactive UI elements like “Buy” modals, and responsive design using CSS media queries.

## Executioner Chat

The site includes a floating Gemini-powered chat with the Executioner's game
personality. The Gemini key is used only by the server endpoint and must not be
referenced from React code or named as a client-side `VITE_*` variable.

For local development, put the key in the root `.env` file:

```env
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-3.5-flash-lite
```

For production, add `GEMINI_API_KEY` in the Vercel project environment
settings. The chat is fixed to `gemini-3.5-flash-lite`; `GEMINI_MODEL` is kept
in the local example for clarity but is not used to select a different model.
The browser calls `/api/executioner-chat`; it never receives the key.

## Contact Form

Contact messages are sent through `/api/contact`. EmailJS is called from the
server, so no email service credentials are shipped to the browser. Add these
variables to `.env` for development and to the Vercel project settings
for production:

```env
EMAILJS_SERVICE_ID=your-emailjs-service-id
EMAILJS_TEMPLATE_ID=your-emailjs-template-id
EMAILJS_PUBLIC_KEY=your-emailjs-public-key
EMAILJS_PRIVATE_KEY=your-emailjs-private-key
CONTACT_ALLOWED_ORIGINS=http://localhost:5173,https://www.youareupnext.gr,https://youareupnext.gr
```

The EmailJS template should use a fixed recipient and the `name`, `surname`,
`email`, and `message` variables only for message content or reply-to data.
Never use a visitor-controlled value as the template recipient. The endpoint
also applies server-side length and email validation, same-origin checks, a
honeypot, a request-size limit, and a per-instance send limit.

<img width="1904" height="952" alt="image" src="https://github.com/user-attachments/assets/3ce8e048-cf83-416e-9785-5d3b955f723a" />
<img width="1899" height="954" alt="image" src="https://github.com/user-attachments/assets/896f2c02-3a24-4ff1-9066-ff73bcc57ddc" />
<img width="1902" height="567" alt="image" src="https://github.com/user-attachments/assets/81d06af4-827f-4e97-8fd3-d62df1195f9b" />
