"use client";

import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
  PointElement,
  LineElement,
  BarController,
  LineController,
);

ChartJS.defaults.font.family = "sans-serif";

interface ChartJSProviderProps {
  children: React.ReactNode;
}

export const ChartJSProvider = ({ children }: ChartJSProviderProps) => {
  return <>{children}</>;
};
