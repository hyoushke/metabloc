export class ConfigHelper {
  private static VITE_SERVER_URL = process.env.VITE_SERVER_URL

  private static VITE_APP_URL = process.env.VITE_APP_URL

  public static get(_string: keyof IAppEnvironment): string | undefined {
    return this[_string]
  }
}
