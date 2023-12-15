import { createBrowserRouter } from "react-router-dom";

import authRouter from "./authRouter";
import mainRouter from "./mainRouter";

const routes = [...authRouter, ...mainRouter];

const router = createBrowserRouter(routes);

export default router;
