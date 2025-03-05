import { motion } from "framer-motion";

type NewsInformationCardProps = {
  title: string;
  description: string;
  newsDate: string;
  newsAuthor: string;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
};

const NewsInformationCard = ({
  title,
  description,
  newsDate,
  newsAuthor,
  tags,
  imageUrl,
  imageAlt,
}: NewsInformationCardProps) => {
  return (
    <motion.div
      className={
        "text-white-100 bg-black-300 h-auto w-full rounded-xl border-2 border-gray-300"
      }
    >
      <img
        className={"h-[200px] w-full rounded-t-xl object-cover"}
        src={imageUrl}
        alt={imageAlt}
      />
      <div
        className={
          "flex h-auto w-full flex-col gap-4 border-t-2 border-gray-300 p-2"
        }
      >
        <header className={"flex h-auto justify-between text-xl font-bold"}>
          <p>{newsDate}</p>
          <p className={"text-gray-300"}>{newsAuthor}</p>
        </header>
        <h2 className={"text-2xl font-bold"}>{title}</h2>
        <p className={"text-gray-300"}>{description}</p>
        <footer>
          <div
            className={"flex flex-wrap gap-2 text-lg font-bold text-blue-200"}
          >
            {tags.map((tag, index) => (
              <span key={index}>#{tag}</span>
            ))}
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

export default NewsInformationCard;
