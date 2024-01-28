import { config } from "~/libs/modules/config/config.js";
import { database } from "~/libs/modules/database/database.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { authController } from "~/modules/auth/auth.js";
import { userController } from "~/modules/users/users.js";

import { BaseServerApplication } from "./base-server-application.js";
import { BaseServerApplicationApi } from "./base-server-application-api.js";

const apiV1 = new BaseServerApplicationApi(
  "v1",
  config,
  ...authController.routes,
  ...userController.routes,
);
const serverApplication = new BaseServerApplication({
  title: "CalmPal",
  config,
  logger,
  database,
  apis: [apiV1],
});

export { serverApplication };
export { type ServerApplicationRouteParameters } from "./libs/types/types.js";