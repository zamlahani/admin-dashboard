import FinancialServiceAPI from "../../../services/financial";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../store";

type S = {
  data: any;
  fetching: boolean;
  fetched: boolean;
  error: Error | null;
};

export const financialSlice = createSlice({
  name: "financial",
  initialState: {
    data: {},
    fetching: false,
    fetched: false,
    error: null,
  } as S,
  reducers: {
    financial_Request(state: S) {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: null,
      };
    },
    financial_Success(state: S, { payload }) {
      return {
        ...state,
        data: payload,
        fetching: false,
        fetched: true,
        error: null,
      };
    },
    financial_Failure(state: S, { payload }) {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: payload,
      };
    },
  },
});

export const { financial_Request, financial_Success, financial_Failure } = financialSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const financialData = (state: RootState) => state.financial.data;

export default financialSlice.reducer;

export function budgetSummaryInfoByMP() {
  return async (dispatch: AppDispatch) => {
    try {
      let response: any = {};

      dispatch(financial_Success({}));

      await dispatch(financial_Request());

      response = await FinancialServiceAPI.BudgetSummaryInfoByMP();

      await dispatch(financial_Success(response));
    } catch (error: unknown) {
      await dispatch(financial_Failure(error));
    }
  };
}

export function budgetSummaryInfoByNPB() {
  return async (dispatch: AppDispatch) => {
    try {
      let response: any = {};

      await dispatch(financial_Success({}));

      await dispatch(financial_Request());

      response = await FinancialServiceAPI.BudgetSummaryInfoByNPB();

      await dispatch(financial_Success(response));
    } catch (error) {
      await dispatch(financial_Failure(error));
    }
  };
}
