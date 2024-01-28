import { type AppEnvironment } from "~/libs/enums/enums.ts";
import { type ValueOf } from "~/libs/types/types.ts";

import { type Config, type EnvironmentSchema } from "./libs/types/types.ts";

class BaseConfig implements Config {
  public ENV: EnvironmentSchema;

  public constructor() {
    this.ENV = this.envSchema;
  }

  private get envSchema(): EnvironmentSchema {
    return {
      APP: {
        ENVIRONMENT: import.meta.env.VITE_APP_NODE_ENV as ValueOf<
          typeof AppEnvironment
        >,
      },
      API: {
        ORIGIN_URL: import.meta.env.VITE_APP_API_ORIGIN_URL as string,
      },
    };
  }
}

export { BaseConfig };
