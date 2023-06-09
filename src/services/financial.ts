import axios, { AxiosRequestConfig } from "axios";

const baseEndPoint = `${import.meta.env.VITE_API_FINANCIAL}`;
const baseEndPointNPB = `${import.meta.env.VITE_API_FINANCIALNPB}`;
const baseEndPointPlanner = `${import.meta.env.VITE_API_FINANCIALPLANNER}`;

const financialApi = {
  BudgetSummaryInfoByMP: () => {
    const request = {};

    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPoint}/budgetSummaryInfoByMP`, request)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  BudgetSummaryInfoByNPB: () => {
    const request = {};

    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPoint}/budgetSummaryInfoByNPB`, request)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  BudgetSummaryInfo: () => {
    const request = {};

    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPoint}/budgetSummaryInfo`, request)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  SummaryFinancialStatus: () => {
    const request = {};
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPointPlanner}/summaryFinancialStatus`, request)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  GenerateNPBCode: () => {
    const request = {};

    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPointNPB}/generateNpbCode`, request)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  SubmitNPB: (requestData: AxiosRequestConfig) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPointNPB}/submitNpb`, requestData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  AdjustmentBudgetBesaran: (requestData: AxiosRequestConfig) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPointPlanner}/adjustmentBudgetBesaran `, requestData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  BudgetSummary: () => {
    const request = {};
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPoint}/budgetSummary`, request)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  UpdateStatusTransaction: (requestData: AxiosRequestConfig) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPoint}/updateStatusTransaction`, requestData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  ListBudgetBesaran: () => {
    const request = {};
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPointNPB}/listBudgetBesaran`, request)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  ListBudgetNpb: () => {
    const request = {};
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPointNPB}/listBudgetNpb`, request)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default financialApi;
