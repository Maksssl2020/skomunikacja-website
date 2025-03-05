import Page from "../animations/Page.tsx";
import AnimatedAElement from "../components/a/AnimatedAElement.tsx";

const Shop = () => {
  return (
    <Page className={"flex justify-center"}>
      <div
        className={
          "flex min-h-[51.35vh] w-[1150px] flex-col items-center gap-16"
        }
      >
        <h1 className={"text-white-100 text-5xl"}>Sklep</h1>
        <div className={"flex h-full w-full flex-col gap-8 text-3xl"}>
          <p className={"text-white-100 text-3xl"}>
            Kliknij w poniższy link, aby przejść do sklepu z produktami.
          </p>
          <AnimatedAElement
            link={"http://skomunikacja.pl/sklep"}
            title={"Sklep z produktami skomunikacja.pl"}
            initialColor={"#C6F4ED"}
          />
        </div>
      </div>
    </Page>
  );
};

export default Shop;
