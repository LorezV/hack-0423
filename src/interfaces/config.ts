export interface IConfig {
  project: string;
  server: {
    host: string;
    port: number;
  };
  jwt: {
    accessSecret: string;
    accessExpires: number;
    refreshSecret: string;
    refreshExpires: number;
  };
  images: {
    path: string;
    maxSize: number;
  };
}
