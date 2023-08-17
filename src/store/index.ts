import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import authService from "./services/authService";
import typeOfServiceService from "./services/typeOfServiceService";
import reportService from "./services/reportService";
import userService from "./services/userService";
import locationService from "./services/locationService";
import categoryService from "./services/categoryService";
import taxrateService from "./services/taxrateService";
import buisnessService from "./services/buisnessService";
import supplierService from "./services/supplierService";
import riderService from "./services/riderService";
import roleService from "./services/roleService";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authService.reducerPath]: authService.reducer,
    [typeOfServiceService.reducerPath]: typeOfServiceService.reducer,
    [reportService.reducerPath]: reportService.reducer,
    [userService.reducerPath]: userService.reducer,
    [locationService.reducerPath]: locationService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [taxrateService.reducerPath]: taxrateService.reducer,
    [buisnessService.reducerPath]: buisnessService.reducer,
    [supplierService.reducerPath]: supplierService.reducer,
    [riderService.reducerPath]: riderService.reducer,
    [roleService.reducerPath]: roleService.reducer,
    authReducer: authReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authService.middleware,
      typeOfServiceService.middleware,
      reportService.middleware,
      userService.middleware,
      locationService.middleware,
      categoryService.middleware,
      taxrateService.middleware,
      buisnessService.middleware,
      supplierService.middleware,
      riderService.middleware,
      roleService.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
