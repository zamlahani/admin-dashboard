import React, { useEffect } from "react";
import { DonutChart } from "bizcharts";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { ReactComponent as IconOverview } from "../../../assets/icons/general/calculator_overview.svg";
import EmptyImg from "../../../assets/images/empty_data.png";
import { TypeStrValNum } from "../../../containers/OverviewNew/types";
import { PrimaryMedium, SecondaryMedium } from "../../../assets/theme/colors";

const dataDummy: TypeStrValNum[] = [
  { type: "Model A", value: 2291 },
  { type: "Model B", value: 2391 },
  { type: "Model C", value: 2191 },
  { type: "Model D", value: 2591 },
  { type: "Model E", value: 2791 },
  { type: "Model F", value: 2201 },
  { type: "Model G", value: 2091 },
];

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
});

function ChkyDonutChartSecondary({
  data = dataDummy,
  totalLabels = "Machines",
  colors = [
    SecondaryMedium,
    PrimaryMedium,
    "#88ADFF",
    "#CB88FF",
    "#BCC8E7",
    "#65D170",
    "#52CFC8",
    "#FFA776",
    "#807799",
  ],
  titleChart = "ATM Per Model",
  leftIcon = <IconOverview />,
}: {
  data: TypeStrValNum[];
  totalLabels?: string;
  colors?: string[];
  titleChart?: string;
  leftIcon?: JSX.Element;
}) {
  const classes = useStyles();

  useEffect(() => {
    // console.log("dataAtmModel", data);
  }, []);

  const numberWithCommas = (x: any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="center">
        <Grid item style={{ display: "flex" }}>
          {leftIcon}
        </Grid>
        <Grid item>
          <Typography style={{ fontSize: 15, fontWeight: 500 }}> {titleChart}</Typography>
        </Grid>
      </Grid>
      {data.length > 0 ? (
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <DonutChart
              data={data}
              height={225}
              width={225}
              forceFit
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
              padding="auto"
              angleField="value"
              colorField="type"
              pieStyle={{ lineWidth: 0 }}
            />
          </Grid>
          <Grid item xs={6}>
            {data.map((item, index) => {
              return (
                <Grid key={index} container spacing={2} justifyContent="space-between">
                  <Grid item>
                    <Grid container spacing={1} alignItems="center">
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
                      <Grid item>
                        <Typography style={{ fontSize: 13 }}>{item.type}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography style={{ fontSize: 13, fontWeight: 400 }}>
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
          <Typography
            style={{
              opacity: 0.3,
              textAlign: "center",
              fontSize: 11,
              marginTop: 10,
            }}
          >
            Empty
          </Typography>
        </Grid>
      )}
    </div>
  );
}

export default ChkyDonutChartSecondary;
