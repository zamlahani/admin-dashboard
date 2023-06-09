import React, { ReactNode } from "react";

import { Table, Typography } from "antd";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

import { ReactComponent as StarIcon } from "../../../assets/icons/siab/star.svg";
import Loading from "../../../components/Loading/LoadingView";

import "./TableRBB.css";
import { ColumnType } from "antd/lib/table";
import { BudgetOpexCapex } from "../../Financial";

const useStyles = makeStyles({
  root: {
    padding: "30px 20px 20px 30px",
    "& .MuiBox-root": {
      padding: "20px 0px 0px 0px",
    },
  },
  rootTable: {
    width: "100%",
    // overflowX: "auto",
    boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    borderRadius: "10px",
    minHeight: "500px",
  },
  titleSum: {
    fontSize: 15,
    fontWeight: 500,
  },
  total: {
    width: "max-content",
    // paddingRight: 10,
    margin: "auto",
  },
  cellRowEnd: {
    "& .MuiTableCell-sizeSmall": {
      padding: "5px 0px 5px 0px",
      borderBottom: 0,
    },
  },
  cellRowEndGrand: {
    height: 50,
    "& .MuiTableCell-sizeSmall": {
      borderBottom: 0,
    },
  },
});

const { Text } = Typography;

const TableRBB = (props: {
  rowsPerPage: number;
  data: BudgetOpexCapex[];
  imgIcon: ReactNode;
  columnData: ColumnType<any>[];
  summaries: string[];
  scrollWidth: number;
  isLoading: boolean;
  titleSum: number;
  grandTotal: string | null;
  container: string;
}) => {
  const classes = useStyles();
  // const { rowsPerPage, totalRows, totalPages } = props;
  const {
    titleSum,
    imgIcon,
    columnData,
    data,
    grandTotal,
    summaries,
    scrollWidth,
    isLoading,
    container,
  } = props;
  // const styleWithTab = { position: "relative", top: -45 };

  return (
    <div>
      {isLoading ? (
        <Loading maxheight="100%" />
      ) : (
        <div>
          <Paper className={classes.rootTable}>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={2}
              style={{ padding: "20px 0 0 20px" }}
            >
              <Grid item>
                {imgIcon === null ? (
                  ""
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 30,
                      height: 30,
                      backgroundColor: "#FFE9E9",
                      borderRadius: 10,
                    }}
                  >
                    {imgIcon}
                  </div>
                )}
              </Grid>
              <Grid item>
                <Typography style={{ fontSize: 15, fontWeight: 500 }}>{titleSum}</Typography>
              </Grid>
            </Grid>
            <Table
              columns={columnData}
              dataSource={data}
              pagination={
                container !== "finBudgetCadangan"
                  ? {
                      style: {
                        marginRight: 20,
                      },
                      pageSizeOptions: ["5", "10", "20"],
                    }
                  : false
              }
              scroll={{ x: scrollWidth }}
              summary={(pageData) => {
                return (
                  <>
                    {grandTotal !== null && (
                      <Table.Summary.Row>
                        <Table.Summary.Cell align="center" index={data.length + 1}>
                          <Text strong className={classes.total}>
                            Grand Total
                          </Text>
                        </Table.Summary.Cell>
                        {summaries.map((item, i) => {
                          return (
                            <Table.Summary.Cell align="center" key={i} index={i}>
                              <Text strong className={classes.total} key={i}>
                                {item}
                              </Text>
                            </Table.Summary.Cell>
                          );
                        })}
                      </Table.Summary.Row>
                    )}
                  </>
                );
              }}
            />
          </Paper>
        </div>
      )}
    </div>
  );
};

TableRBB.defaultProps = {
  rowsPerPage: 10,
  data: [],
  imgIcon: <StarIcon />,
  columnData: [],
  grandTotal: {},
  summaries: [],
  scrollWidth: 0,
  isLoading: false,
};

export default TableRBB;
