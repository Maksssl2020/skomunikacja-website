import { Editor } from "@tinymce/tinymce-react";
import Page from "../animations/Page.tsx";

const ArticleForm = () => {
  return (
    <Page className={"flex justify-center"}>
      <div className={"flex h-auto w-[1150px] flex-col items-center gap-8"}>
        <h1 className={"text-white-100 text-5xl"}>Utwórz artykuł</h1>
        <div className={"mt-8 h-auto w-full"}>
          <Editor
            onInput={(params) => console.log(params.target.innerHTML)}
            init={{
              plugins: ["emoticons", "link", "lists"],
              skin: "bootstrap",
              height: 1000,
            }}
            // @ts-ignore
            apiKey={import.meta.env.VITE_API_KEY}
          />
        </div>
      </div>
    </Page>
  );
};

export default ArticleForm;
