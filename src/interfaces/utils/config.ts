export interface IConfig {
  server: {
    host: string;
    port: number;
  };
  jwt: {
    accessSecret: string;
    accessExpiresIn: number;
    refreshSecret: string;
    refreshExpiresIn: number;
  };
}
