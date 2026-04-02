/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string
  readonly VITE_EMAILJS_TEMPLATE_ID: string
  readonly VITE_EMAILJS_PUBLIC_KEY: string
  readonly VITE_WHATSAPP_E164: string
  readonly VITE_LINKEDIN_URL: string
  readonly VITE_FACEBOOK_URL: string
  readonly VITE_GITHUB_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
