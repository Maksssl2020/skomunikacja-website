import Page from "../animations/Page.tsx";
import { useParams } from "react-router-dom";

type ArticlePageParams = {
  articleTitle: string;
};

const Article = () => {
  const { articleTitle } = useParams<ArticlePageParams>();

  console.log(articleTitle);

  return (
    <Page className={"flex justify-center"}>
      <div className={"flex h-auto w-[1150px] flex-col"}></div>
    </Page>
  );
};

export default Article;
