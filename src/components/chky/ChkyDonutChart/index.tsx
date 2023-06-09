import { DonutChart } from "bizcharts";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import EmptyImg from "../../../assets/images/empty_data.png";
import { ColorsHexCollection } from "../../../assets/theme/colors";
// import { DashboardPopulationContext } from '../../../containers/DashboardPopulation';
import ModalLoader from "../../ModalLoader";
import { useState } from "react";
import { TypeStrValNum } from "../../../containers/OverviewNew/types";

const dataDummy: TypeStrValNum[] = [
  {
    type: "ATM",
    value: 20201,
  },
  {
    type: "CRM",
    value: 3329,
  },
  {
    type: "CDM",
    value: 14257,
  },
];

const useStyles = makeStyles({
  root: {
    borderRadius: 8,
    border: "1px solid #BCC8E7",
    position: "relative",
    padding: 10,
  },
});

function ChkyDonutChart({
  data,
  totalLabels,
  colors,
  titleChart,
}: {
  data: TypeStrValNum[];
  totalLabels: string;
  colors: string[];
  titleChart: string;
}) {
  const classes = useStyles();
  const [isLoaderOpen] = useState(false);
  const numberWithCommas = (x: any) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className={classes.root}>
      <Typography style={{ fontSize: 15, fill: "black", fontWeight: 500 }}>{titleChart}</Typography>
      {data.length > 0 ? (
        <Grid container alignItems="center">
          <Grid item xs={6} style={{ position: "relative", left: -15 }}>
            <DonutChart
              data={data}
              height={155}
              width={155}
              padding={0}
              color={colors}
              innerRadius={0.7}
              label={{
                visible: false,
              }}
              statistic={{
                title: {
                  style: {
                    fontSize: "13px",
                    lineHeight: "16px",
                    fontFamily: "Barlow",
                    fontWeight: 400,
                  },
                  formatter: () => totalLabels,
                },
                content: {
                  style: {
                    fontSize: "17px",
                    lineHeight: "20px",
                    fontFamily: "Barlow",
                    fontWeight: 600,
                  },
                },
              }}
              legend={{
                visible: false,
              }}
              angleField="value"
              colorField="type"
              pieStyle={{ lineWidth: 0 }}
            />
          </Grid>
          <Grid item xs={6}>
            {data.map((item: TypeStrValNum, index: number) => {
              return (
                <Grid
                  key={index}
                  container
                  spacing={1}
                  justifyContent="space-between"
                  wrap="nowrap"
                  alignItems="center"
                >
                  <Grid item style={{ flex: 1, minWidth: 0 }}>
                    <Grid container spacing={1} alignItems="center" wrap="nowrap">
                      <Grid item>
                        <div
                          style={{
                            height: 20,
                            width: 20,
                            borderRadius: 4,
                            backgroundColor: colors[index],
                          }}
                        />
                      </Grid>
                      <Grid item style={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          style={{
                            fontSize: 12,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={item.type}
                        >
                          {item.type}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography style={{ fontSize: 14, fontWeight: 600 }}>
                      {numberWithCommas(item.value)}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          alignContent="center"
          justifyContent="center"
          style={{ height: 175 }}
          direction="column"
        >
          <img src={EmptyImg} alt="Empty" style={{ opacity: 0.4 }} />
          <Typography style={{ opacity: 0.3, textAlign: "center", fontSize: 11, marginTop: 10 }}>
            Empty
          </Typography>
        </Grid>
      )}
      <ModalLoader isOpen={isLoaderOpen} />
    </div>
  );
}

ChkyDonutChart.defaultProps = {
  data: dataDummy,
  totalLabels: "Machines",
  colors: ColorsHexCollection,
  titleChart: "By Group",
};

export default ChkyDonutChart;
