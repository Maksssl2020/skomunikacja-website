import Page from "../animations/Page.tsx";

const Home = () => {
  return (
    <Page className={"h-[calc(100vh - 75px)] flex"}>
      <div className={"flex h-full w-full flex-col"}>
        <div></div>
        <h1 className={"text-3xl text-white"}>
          S Komunikacja - Systemy Pomiarowe
        </h1>
      </div>
    </Page>
  );
};

export default Home;
