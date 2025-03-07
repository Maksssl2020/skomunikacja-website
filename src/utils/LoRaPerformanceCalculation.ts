import { s } from "framer-motion/dist/types.d-6pKw1mTI";

type LoRaPerformanceCalculationParams = {
  spreadingFactor: number;
  bandwidth: number;
  codeRate: number;
  lowDatarateOptimize: boolean;
  preambleLength: number;
  payloadLength: number;
  headerMode: boolean;
  crc: boolean;
  noiseFigure: number;
  transmitPower: number;
  crystalTolerance: number;
  batteryCapacity: number;
  periodicity: string;
};

type LoRaPerformanceCalculationResultParams = {
  totalLength: number;
  symbolTime: number;
  airTime: number;
  maximumFrequencyError: number;
  receiverSensitivity: number;
  linkBudget: number;
};

export const LoRaPerformanceCalculation = (
  data: LoRaPerformanceCalculationParams,
): LoRaPerformanceCalculationResultParams => {
  const {
    spreadingFactor,
    bandwidth,
    codeRate,
    lowDatarateOptimize,
    preambleLength,
    payloadLength,
    headerMode,
    crc,
    noiseFigure,
    transmitPower,
    crystalTolerance,
    batteryCapacity,
    periodicity,
  } = data;

  const periodicityParts = periodicity.split(":");
  const periodicityTotalSeconds =
    parseInt(periodicityParts[0]) * 3600 +
    parseInt(periodicityParts[1]) * 60 +
    parseInt(periodicityParts[2]);

  const symbolTime = parseFloat(
    (Math.pow(2, spreadingFactor) / bandwidth).toFixed(3),
  );
  const bitrate = (bandwidth * 1000) / Math.pow(2, spreadingFactor);
  const crystalToleranceError =
    crystalTolerance * Math.pow(10, -6) * 868 * Math.pow(10, 6);
  const maxFrequencyError = (bitrate + crystalToleranceError) / 1000;

  const tPreamble = parseFloat((preambleLength * symbolTime).toFixed(3));
  let payloadBit = 8 * payloadLength;
  payloadBit -= 4 * spreadingFactor;
  payloadBit += 8;
  payloadBit += crc ? 16 : 0;
  payloadBit += headerMode ? 20 : 0;
  payloadBit = Math.max(payloadBit, 0);
  const bitsPerSymbol = lowDatarateOptimize
    ? spreadingFactor - 2
    : spreadingFactor;
  const payloadSymbol = Math.ceil(payloadBit / 4 / bitsPerSymbol) * codeRate;
  const nPayload = payloadSymbol + 8;

  const tPayload = parseFloat((nPayload * symbolTime).toFixed(3));
  const tTotal = parseFloat((tPreamble + tPayload).toFixed(3));
  const tTotalSeconds = tTotal / 1000;
  const receiverSensitivity =
    -174 +
    10 * Math.log10(bandwidth * 1000) +
    noiseFigure +
    getSnrBasedOnSf(spreadingFactor);

  const linkBudget = transmitPower + receiverSensitivity;

  const currentTransmission_mA = 120;
  const currentReceive_mA = 12;
  const currentSleep_mA = 0.01;
  const avgCurrent =
    ((currentTransmission_mA + currentReceive_mA) * tTotal +
      currentSleep_mA * (periodicityTotalSeconds - tTotalSeconds)) /
    periodicityTotalSeconds;

  const batteryLife = batteryCapacity / avgCurrent;
  console.log(batteryLife / 24);

  return {
    symbolTime: symbolTime,
    maximumFrequencyError: parseFloat(maxFrequencyError.toFixed(2)),
    airTime: tTotal,
    totalLength: nPayload + preambleLength,
    receiverSensitivity: parseFloat(receiverSensitivity.toFixed(3)),
    linkBudget: parseFloat(linkBudget.toFixed(3)),
  };
};

function getSnrBasedOnSf(spreadingFactor: number) {
  const base = -7.5;
  const n = spreadingFactor - 7;
  return base + n * -2.5;
}
