import axios, { AxiosRequestConfig } from "axios";

const baseEndPoint = `${import.meta.env.VITE_API_FINANCIAL}`;
const baseEndPointMemoPembayaran = `${import.meta.env.VITE_API_MEMOPEMBAYARAN}`;
const baseEndPointNPB = `${import.meta.env.VITE_API_FINANCIALNPB}`;

const FinancialTableServiceAPI = {
  DetailBudgetOpex: () => {
    const request = {};
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPoint}/detailBudgetOpex`, request)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  DetailBudgetCapex: () => {
    const request = {};
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPoint}/detailBudgetCapex`, request)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  ListMemoPembayaran: () => {
    const request = {};
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPointMemoPembayaran}/listMemoPembayaran`, request)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  ListApprovalNPB: (requestData: AxiosRequestConfig) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPointNPB}/listApprovalNpb`, requestData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  ListFinancialStatus: () => {
    const request = {};
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPoint}/listFinancialStatus`, request)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  SearchBudgetTracking: (requestData: AxiosRequestConfig) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPoint}/searchBudgetTracking`, requestData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  SearchBudgetBesaran: (requestData: AxiosRequestConfig) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseEndPoint}/searchBudgetBesaran`, requestData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
export default FinancialTableServiceAPI;
