import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [banques, setBanques] = useState([]);

  useEffect(() => {
    const fetchBanques = async () => {
      try {
        const response = await axios.get("http://localhost:3002/banques/get");
        setBanques(response.data.banques);
      } catch (error) {
        console.error("Error fetching banques:", error);
      }
    };

    fetchBanques();
  }, []);

  // Transforming data to fit the expected format for the chart
  const data = banques.map((banque) => ({
    bank: banque.banque,
    [banque.banque]: banque.nombreAgences,
  }));
  const agenciesCounts = banques.map((banque) => banque.nombreAgences);
  const maxAgencies = Math.max(...agenciesCounts);
  const tickValues = Array.from({ length: maxAgencies + 1 }, (_, i) => i);
  // Extracting bank names to use as keys
  const keys = banques.map((banque) => banque.banque);

  return (
    <ResponsiveBar
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
      }}
      keys={keys}
      indexBy="bank"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear", step: 1 }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Bank",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Number of Agencies",
        legendPosition: "middle",
        legendOffset: 40,
        tickValues: tickValues,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      tooltip={({ id, value, color }) => (
        <strong style={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}>
          {id}: {value}
        </strong>
      )}
      role="application"
      barAriaLabel={function (e) {
        return `${e.id}: ${e.formattedValue} in bank: ${e.indexValue}`;
      }}
    />
  );
};

export default BarChart;