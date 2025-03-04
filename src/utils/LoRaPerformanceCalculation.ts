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
  } = data;

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
  const receiverSensitivity =
    -174 +
    10 * Math.log10(bandwidth * 1000) +
    noiseFigure +
    getSnrBasedOnSf(spreadingFactor);

  const linkBudget = transmitPower + receiverSensitivity;

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
