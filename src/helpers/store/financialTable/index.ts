import { createSlice } from "@reduxjs/toolkit";
import FinancialTableServiceAPI from "../../../services/financialTable";
import { AppDispatch, RootState } from "../store";

type S = {
  data: any;
  fetching: boolean;
  fetched: boolean;
  error: Error | null;
};

export const financialTableSlice = createSlice({
  // ini state global buat financial
  name: "financialTable",
  initialState: {
    data: {},
    fetching: false,
    fetched: false,
    error: null,
  } as S,
  // ini reducer financial buat ngubah value state globalnya
  reducers: {
    financialTable_Request(state) {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: null,
      };
    },
    financialTable_Success(state, {payload}) {
      return {
        ...state,
        data: payload,
        fetching: false,
        fetched: true,
        error: null,
      };
    },
    financialTable_Failure(state, { payload }) {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: payload,
      };
    },
  },
});

export const { financialTable_Request, financialTable_Success, financialTable_Failure } =
  financialTableSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const financialTableData = (state: RootState) => state.financial.data;

export default financialTableSlice.reducer;

export function detailBudgetOpex() {
  return async (dispatch: AppDispatch) => {
    try {
      let response: any = {};
      await dispatch(financialTable_Request());
      response = await FinancialTableServiceAPI.DetailBudgetOpex();
      await dispatch(financialTable_Success(response));
    } catch (error) {
      await dispatch(financialTable_Failure(error));
    }
  };
}

export function detailBudgetCapex() {
  return async (dispatch: AppDispatch) => {
    try {
      let response: any = {};
      await dispatch(financialTable_Request());
      response = await FinancialTableServiceAPI.DetailBudgetCapex();
      await dispatch(financialTable_Success(response));
    } catch (error) {
      await dispatch(financialTable_Failure(error));
    }
  };
}
