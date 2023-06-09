/* eslint-disable no-else-return */
type Color = {
  [key: string]: string;
};
type Constansts = {
  color: Color;
  API_MAP_KEY?: string;
  apiHost?: string;
  apiDomain?: string;
  userServiceBaseUrl?: string;
  URL_API_SERVICE?: string;
  popupTimeout: string;
  MODELINGS_SERVICE?: string;
  IMPLEMENTATION_SERVICE?: string;
  getStatusProcurement?: (
    x: number
  ) => "Waiting Negotiation" | "Negotiation" | "Deal Negotiation" | "Renegotiation" | null;
  progressProcurement?: (x: number) => "1" | "2" | "3" | null;
  lastStatus?: (x: number) => string | null;
};

const constansts: Constansts = {
  popupTimeout: "",
  apiDomain: import.meta.env.VITE_API_DOMAIN,
  color: {
    primaryDark: "#021b26",
    primaryHard: "#05445E",
    primaryMedium: "#1e576e",
    primarySoft: "#698f9e",
    primaryUltraSoft: "#cddadf",
    secondaryMedium: "#189AB4",
    secondarySoft: "#74c2d2",
    secondaryUltraSoft: "#d1ebf0",
    grayMedium: "#BCC8E7",
    graySoft: "#E6EAF3",
    grayUltraSoft: "#f5f8fb",
    white: "#FFFFFF",
    dark: "#2B2F3C",
    black: "#000000",
  },
};

constansts.API_MAP_KEY = import.meta.env.VITE_API_MAP_KEY;
constansts.apiHost = `${import.meta.env.VITE_API_DOMAIN}/masterrbbservices/v1`;
constansts.apiDomain = import.meta.env.VITE_API_DOMAIN;
constansts.userServiceBaseUrl = `${constansts.apiDomain}/api/v1/users/api/v1`;
constansts.URL_API_SERVICE = `${import.meta.env.VITE_API_DOMAIN}/masterrbbservices/v1`;
constansts.popupTimeout = `${import.meta.env.VITE_POPUP_TIMEOUT}`;

// Modeling Service
constansts.MODELINGS_SERVICE = `${import.meta.env.VITE_API_DOMAIN}/analysismodelingservice/v1`;

// Implementation Service
constansts.IMPLEMENTATION_SERVICE = `${import.meta.env.VITE_API_DOMAIN}/implementationservice/v1`;

// procurement
constansts.getStatusProcurement = (param: number) => {
  if (param === 1) {
    return "Waiting Negotiation";
  } else if (param === 2) {
    return "Negotiation";
  } else if (param === 3) {
    return "Deal Negotiation";
  } else if (param === 4) {
    return "Renegotiation";
  } else {
    return null;
  }
};

constansts.progressProcurement = (param: number) => {
  if (param === 1) {
    return "1";
  } else if (param === 2) {
    return "2";
  } else if (param === 3) {
    return "3";
  } else {
    return null;
  }
};

// RBB IMPLEMENTATION
constansts.lastStatus = (param: number) => {
  if (param === 1) {
    return "1";
  } else if (param === 2) {
    return "2";
  } else if (param === 3) {
    return "3";
  } else if (param === 4) {
    return "4";
  } else if (param === 5) {
    return "5";
  } else if (param === 6) {
    return "6";
  } else if (param === 7) {
    return "7";
  } else if (param === 8) {
    return "8";
  } else if (param === 9) {
    return "9";
  } else if (param === 10) {
    return "10";
  } else if (param === 11) {
    return "11";
  } else if (param === 12) {
    return "12";
  } else {
    return null;
  }
};

// constansts.month = (param) => {
//   return `${param}`;
// };

export default constansts;

export const dataTypeLokasi = [
  { value: "-", name: "- Pilih Tipe Lokasi -" },
  { value: "Airport", name: "Airport" },
  { value: "Business Center", name: "Business Center" },
  { value: "Education", name: "Education" },
  { value: "Gas Station", name: "Gas Station" },
  { value: "Hospital", name: "Hospital" },
  { value: "Hotel", name: "Hotel" },
  { value: "Industry", name: "Industry" },
  { value: "Mall", name: "Mall" },
  { value: "Office Building", name: "Office Building" },
  { value: "Resindential", name: "Resindential" },
  { value: "Restaurant", name: "Restaurant" },
  { value: "Supermarket", name: "Supermarket" },
  { value: "Others", name: "Others" },
];


export const jensKomList = [
  { value: "- Pilih Jenis Komunikasi -", name: "- Pilih Jenis Komunikasi -" },
  { value: "VSAT", name: "VSAT" },
  { value: "Fixed Line", name: "Fixed Line" },
  { value: "Wireless", name: "Wireless" },
];

export const dataRuangAtm = [
  { value: "-", name: "- Pilih Ruang Atm -" },
  { value: "Bersama", name: "Bersama" },
  { value: "Sendiri", name: "Sendiri" },
  { value: "Lobby Gedung", name: "Lobby Gedung" },
  { value: "Other", name: "Other" },
];
