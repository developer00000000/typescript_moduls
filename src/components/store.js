import { configureStore } from "@reduxjs/toolkit";

import getDataReducer from "./fetchData"

const store = configureStore({
    reducer: {
       getData: getDataReducer,
    }
});

export default store