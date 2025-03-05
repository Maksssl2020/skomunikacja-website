import Page from "../animations/Page.tsx";
import Select from "../components/select/Select.tsx";
import CalculatorInput from "../components/input/CalculatorInput.tsx";
import EnabledDisabledInput from "../components/input/EnabledDisabledInput.tsx";
import { useForm } from "react-hook-form";
import { LoRaPerformanceCalculation } from "../utils/LoRaPerformanceCalculation.ts";
import { useEffect, useState } from "react";
import CalculationResultCard from "../components/card/CalculationResultCard.tsx";

const spreadingFactorData: string[] = ["7", "8", "9", "10", "11", "12"];

const bandwidthData: string[] = [
  "250",
  "125",
  "62,5",
  "41,67",
  "31.25",
  "20.83",
  "15,64",
  "10,42",
  "7,81",
];

const codeRateData: string[] = ["4/5", "4/6", "4/7", "4/8"];
const bateryCapacityData: string[] = ["1200", "2600", "3600", "9000"];
type configurationCardProps = {
  title: string;
  bgColor: string;
  dataName: "preambleLength" | "headerMode" | "payloadLength" | "crc";
  watchData: boolean | null;
  defaultData: string | null;
  dataUnit: string;
};

const chosenConfiguration: configurationCardProps[] = [
  {
    title: "Preamble",
    bgColor: "bg-green-100",
    dataName: "preambleLength",
    watchData: true,
    defaultData: null,
    dataUnit: "Symbols",
  },
  {
    title: "Header",
    bgColor: "bg-yellow-100",
    dataName: "headerMode",
    watchData: false,
    defaultData: "8",
    dataUnit: "Symbols",
  },
  {
    title: "Payload",
    bgColor: "bg-orange-100",
    dataName: "payloadLength",
    watchData: true,
    defaultData: null,
    dataUnit: "Bytes",
  },
  {
    title: "CRC",
    bgColor: "bg-red-100",
    dataName: "crc",
    watchData: false,
    defaultData: "16",
    dataUnit: "Bits",
  },
];

type loRaModemSettingsDataProps = {
  title: string;
  dropdownData: string[] | null;
  dataName:
    | "spreadingFactor"
    | "bandwidth"
    | "codeRate"
    | "lowDatarateOptimize"
    | "batteryCapacity";
  componentType: "select" | "enableDisable";
};

const loRaModemSettingsData: loRaModemSettingsDataProps[] = [
  {
    title: "Spreading Factor",
    dropdownData: spreadingFactorData,
    dataName: "spreadingFactor",
    componentType: "select",
  },
  {
    title: "Bandwidth ( kHz )",
    dropdownData: bandwidthData,
    dataName: "bandwidth",
    componentType: "select",
  },
  {
    title: "Code Rate",
    dropdownData: codeRateData,
    dataName: "codeRate",
    componentType: "select",
  },
  {
    title: "Low Datarate Optimize",
    dropdownData: null,
    dataName: "lowDatarateOptimize",
    componentType: "enableDisable",
  },
  {
    title: "Battery capacity (mAh)",
    dropdownData: bateryCapacityData,
    dataName: "batteryCapacity",
    componentType: "select",
  },
];

type packetConfigurationDataProps = {
  title: string;
  dataName: "preambleLength" | "payloadLength" | "headerMode" | "crc";
  componentType: "input" | "enableDisable";
  maxValue?: number | null;
  minValue?: number | null;
  defaultValue?: number | null;
  incrementDecrementValue?: number | null;
  bgColor: string;
  textColor?: "#E6E6E6" | "#171719" | null;
};

const packetConfigurationData: packetConfigurationDataProps[] = [
  {
    title: "Preamble length ( Symbols )",
    dataName: "preambleLength",
    componentType: "input",
    maxValue: 65535,
    minValue: 8,
    defaultValue: 0,
    incrementDecrementValue: 1,
    bgColor: "#0E7565",
  },
  {
    title: "Payload length ( Bytes )",
    dataName: "payloadLength",
    componentType: "input",
    maxValue: 253,
    minValue: 1,
    defaultValue: 1,
    incrementDecrementValue: 1,
    bgColor: "#E25225",
  },
  {
    title: "Header mode",
    dataName: "headerMode",
    componentType: "enableDisable",
    maxValue: null,
    minValue: null,
    defaultValue: null,
    incrementDecrementValue: null,
    bgColor: "#EBCB2C",
    textColor: "#171719",
  },
  {
    title: "CRC",
    dataName: "crc",
    componentType: "enableDisable",
    maxValue: null,
    minValue: null,
    defaultValue: null,
    incrementDecrementValue: null,
    bgColor: "#CB333E",
  },
];

type rfSettingsDataProps = {
  title: string;
  maxValue: number;
  minValue: number;
  defaultValue: number;
  incrementDecrementValue: number;
  dataName: "noiseFigure" | "transmitPower" | "crystalTolerance";
};

const rfSettingsData: rfSettingsDataProps[] = [
  {
    title: "Noise figure",
    maxValue: 20,
    minValue: 4,
    defaultValue: 4,
    incrementDecrementValue: 1,
    dataName: "noiseFigure",
  },
  {
    title: "Transmit Power",
    maxValue: 22,
    minValue: -6,
    defaultValue: 1,
    incrementDecrementValue: 1,
    dataName: "transmitPower",
  },
  {
    title: "Crystal Tolerance",
    maxValue: 100,
    minValue: 0.5,
    defaultValue: 10,
    incrementDecrementValue: 0.5,
    dataName: "crystalTolerance",
  },
];

type calculatedResultType = {
  maximumFrequencyError: number;
  airTime: number;
  symbolTime: number;
  totalLength: number;
  receiverSensitivity: number;
  linkBudget: number;
};

type calculatedResultsCardsProps = {
  title: string;
  unit: string;
  result: number;
};

const LoRaPerformanceCalculator = () => {
  const { setValue, watch } = useForm({
    defaultValues: {
      spreadingFactor: "7",
      bandwidth: "250",
      codeRate: "4/5",
      lowDatarateOptimize: true,
      preambleLength: 12.25,
      payloadLength: 1,
      headerMode: true,
      crc: true,
      noiseFigure: 4,
      transmitPower: 1,
      crystalTolerance: 10,
      batteryCapacity: "1200",
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  });

  const [calculatedResults, setCalculatedResults] =
    useState<calculatedResultType>({
      maximumFrequencyError: 0,
      airTime: 0,
      symbolTime: 0,
      totalLength: 0,
      receiverSensitivity: 0,
      linkBudget: 0,
    });

  const calculatedResultsLeftCardsData: calculatedResultsCardsProps[] = [
    {
      title: "Całkowita długość",
      unit: "Sybmols",
      result: calculatedResults.totalLength,
    },
    {
      title: "Czas symbolu",
      unit: "ms",
      result: calculatedResults.symbolTime,
    },
    {
      title: "Czas antenowy",
      unit: "ms",
      result: calculatedResults.airTime,
    },
  ];

  const calculatedResultsRightCardsData: calculatedResultsCardsProps[] = [
    {
      title: "Budżet linku",
      unit: "dBm",
      result: calculatedResults.linkBudget,
    },
    {
      title: "Czułość odbiornika",
      unit: "dBm",
      result: calculatedResults.receiverSensitivity,
    },
    {
      title: "Max. błąd częstotliwości",
      unit: "kHz",
      result: calculatedResults.maximumFrequencyError,
    },
  ];

  const visibleConfigs = chosenConfiguration.filter(
    (data) => watch(data.dataName) || data.watchData === true,
  );

  console.log(visibleConfigs.length);

  const gridCols = `grid-cols-${Math.min(Math.max(visibleConfigs.length, 2), 4)}`;

  const spreadingFactor = parseFloat(watch("spreadingFactor"));
  const bandwidth = parseFloat(watch("bandwidth"));
  const preambleLength = watch("preambleLength");
  const payloadLength = watch("payloadLength");
  const headerMode = watch("headerMode");
  const crc = watch("crc");
  const lowDatarateOptimize = watch("lowDatarateOptimize");
  const noiseFigure = watch("noiseFigure");
  const transmitPower = watch("transmitPower");
  const crystalTolerance = watch("crystalTolerance");
  const batteryCapacity = watch("batteryCapacity");
  console.log(batteryCapacity);

  const codeRateValue = () => {
    const codeRate = watch("codeRate");
    const data = codeRate.split("/");
    return Number(data[1]);
  };

  const cr = codeRateValue();

  useEffect(() => {
    const results = LoRaPerformanceCalculation({
      spreadingFactor,
      bandwidth,
      codeRate: cr,
      lowDatarateOptimize,
      preambleLength,
      payloadLength,
      headerMode,
      crc,
      noiseFigure,
      transmitPower,
      crystalTolerance,
    });

    setCalculatedResults(results);
  }, [
    spreadingFactor,
    bandwidth,
    cr,
    lowDatarateOptimize,
    preambleLength,
    payloadLength,
    headerMode,
    crc,
    noiseFigure,
    transmitPower,
    crystalTolerance,
  ]);

  return (
    <Page className={"flex justify-center"}>
      <div
        className={
          "text-white-100 flex h-auto w-[1150px] flex-col items-center gap-16"
        }
      >
        <h1 className={"text-white-100 text-5xl"}>
          Kalkulator Wydajności LoRa
        </h1>
        <div
          className={
            "flex w-full flex-col gap-6 rounded-xl border-2 border-blue-200 p-4"
          }
        >
          <div className={"flex justify-between"}>
            <div className={"flex flex-col gap-8"}>
              <label className={"text-xl font-bold"}>
                Ustawienia Modemu LoRa
              </label>
              {loRaModemSettingsData.map((data, index) => (
                <div
                  className={"flex w-[350px] items-center justify-between"}
                  key={index}
                >
                  <label className={"text-xl"}>{data.title}</label>
                  {data.componentType === "select" ? (
                    <Select
                      dropdownData={data.dropdownData!}
                      setValue={setValue}
                      name={data.dataName}
                    />
                  ) : (
                    <EnabledDisabledInput
                      setValue={setValue}
                      name={data.dataName}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className={"flex flex-col gap-8"}>
              <label className={"text-xl font-bold"}>
                Konfiguracja Pakietu
              </label>
              {packetConfigurationData.map((data, index) => (
                <div
                  key={index}
                  className={"flex w-[350px] items-center justify-between"}
                >
                  <label className={"text-lg"}>{data.title}</label>
                  {data.componentType === "input" ? (
                    <CalculatorInput
                      max={data.maxValue!}
                      min={data.minValue!}
                      defaultValue={
                        data.dataName === "preambleLength"
                          ? watch("preambleLength") - 4.25
                          : data.defaultValue!
                      }
                      numberIncrementDecrementValue={
                        data.incrementDecrementValue!
                      }
                      setValue={setValue}
                      name={data.dataName}
                      bgColor={data.bgColor}
                    />
                  ) : (
                    <EnabledDisabledInput
                      textColor={
                        data.textColor !== null ? data.textColor! : "#E6E6E6"
                      }
                      bgColor={data.bgColor}
                      setValue={setValue}
                      name={data.dataName}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className={"flex flex-col gap-8"}>
              <label className={"text-xl font-bold"}>Ustawienia RF</label>
              {rfSettingsData.map((data, index) => (
                <div
                  className={"flex w-[350px] items-center justify-between"}
                  key={index}
                >
                  <label className={"text-lg"}>{data.title}</label>
                  <CalculatorInput
                    max={data.maxValue}
                    min={data.minValue}
                    defaultValue={data.defaultValue}
                    numberIncrementDecrementValue={data.incrementDecrementValue}
                    setValue={setValue}
                    name={data.dataName}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={"flex h-auto w-full items-center"}>
            <label className={"w-[200px] text-xl"}>Periodicity (h:m:s)</label>
            <div className={"flex h-auto w-auto items-center gap-2"}>
              <CalculatorInput
                min={0}
                max={24}
                defaultValue={0}
                numberIncrementDecrementValue={1}
                setValue={setValue}
                name={"hours"}
              />
              <label className={"text-xl font-bold"}>:</label>
              <CalculatorInput
                min={0}
                max={60}
                defaultValue={0}
                numberIncrementDecrementValue={1}
                setValue={setValue}
                name={"minutes"}
              />
              <label className={"text-xl font-bold"}>:</label>
              <CalculatorInput
                min={0}
                max={60}
                defaultValue={0}
                numberIncrementDecrementValue={1}
                setValue={setValue}
                name={"seconds"}
              />
            </div>
          </div>
          <div
            className={"flex flex-col gap-4 border-t-2 border-blue-200 pt-6"}
          >
            <label className={"text-xl font-bold"}>Wybrana konfiguracja</label>
            <div
              style={{
                gridAutoFlow: "column",
              }}
              className={`grid max-h-[100px] w-full rounded-lg bg-white ${gridCols}`}
            >
              {chosenConfiguration.map(
                (data, index) =>
                  (watch(data.dataName) || data.watchData === true) && (
                    <div className={"bg-black-100 flex flex-col gap-2"}>
                      <div
                        key={index}
                        className={`flex h-[75px] w-full items-center justify-center ${data.bgColor}`}
                      >
                        <label className={"text-xl"}>{data.title}</label>
                      </div>
                      <label
                        className={
                          "bg-black-100 flex h-[25px] items-center justify-center"
                        }
                      >
                        {data.watchData !== false
                          ? `${watch(data.dataName)} ${data.dataUnit}`
                          : `${data.defaultData} ${data.dataUnit}`}
                      </label>
                    </div>
                  ),
              )}
            </div>
          </div>
          <div
            className={"flex flex-col gap-8 border-t-2 border-blue-200 pt-6"}
          >
            <label className={"text-xl font-bold"}>Rezultat obliczeń</label>
            <div
              className={
                "flex h-auto w-full items-center justify-center gap-16"
              }
            >
              <div className={"flex h-auto w-auto flex-col gap-8"}>
                <label className={"text-xl font-bold"}>Wydajność czasowa</label>
                {calculatedResultsLeftCardsData.map((data, index) => (
                  <CalculationResultCard
                    key={index}
                    className={"flex w-[385px] items-center justify-between"}
                    title={data.title}
                    result={`${data.result}`}
                    unit={data.unit}
                  />
                ))}
              </div>
              <div className={"flex h-auto w-auto flex-col gap-8"}>
                <label className={"text-xl font-bold"}>Wydajność RF</label>
                {calculatedResultsRightCardsData.map((data, index) => (
                  <CalculationResultCard
                    key={index}
                    className={"flex w-[385px] items-center justify-between"}
                    title={data.title}
                    result={`${data.result}`}
                    unit={data.unit}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default LoRaPerformanceCalculator;
