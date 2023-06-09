import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ReactComponent as MachineIcon } from "../../../assets/icons/general/calculator_overview.svg";
import { ChkyDonutChart } from "../../../components/chky";
import LoadingView from "../../../components/Loading/LoadingView";
import { TypeStrValNum } from "../types";
import { PrimaryHard, SecondaryMedium } from "../../../assets/theme/colors";

const useStyles = makeStyles({
  superRoot: {
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 6px 6px rgba(232, 238, 255, 0.3)",
    },
  },
  root: {
    borderRadius: 10,
  },
});

type Data = {
  data: TypeStrValNum[];
  colors: string[];
};

const dataGroup: Data = {
  data: [
    { type: "ATM", value: 20201 },
    { type: "CRM", value: 3329 },
    { type: "CDM", value: 14257 },
  ],
  colors: [SecondaryMedium, PrimaryHard],
};

const dataPremises: Data = {
  data: [
    { type: "Off Premises", value: 20201 },
    { type: "On Premises", value: 30529 },
  ],
  colors: [SecondaryMedium, PrimaryHard],
};

const dataBrand: Data = {
  data: [
    { type: "NCR", value: 20201 },
    { type: "DieBold", value: 3329 },
    { type: "CRM", value: 14257 },
    { type: "CDM", value: 14257 },
  ],
  colors: [
    "#7fd1d6",
    "#00a3ad",
    "#36648b",
    "#c1cdc1",
    "#e0eee0",
    "#b0c4de",
    "#000080",
    "#32d9cb",
    "#51828d",
    "#2f1431",
    "#94a7b1",
    "#96ad29",
    "#7f6f9f",
    "#75bbca",
    "#548bac",
    "#a6cfe8",
    "#7553bb",
  ],
};

function OverviewMachinePopulation({
  dataPopulationByGroup = dataGroup,
  dataPopulationByPremises = dataPremises,
  dataPopulationByBrand = dataBrand,
  loading,
}: {
  dataPopulationByGroup: Data;
  dataPopulationByPremises: Data;
  dataPopulationByBrand: Data;
  loading?: boolean;
}) {
  const classes = useStyles();
  return (
    <div className={classes.superRoot}>
      <Accordion defaultExpanded className={classes.root} style={{ borderRadius: 10 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: PrimaryHard }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item style={{ display: "flex" }}>
              <MachineIcon />
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: 15, fontWeight: 500 }}>Machine Population</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>

        <AccordionDetails>
          {loading ? (
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <LoadingView maxheight="100%" />
              </Grid>
              <Grid item md={4} xs={12}>
                <LoadingView maxheight="100%" />
              </Grid>
              <Grid item md={4} xs={12}>
                <LoadingView maxheight="100%" />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <ChkyDonutChart
                  data={dataPopulationByGroup.data}
                  colors={dataPopulationByGroup.colors}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <ChkyDonutChart
                  data={dataPopulationByPremises.data}
                  colors={dataPopulationByPremises.colors}
                  titleChart="By Premises"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <ChkyDonutChart
                  data={dataPopulationByBrand.data}
                  colors={dataPopulationByBrand.colors}
                  titleChart="By Brand"
                />
              </Grid>
            </Grid>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

OverviewMachinePopulation.defaultProps = {};

export default OverviewMachinePopulation;
