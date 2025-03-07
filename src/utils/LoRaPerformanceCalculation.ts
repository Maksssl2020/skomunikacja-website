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
  batteryLifeHours: number;
  batteryLifeDays: number;
  batteryLifeYears: number;
  totalPacketsSent: number;
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
  const receiverSensitivity =
    -174 +
    10 * Math.log10(bandwidth * 1000) +
    noiseFigure +
    getSnrBasedOnSf(spreadingFactor);

  const linkBudget = transmitPower + receiverSensitivity;

  const calculatedBatteryLife = calculateBatteryLife(
    batteryCapacity,
    tTotal,
    periodicityTotalSeconds,
  );
  return {
    symbolTime: symbolTime,
    maximumFrequencyError: parseFloat(maxFrequencyError.toFixed(2)),
    airTime: tTotal,
    totalLength: nPayload + preambleLength,
    receiverSensitivity: parseFloat(receiverSensitivity.toFixed(3)),
    linkBudget: parseFloat(linkBudget.toFixed(3)),
    batteryLifeHours: parseFloat(
      calculatedBatteryLife.batteryLifeHours.toFixed(3),
    ),
    batteryLifeDays: parseFloat(
      calculatedBatteryLife.batteryLifeDays.toFixed(3),
    ),
    batteryLifeYears: parseFloat(
      calculatedBatteryLife.batteryLifeYears.toFixed(3),
    ),
    totalPacketsSent: parseFloat(
      calculatedBatteryLife.totalPacketsSent.toFixed(0),
    ),
  };
};

function getSnrBasedOnSf(spreadingFactor: number) {
  const base = -7.5;
  const n = spreadingFactor - 7;
  return base + n * -2.5;
}

function calculateBatteryLife(
  batteryCapacity: number,
  airTime: number,
  periodicitySeconds: number,
): {
  batteryLifeHours: number;
  batteryLifeDays: number;
  batteryLifeYears: number;
  totalPacketsSent: number;
} {
  const millisecondsPerHour = 3600000; // 1 hour = 3600000 milliseconds
  const activeModeCurrent = 19; // in mA
  const sleepModeCurrent = 0.015; // in mA

  // Calculate the number of checks per hour and per day
  const amountOfChecksPerHour = 3600 / periodicitySeconds;
  const amountOfChecksPerDay = amountOfChecksPerHour * 24;

  console.log("Checks per hour: ", amountOfChecksPerHour);
  console.log("Checks per day: ", amountOfChecksPerDay);

  // Calculate the total active time per day in hours
  const activeTimeHours =
    (amountOfChecksPerDay * airTime) / millisecondsPerHour;

  // Calculate the total sleep time per day in hours
  const sleepTimeHours = 24 - activeTimeHours;

  console.log("Active time during the day (hours): ", activeTimeHours);
  console.log("Sleep time during the day (hours): ", sleepTimeHours);

  // Calculate the total consumption per day in mAh

  const consumptionAvg =
    (activeTimeHours * activeModeCurrent + sleepTimeHours * sleepModeCurrent) /
    24;
  console.log("Consumption Avg: ", consumptionAvg);
  console.log("Battery capacity: ", batteryCapacity);

  // Calculate the battery life in days and years
  const batteryLifeHours = batteryCapacity / consumptionAvg;
  const batteryLifeDays = batteryLifeHours / 24;
  const batteryLifeYears = batteryLifeDays / 365.24;

  // Calculate the total number of packets sent during the battery life
  const totalPacketsSent = batteryLifeDays * amountOfChecksPerDay;
  console.log(`Battery Life: ${batteryLifeHours.toFixed(2)} hours`);
  console.log(`Battery Life: ${batteryLifeDays.toFixed(2)} days`);
  console.log(`Battery Life: ${batteryLifeYears.toFixed(2)} years`);
  console.log(`Total Packets Sent: ${totalPacketsSent.toFixed(0)} packets`);

  return {
    batteryLifeHours,
    batteryLifeDays,
    batteryLifeYears,
    totalPacketsSent,
  };
}
