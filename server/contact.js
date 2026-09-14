const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";
const MAX_NAME_LENGTH = 80;
const MAX_SURNAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;
export const MAX_CONTACT_REQUEST_LENGTH = 16000;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

const HTML_ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const recentRequests = new Map();

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeText(value, maxLength, allowLineBreaks = false) {
  if (typeof value !== "string") return null;

  const normalized = value.normalize("NFKC").replace(/\r\n?/g, "\n").trim();
  const containsControlCharacter = [...normalized].some((character) => {
    const codePoint = character.codePointAt(0);
    return (
      codePoint <= 0x1f ||
      codePoint === 0x7f ||
      codePoint === 0x2028 ||
      codePoint === 0x2029
    );
  });
  if (!allowLineBreaks && containsControlCharacter) {
    return null;
  }
  return normalized && normalized.length <= maxLength ? normalized : null;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => HTML_ENTITIES[character]);
}

function validateContactBody(body) {
  if (!isPlainObject(body)) return null;

  const name = normalizeText(body.name, MAX_NAME_LENGTH);
  const surname = normalizeText(body.surname, MAX_SURNAME_LENGTH);
  const email = normalizeText(body.email, MAX_EMAIL_LENGTH);
  const message = normalizeText(body.message, MAX_MESSAGE_LENGTH, true);

  if (
    !name ||
    name.length < 2 ||
    !surname ||
    surname.length < 2 ||
    !email ||
    !EMAIL_PATTERN.test(email) ||
    !message ||
    message.length < 5
  ) {
    return null;
  }

  return { name, surname, email, message };
}

function isRateLimited(ipAddress) {
  const now = Date.now();

  for (const [key, request] of recentRequests) {
    if (now - request.startedAt >= RATE_LIMIT_WINDOW_MS) {
      recentRequests.delete(key);
    }
  }

  const key = ipAddress || "unknown";
  const request = recentRequests.get(key);

  if (!request) {
    recentRequests.set(key, { startedAt: now, count: 1 });
    return false;
  }

  if (request.count >= MAX_REQUESTS_PER_WINDOW) return true;

  request.count += 1;
  return false;
}

function hasRequiredEmailConfig(emailjsConfig) {
  return [
    emailjsConfig?.serviceId,
    emailjsConfig?.templateId,
    emailjsConfig?.publicKey,
    emailjsConfig?.privateKey,
  ].every((value) => typeof value === "string" && value.trim());
}

function isAllowedOrigin({ origin, host, protocol, allowedOrigins }) {
  if (!origin) return true;

  if (allowedOrigins.length > 0) {
    return allowedOrigins.includes(origin);
  }

  if (!host) return false;
  return origin === `${protocol || "https"}://${host}`;
}

async function sendContactEmail(fields, emailjsConfig) {
  const response = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: emailjsConfig.serviceId,
      template_id: emailjsConfig.templateId,
      user_id: emailjsConfig.publicKey,
      accessToken: emailjsConfig.privateKey,
      template_params: {
        name: escapeHtml(fields.name),
        surname: escapeHtml(fields.surname),
        email: escapeHtml(fields.email),
        message: escapeHtml(fields.message),
      },
    }),
  });

  if (!response.ok) {
    console.error("Contact email provider failed", response.status);
    return false;
  }

  return true;
}

export function parseAllowedOrigins(value) {
  if (typeof value !== "string") return [];

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export async function createContactResponse({
  body,
  ipAddress,
  origin,
  host,
  protocol,
  allowedOrigins = [],
  emailjsConfig,
}) {
  if (!isAllowedOrigin({ origin, host, protocol, allowedOrigins })) {
    return { status: 403, body: { error: "Forbidden." } };
  }

  if (!isPlainObject(body)) {
    return { status: 400, body: { error: "Invalid request." } };
  }

  if (JSON.stringify(body).length > MAX_CONTACT_REQUEST_LENGTH) {
    return { status: 413, body: { error: "Request is too large." } };
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return { status: 200, body: { ok: true } };
  }

  const fields = validateContactBody(body);
  if (!fields) {
    return { status: 400, body: { error: "Please check the form fields." } };
  }

  if (isRateLimited(ipAddress)) {
    return {
      status: 429,
      body: { error: "Too many messages. Please try again later." },
    };
  }

  if (!hasRequiredEmailConfig(emailjsConfig)) {
    console.error("Contact email configuration is incomplete");
    return { status: 503, body: { error: "Contact service is unavailable." } };
  }

  try {
    const sent = await sendContactEmail(fields, emailjsConfig);
    if (!sent) {
      return { status: 502, body: { error: "Message could not be sent." } };
    }
  } catch (error) {
    console.error("Contact email request failed", error);
    return { status: 502, body: { error: "Message could not be sent." } };
  }

  return { status: 200, body: { ok: true } };
}