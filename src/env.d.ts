/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_E2E?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}