import {
  createContactResponse,
  MAX_CONTACT_REQUEST_LENGTH,
  parseAllowedOrigins,
} from "../server/contact.js";

function getHeader(request, name) {
  const value = request.headers?.[name];
  return Array.isArray(value) ? value[0] : value;
}

function getClientIp(request) {
  return (
    getHeader(request, "x-real-ip") ||
    getHeader(request, "x-forwarded-for")?.split(",")[0].trim() ||
    request.socket?.remoteAddress ||
    "unknown"
  );
}

function parseBody(request) {
  if (typeof request.body !== "string") return request.body;
  if (request.body.length > MAX_CONTACT_REQUEST_LENGTH) return null;

  try {
    return JSON.parse(request.body);
  } catch {
    return null;
  }
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Allow", "POST, OPTIONS");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed." });
    return;
  }

  const result = await createContactResponse({
    body: parseBody(request),
    ipAddress: getClientIp(request),
    origin: getHeader(request, "origin"),
    host: getHeader(request, "x-forwarded-host") || getHeader(request, "host"),
    protocol:
      getHeader(request, "x-forwarded-proto")?.split(",")[0].trim() || "https",
    allowedOrigins: parseAllowedOrigins(
      globalThis.process.env.CONTACT_ALLOWED_ORIGINS,
    ),
    emailjsConfig: {
      serviceId: globalThis.process.env.EMAILJS_SERVICE_ID,
      templateId: globalThis.process.env.EMAILJS_TEMPLATE_ID,
      publicKey: globalThis.process.env.EMAILJS_PUBLIC_KEY,
      privateKey: globalThis.process.env.EMAILJS_PRIVATE_KEY,
    },
  });

  if (result.status === 429) {
    response.setHeader("Retry-After", "60");
  }
  response.status(result.status).json(result.body);
}