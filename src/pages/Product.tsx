import Page from "../animations/Page.tsx";
import { useParams } from "react-router-dom";

type ProductLinkParams = {
  productName: string;
};

const Product = () => {
  const { productName } = useParams<ProductLinkParams>();
  console.log(productName);

  return (
    <Page className={"flex justify-center"}>
      <div className={"flex h-auto w-[1150px] flex-col"}></div>
    </Page>
  );
};

export default Product;
