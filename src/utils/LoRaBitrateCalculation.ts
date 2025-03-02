type LoRaBitrateCalculationParams = {
  spreadingFactor: number;
  bandwidth: number;
  codeRate: number;
  lowDatarateOptimize: boolean;
  preambleLength: number;
  payloadLength: number;
  headerMode: boolean;
  crc: boolean;
  transmitPower?: number;
};

type LoRaBitrateCalculationResultParams = {
  totalLength: number;
  symbolTime: number;
  airTime: number;
  maximumFrequencyError: number;
};

export const LoRaBitrateCalculation = (
  data: LoRaBitrateCalculationParams,
): LoRaBitrateCalculationResultParams => {
  const {
    spreadingFactor,
    // transmitPower,
    crc,
    preambleLength,
    payloadLength,
    lowDatarateOptimize,
    bandwidth,
    codeRate,
    headerMode,
  } = data;

  console.log(data);

  const payloadLengthWithCrc = crc ? payloadLength + 2 : payloadLength;
  const symbolTime = Math.pow(2, spreadingFactor) / bandwidth;
  const maxFrequencyError = bandwidth / Math.pow(2, spreadingFactor);
  const de = lowDatarateOptimize ? 1 : 0;
  const payloadSymbols =
    8 +
    Math.ceil(
      ((8 * payloadLengthWithCrc - 4 * spreadingFactor + 28 + 16) /
        (4 * (spreadingFactor - 2 * de))) *
        codeRate,
    );
  const headerSymbols = headerMode ? 8 : 0;
  const totalLength = preambleLength + headerSymbols + payloadSymbols;
  const airTime = totalLength * symbolTime;

  return {
    symbolTime: symbolTime,
    maximumFrequencyError: parseFloat(maxFrequencyError.toFixed(2)),
    airTime: parseFloat(airTime.toFixed(3)),
    totalLength: totalLength,
  };
};
