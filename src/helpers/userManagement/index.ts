import Axios from "axios";
import constants from "../constants";
import secureStorage from "../secureStorage";
const { userServiceBaseUrl } = constants;

function getUsers(paramObj: {
  rowsPerPage: number;
  currentPage: number;
  orderDirection?: string;
  sortBy?: string;
  divisionId?: string;
  roleId?: string;
}) {
  const {
    rowsPerPage,
    currentPage,
    orderDirection = "ASC",
    sortBy = "fullName",
    divisionId,
    roleId,
  } = paramObj;
  const rowParam = rowsPerPage ? "rowPerPage=" + rowsPerPage : "";
  const curParam = currentPage || currentPage * 1 === 0 ? "&currentPage=" + currentPage : "";
  const divisionParam = divisionId ? "&divisionId=" + divisionId : "";
  const orderDirUp = orderDirection ? orderDirection.toUpperCase() : "ASC";
  const roleParam = roleId ? "&roleId=" + roleId : "";
  return Axios({
    method: "GET",
    url: `${userServiceBaseUrl}/users/manage?${rowParam}${curParam}&orderDirection=${orderDirUp}&ordersBy=${sortBy}${roleParam}${divisionParam}`,
    headers: {
      Authorization: "Bearer " + secureStorage.getItem("access_token"),
    },
  });
}

function getRoles(paramObj: {
  orderDirection: string;
  ordersBy: string;
  rowPerPage: string;
  currentPage: string;
}) {
  const {
    orderDirection = "ASC",
    ordersBy = "name",
    rowPerPage = 10,
    currentPage = 0,
  } = paramObj;
  const urlParams = `?rowPerPage=${rowPerPage}&currentPage=${currentPage}&searchString=&orderDirection=${orderDirection.toUpperCase()}&ordersBy=${ordersBy}`;
  return Axios({
    method: "GET",
    url: `${userServiceBaseUrl}/roles${paramObj ? urlParams : ""}`,
    headers: {
      Authorization: "Bearer " + secureStorage.getItem("access_token"),
    },
  });
}

function getMenus(paramObj: { currentPage?: string; orderDirection?: string }) {
  const { currentPage = "", orderDirection = "" } = paramObj;
  const path = paramObj
    ? `?rowPerPage=10&currentPage=${currentPage}&searchString=&orderDirection=${orderDirection.toUpperCase()}&ordersBy=name`
    : "/hierarchy";
  return Axios({
    method: "GET",
    url: `${userServiceBaseUrl}/menus${path}`,
    headers: {
      Authorization: "Bearer " + secureStorage.getItem("access_token"),
    },
  });
}

function useMenuArr(menuArr: { menuId: number; userAccess: string }[]) {
  // menuArr = menus props of the role
  function getUserAccess(id: number) {
    // id = menu ID retreived from menu API
    return menuArr.find(({ menuId }) => menuId === id)?.userAccess;
  }
  return { getUserAccess };
}

export { getUsers, getRoles, getMenus, useMenuArr };
