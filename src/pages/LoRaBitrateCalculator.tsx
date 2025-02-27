import Page from "../animations/Page.tsx";
import Select from "../components/select/Select.tsx";

const LoRaBitrateCalculator = () => {
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
            "flex w-full flex-col rounded-xl border-2 border-blue-200 p-4"
          }
        >
          <div className={"flex justify-between"}>
            <div className={"flex flex-col gap-8"}>
              <label className={"text-2xl font-bold"}>
                Ustawienia Modemu LoRa
              </label>
              <div className={"flex w-[350px] justify-between"}>
                <label className={"text-xl"}>Spreading Factor</label>
                <select className={"w-[100px]"}>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>
              </div>
              <div className={"flex w-[350px] justify-between"}>
                <label className={"text-xl"}>Bandwidth</label>
                <select className={"w-[100px]"}>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>
              </div>
              <div className={"flex w-[350px] justify-between"}>
                <label className={"text-xl"}>Code Rate</label>
                <select className={"w-[100px]"}>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>
              </div>
              <div className={"flex w-[350px] justify-between"}>
                <label className={"text-xl"}>Low Datarate Optimize</label>
                <input type={"checkbox"} className={"w-[50px]"} />
              </div>
            </div>
            <div className={"flex flex-col gap-8"}>
              <label className={"text-xl font-bold"}>
                Konfiguracja Pakietu
              </label>
              <div className={"flex w-[350px] justify-between"}>
                <label className={"text-xl"}>Transmit power</label>
                <Select dropdownData={["1", "2", "3", "4", "5"]} />
              </div>
            </div>
            <div className={"flex flex-col gap-8"}>
              <label className={"text-xl font-bold"}>Ustawienia RF</label>
              <div className={"flex w-[350px] justify-between"}>
                <label className={"text-xl"}>Transmit power</label>
                <select className={"w-[100px]"}>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default LoRaBitrateCalculator;
