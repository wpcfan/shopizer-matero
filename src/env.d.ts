declare namespace NodeJS {
  export interface ProcessEnv {
    /**
     * Built-in environment variable.
     * @see Docs https://github.com/chihab/ngx-env#ng_app_env.
     */
    readonly NG_APP_ENV: string;

    // Replace the line below with your environment variable for better type checking
    readonly NG_APP_MCE_API_KEY: string;
  }
}
