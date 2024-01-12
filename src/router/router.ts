import { createBrowserRouter } from 'react-router-dom';

import authRouter from './authRouter';
import mainRouter from './mainRouter';
import adminRouter from './adminRouter';

const routes = [...authRouter, ...mainRouter, ...adminRouter];

const router = createBrowserRouter(routes);

export default router;
