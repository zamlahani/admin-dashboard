import React, {
  useState,
  useEffect,
  FormEventHandler,
} from "react";
import { useTranslation } from "react-i18next";
import { Tab, TabProps, Tabs, TabsProps, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import SummaryOpexApex, { DataNpb } from "../../components/Financial/SummaryOpexApex";
import constants from "../../helpers/constants";
import TableSummary from "../RBBData/TableRBB";
import { ReactComponent as TitleRateIcon } from "../../assets/icons/general/transaction_rate_overview.svg";
import * as ThemeColor from "../../assets/theme/colors";
import useRupiahConverter from "../../helpers/useRupiahConverter";
import usePercentage from "../../helpers/usePercentage";
import Pagination from "@material-ui/lab/Pagination";
import Constants from "../../helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../helpers/store/store";
import { budgetSummaryInfoByMP, budgetSummaryInfoByNPB } from "../../helpers/store/financial";
import { ColumnType } from "antd/lib/table";
import { detailBudgetCapex, detailBudgetOpex } from "../../helpers/store/financialTable";
import { DataChart } from "../../components/Financial/Chart/OpexApexChart";

const ContentTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: ThemeColor.PrimaryHard,
    },
  },
})((props: TabsProps) => (
  <Tabs {...props} /* onChange={props.onChange} */ TabIndicatorProps={{ children: <span /> }} />
));

const ContentTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontSize: 17,
    fontWeight: 600,
    marginRight: theme.spacing(1),
    color: constants.color.grayMedium,
    "&:hover": {
      color: constants.color.dark,
      opacity: 1,
    },
    "&$selected": {
      color: constants.color.dark,
    },
  },
  selected: {},
}))((props: TabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: 0,
    },
    backgroundColor: ThemeColor.GrayUltrasoft,
    minHeight: "calc(100vh - 64px)",
  },
  paginationContainer: {
    "& > *": {
      marginTop: 15,
      marginBottom: 35,
    },
    display: "flex",
    justifyContent: "space-between",
  },
  pagination: {
    padding: 5,
    backgroundColor: constants.color.white,
    borderRadius: 10,
    "& .Mui-selected": {
      backgroundColor: constants.color.primaryUltraSoft,
    },
    "& .MuiPaginationItem-root": {
      color: constants.color.primaryHard,
    },
  },
});

type CategoryOpexCapexStore = {
  key: string;
  category: string;
  numberSl: string;
  budgetAwal: string;
  budgetSisa: string;
  percentage: string;
};
export type BudgetOpexCapex = {
  key?: number;
  divisi?: string;
  budgetAwal?: string;
  children?: CategoryOpexCapexStore[];
};
const Financial = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const tableTitle: ColumnType<{ [key: string]: string }>[] = [
    {
      title: "Divisi",
      dataIndex: "divisi",
      key: "divisi",
      width: "15%",
      align: "center",
    },
    { title: "Category", dataIndex: "category", key: "category", width: "15%" },
    {
      title: "No. SL",
      dataIndex: "numberSl",
      key: "numberSl",
      width: "25%",
      align: "center",
    },
    {
      title: "Budget Awal",
      dataIndex: "budgetAwal",
      key: "budgetAwalKey",
      width: "15%",
      align: "center",
    },
    {
      title: "Budget Sisa",
      dataIndex: "budgetSisa",
      key: "budgetSisaKey",
      width: "15%",
      align: "center",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentageKey",
      width: "10%",
      align: "center",
    },
  ];

  const dispatch = useDispatch();
  const financial = useSelector((state: RootState) => state.financial);
  const financialTable = useSelector((state: RootState) => state.financialTable);

  const [tabValue, setTabValue] = useState<number>(0);
  const [dataOpex, setDataOpex] = useState<DataChart>({
    listData: [],
    colors: [],
  });
  const [dataCapex, setDataCapex] = useState<DataChart>({
    listData: [],
    colors: [],
  });
  const [dataNpb, setDataNpb] = useState<DataNpb>({});
  const [currentTabMapsRate, setCurrentTabMapsRate] = useState(0);
  const [budgetOpexCapex, setBudgetOpexCapex] = useState<BudgetOpexCapex[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);

  // handle pivot expanded
  const handlePivot = () => {
    const items = document.querySelectorAll<HTMLElement>(".ant-table-row-expand-icon-expanded");
    items.forEach((item) => item.click( ));
  };

  type HandleChange = ((event: React.ChangeEvent<unknown>, value: any) => void) &
    FormEventHandler<HTMLButtonElement>;

  const handleChange: HandleChange = ((event, newTabValue) => {
    event.preventDefault();
    handlePivot();
    setTabValue(newTabValue);
  }) as HandleChange;

  function handleTabBudgetInformation(newValue: number) {
    handlePivot();
    setCurrentTabMapsRate(newValue);
  }

  useEffect(() => {
    if (currentTabMapsRate === 0) {
      dispatch(budgetSummaryInfoByMP());
    } else {
      dispatch(budgetSummaryInfoByNPB());
    }
  }, [currentTabMapsRate]);

  useEffect(() => {
    if (tabValue === 0) {
      dispatch(detailBudgetOpex());
    } else {
      dispatch(detailBudgetCapex());
    }
  }, [tabValue]);

  useEffect(() => {
    setLoadingChart(true);
    const responseDataFinancial = financial.data;
    if (responseDataFinancial.opex !== undefined) {
      setDataOpex({
        title: "OPEX",
        listData: [
          {
            type: "Budget Terpakai",
            value: responseDataFinancial.opex.budgetUsed,
          },
          {
            type: "Sisa Budget",
            value: responseDataFinancial.opex.totalAmountEndingBudget,
          },
          {
            type: "Total Budget",
            value: responseDataFinancial.opex.totalAmountBudget,
          },
        ],
        colors: [
          constants.color.primaryHard,
          constants.color.secondaryMedium,
          constants.color.white,
        ],
        npb: responseDataFinancial.opex.npb,
        invoice: responseDataFinancial.opex.invoice,
        paidInvoice: responseDataFinancial.opex.invoiceTerbayar,
        type: currentTabMapsRate,
      });
      setDataCapex({
        title: "CAPEX",
        listData: [
          {
            type: "Budget Terpakai",
            value: responseDataFinancial.capex.budgetUsed,
          },
          {
            type: "Sisa Budget",
            value: responseDataFinancial.capex.totalAmountEndingBudget,
          },
          {
            type: "Total Budget",
            value: responseDataFinancial.capex.totalAmountBudget,
          },
        ],
        colors: [
          constants.color.primaryHard,
          constants.color.secondaryMedium,
          constants.color.white,
        ],
        npb: responseDataFinancial.capex.npb,
        invoice: responseDataFinancial.capex.invoice,
        paidInvoice: responseDataFinancial.capex.invoiceTerbayar,
        type: currentTabMapsRate,
      });
      setDataNpb({
        invoice: responseDataFinancial.invoice,
        payment: responseDataFinancial.pembayaran,
      });
      setLoadingChart(false);
    }
  }, [financial]);

  type DataBudget = {
    division: string;
    beginningBalance: number;
    endingBalance: number;
    category: string;
    slCode: string;
  };

  type DivStr = {
    division: string;
  };

  type DataDiv = DivStr & { list: DataBudget[] };

  const handleDivision = (dataBudget: DataBudget[]): DataDiv[] => {
    const divArr = dataBudget.map((data) => data.division);
    const divArrSet = new Set(divArr);
    const newDivArr = [...divArrSet].sort();
    const newBudgetData: DataDiv[] = [];
    for (let i = 0; i < newDivArr.length; i++) {
      const arr: DataBudget[] = [];
      for (let j = 0; j < dataBudget.length; j++) {
        if (newDivArr[i] === dataBudget[j].division) {
          arr.push(dataBudget[j]);
        }
      }
      const div = {
        division: newDivArr[i],
        list: arr,
      };
      newBudgetData.push(div);
    }
    return newBudgetData;
  };

  useEffect(() => {
    setLoading(true);
    const responseDataFinancialTable = financialTable.data;
    if (responseDataFinancialTable.detailTransaction !== undefined) {
      const dataBudgetOpexCapex = responseDataFinancialTable.detailTransaction;
      if (dataBudgetOpexCapex !== undefined && dataBudgetOpexCapex !== null) {
        const dataOpexCapexStore: BudgetOpexCapex[] = [];
        let newBudgetDataMPNPB: DataBudget[] = [];
        newBudgetDataMPNPB = dataBudgetOpexCapex.filter((item: { mpId: string | null }) =>
          currentTabMapsRate === 0 ? item.mpId !== "0" : item.mpId === "0"
        );
        const newBudgetDataOpexCapex = handleDivision(newBudgetDataMPNPB);
        newBudgetDataOpexCapex.map((data, idx1: number) => {
          let divisiOpexCapexStore: BudgetOpexCapex = {};
          const categoryOpexCapexStore: CategoryOpexCapexStore[] = [];
          let totalBudgetAwalOpexCapex = 0;
          if (data.list !== undefined) {
            data.list.map((item, idx2: number) => {
              totalBudgetAwalOpexCapex += item.beginningBalance;
              categoryOpexCapexStore.push({
                key: `${1 + idx1}${1 + idx2}`,
                category: item.category === "" ? "-" : item.category,
                numberSl: item.slCode,
                budgetAwal: item.beginningBalance ? useRupiahConverter(item.beginningBalance) : "-",
                budgetSisa: item.endingBalance ? useRupiahConverter(item.endingBalance) : "-",
                percentage:
                  item.beginningBalance || item.endingBalance
                    ? usePercentage(item.endingBalance, item.beginningBalance)
                    : "-",
              });
              divisiOpexCapexStore = {
                key: 1 + idx1,
                divisi: data.division,
                budgetAwal: useRupiahConverter(totalBudgetAwalOpexCapex),
                children: categoryOpexCapexStore,
              };
            });
          }
          dataOpexCapexStore.push(divisiOpexCapexStore);
        });
        setBudgetOpexCapex(dataOpexCapexStore);
      }
      setLoading(false);
    }
  }, [financialTable, currentTabMapsRate]);

  // pagination
  const totalRows = budgetOpexCapex?.length || 0;
  const rowsPerPage = 10;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <div className={classes.root}>
      <div className="contentTitle" style={{ marginBottom: "28px" }}>
        {t("financial")}
      </div>
      <SummaryOpexApex
        dataChartOpex={dataOpex}
        dataChartApex={dataCapex}
        dataNpb={dataNpb}
        currentTabMapsRate={currentTabMapsRate}
        handleChangeTab={handleTabBudgetInformation}
        isLoading={loadingChart}
      />
      <div style={{ margin: "40px 0 20px 0" }}>
        <ContentTabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
          <ContentTab label={t("opex")} />
          <ContentTab label={t("capex")} />
        </ContentTabs>
      </div>
      {tabValue === 0 ? (
        <TableSummary
          titleSum={t("transaction.detail")}
          data={budgetOpexCapex}
          columnData={tableTitle}
          imgIcon={<TitleRateIcon />}
          grandTotal={null}
          container="finBudgetCadangan"
          isLoading={loading}
        />
      ) : (
        <TableSummary
          titleSum={t("transaction.detail")}
          data={budgetOpexCapex}
          columnData={tableTitle}
          imgIcon={<TitleRateIcon />}
          grandTotal={null}
          container="finBudgetCadangan"
          isLoading={loading}
        />
      )}
      <div className={classes.paginationContainer}>
        <Typography style={{ fontSize: 15, color: Constants.color.grayMedium }}>
          Showing {(currentPage - 1) * rowsPerPage + 1} -{" "}
          {(currentPage - 1) * rowsPerPage + 10 <= totalRows
            ? (currentPage - 1) * rowsPerPage + 10
            : totalRows}{" "}
          of {totalRows}
        </Typography>
        <Pagination
          page={currentPage}
          count={totalPages}
          onChange={(e, page) => setCurrentPage(page)}
          className={classes.pagination}
        />
      </div>
    </div>
  );
};

export default Financial;
