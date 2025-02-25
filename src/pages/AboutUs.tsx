import Page from "../animations/Page.tsx";
import {
  aboutUsDescription,
  currentServices,
} from "../static-data/aboutUsData.ts";

const AboutUs = () => {
  return (
    <Page className={"h-[calc(100vh - 75px)] flex justify-center"}>
      <div className={"flex w-[1150px] flex-col items-center gap-16"}>
        <h1 className={"text-white-100 text-5xl"}>O Nas</h1>
        <div className={"flex h-auto w-full justify-between gap-8"}>
          <div className={"flex h-[550px] w-[500px]"}>
            <textarea
              readOnly={true}
              className={
                "text-white-100 h-full w-full resize-none text-xl outline-none"
              }
            >
              {aboutUsDescription}
            </textarea>
          </div>

          <div
            className={
              "text-white-100 flex h-[550px] w-[500px] flex-col gap-8 text-xl"
            }
          >
            <h2>Obecnie oferujemy:</h2>
            <ul className={"flex list-disc flex-col gap-4"}>
              {currentServices.map((data, index) => (
                <li key={index}>{data}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default AboutUs;
