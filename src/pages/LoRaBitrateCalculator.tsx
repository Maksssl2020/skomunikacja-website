import Page from "../animations/Page.tsx";
import Select from "../components/select/Select.tsx";
import CalculatorInput from "../components/input/CalculatorInput.tsx";
import EnabledDisabledInput from "../components/input/EnabledDisabledInput.tsx";
import { useForm } from "react-hook-form";
import { LoRaBitrateCalculation } from "../utils/LoRaBitrateCalculation.ts";
import { useEffect, useState } from "react";

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

const LoRaBitrateCalculator = () => {
  const { setValue, watch } = useForm({
    defaultValues: {
      spreadingFactor: "7",
      bandwidth: "250",
      codeRate: "4/5",
      lowDatarateOptimize: true,
      preambleLength: 16.25,
      payloadLength: 1,
      headerMode: true,
      crc: true,
      transmitPower: 1,
    },
  });

  const [calculatedResults, setCalculatedResults] = useState({
    maximumFrequencyError: 0,
    airTime: 0,
    symbolTime: 0,
    totalLength: 0,
  });

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
  const transmitPower = watch("transmitPower");

  const codeRateValue = () => {
    const codeRate = watch("codeRate");
    const data = codeRate.split("/");
    return Number(data[0]) / Number(data[1]);
  };

  const cr = codeRateValue();

  useEffect(() => {
    const results = LoRaBitrateCalculation({
      spreadingFactor,
      bandwidth,
      codeRate: cr,
      lowDatarateOptimize,
      crc,
      headerMode,
      payloadLength,
      preambleLength,
      transmitPower,
    });

    setCalculatedResults(results);
  }, [
    spreadingFactor,
    bandwidth,
    preambleLength,
    payloadLength,
    headerMode,
    crc,
    lowDatarateOptimize,
    transmitPower,
    cr,
  ]);

  return (
    <Page className={"flex justify-center"}>
      <div
        className={
          "text-white-100 flex h-auto w-[1150px] flex-col items-center gap-16"
        }
      >
        <h1 className={"text-white-100 text-5xl"}>Kalkulator LoRa Bitrate</h1>
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
              <div className={"flex w-[350px] items-center justify-between"}>
                <label className={"text-lg"}>Spreading Factor</label>
                <Select
                  dropdownData={spreadingFactorData}
                  setValue={setValue}
                  name={"spreadingFactor"}
                />
              </div>
              <div className={"flex w-[350px] items-center justify-between"}>
                <label className={"text-lg"}>Bandwidth ( kHz)</label>
                <Select
                  dropdownData={bandwidthData}
                  setValue={setValue}
                  name="bandwidth"
                />
              </div>
              <div className={"flex w-[350px] items-center justify-between"}>
                <label className={"text-lg"}>Code Rate</label>
                <Select
                  dropdownData={codeRateData}
                  setValue={setValue}
                  name="codeRate"
                />
              </div>
              <div className={"flex w-[350px] justify-between"}>
                <label className={"text-lg"}>Low Datarate Optimize</label>
                <EnabledDisabledInput
                  setValue={setValue}
                  name={"lowDatarateOptimize"}
                />
              </div>
            </div>
            <div className={"flex flex-col gap-8"}>
              <label className={"text-xl font-bold"}>
                Konfiguracja Pakietu
              </label>
              <div className={"flex w-[350px] items-center justify-between"}>
                <label className={"text-lg"}>Preamble length ( Symbols )</label>
                <CalculatorInput
                  max={65535}
                  min={12}
                  defaultValue={watch("preambleLength") - 4.25}
                  numberIncrementDecrementValue={1}
                  setValue={setValue}
                  name={"preambleLength"}
                  bgColor={"#0E7565"}
                />
              </div>
              <div className={"flex w-[350px] items-center justify-between"}>
                <label className={"text-lg"}>Payload length ( Bytes )</label>
                <CalculatorInput
                  max={253}
                  min={1}
                  defaultValue={1}
                  numberIncrementDecrementValue={1}
                  setValue={setValue}
                  name={"payloadLength"}
                  bgColor={"#E25225"}
                />
              </div>
              <div className={"flex w-[350px] items-center justify-between"}>
                <label className={"text-lg"}>Header mode</label>
                <EnabledDisabledInput
                  textColor={"#171719"}
                  bgColor={"#EBCB2C"}
                  setValue={setValue}
                  name={"headerMode"}
                />
              </div>
              <div className={"flex w-[350px] items-center justify-between"}>
                <label className={"text-lg"}>CRC</label>
                <EnabledDisabledInput
                  bgColor={"#CB333E"}
                  setValue={setValue}
                  name={"crc"}
                />
              </div>
            </div>
            <div className={"flex flex-col gap-8"}>
              <label className={"text-xl font-bold"}>Ustawienia RF</label>
              <div className={"flex w-[350px] items-center justify-between"}>
                <label className={"text-lg"}>Transmit power</label>
                <CalculatorInput
                  max={22}
                  min={-6}
                  defaultValue={1}
                  numberIncrementDecrementValue={1}
                  setValue={setValue}
                  name={"transmitPower"}
                />
              </div>
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
                <div className={"flex w-[350px] items-center justify-between"}>
                  <label className={"text-lg"}>Całkowita długość</label>
                  <label
                    className={
                      "flex h-[50px] w-[150px] items-center rounded-xl border-2 px-2"
                    }
                  >
                    {calculatedResults.totalLength}
                  </label>
                </div>
                <div className={"flex w-[350px] items-center justify-between"}>
                  <label className={"text-lg"}>Czas symbolu</label>
                  <label
                    className={
                      "flex h-[50px] w-[150px] items-center rounded-xl border-2 px-2"
                    }
                  >
                    {calculatedResults.symbolTime}
                  </label>
                </div>
                <div className={"flex w-[350px] items-center justify-between"}>
                  <label className={"text-lg"}>Czas antenowy</label>
                  <label
                    className={
                      "flex h-[50px] w-[150px] items-center rounded-xl border-2 px-2"
                    }
                  >
                    {calculatedResults.airTime}
                  </label>
                </div>
              </div>
              <div className={"flex h-auto w-auto flex-col gap-8"}>
                <label className={"text-xl font-bold"}>Wydajność RF</label>
                <div className={"flex w-[350px] items-center justify-between"}>
                  <label className={"text-lg"}>Budżet linku</label>
                  <label
                    className={
                      "flex h-[50px] w-[150px] items-center rounded-xl border-2 px-2"
                    }
                  >
                    22
                  </label>
                </div>
                <div className={"flex w-[350px] items-center justify-between"}>
                  <label className={"text-lg"}>Czułość odbiornika</label>
                  <label
                    className={
                      "flex h-[50px] w-[150px] items-center rounded-xl border-2 px-2"
                    }
                  >
                    22
                  </label>
                </div>
                <div className={"flex w-[350px] items-center justify-between"}>
                  <label className={"text-lg"}>Max. błąd częstotliwości</label>
                  <label
                    className={
                      "flex h-[50px] w-[150px] items-center rounded-xl border-2 px-2"
                    }
                  >
                    {calculatedResults.maximumFrequencyError}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default LoRaBitrateCalculator;
