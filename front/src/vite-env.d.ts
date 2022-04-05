/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_DOMAIN: string;
  readonly VITE_CLIENTE_ID: string;
  readonly VITE_AUDIENCE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
