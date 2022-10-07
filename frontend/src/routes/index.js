import {createBrowserRouter} from 'react-router-dom'
import {publicRoutes} from 'routes/PublicRoutes'
import {adminRoutes} from 'routes/AdminRoutes'
import {authRoutes} from 'routes/AuthRoutes'

export const router = createBrowserRouter(
  [...publicRoutes, ...authRoutes, ...adminRoutes]
);
