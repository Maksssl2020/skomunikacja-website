type calculationResultCardProps = {
  className?: string;
  title: string;
  result: string;
  unit: string;
};

const CalculationResultCard = ({
  className,
  title,
  result,
  unit,
}: calculationResultCardProps) => {
  return (
    <div className={className}>
      <div className={"flex w-[90%] items-center justify-between"}>
        <label className={"text-lg"}>{title}</label>
        <label
          className={
            "flex h-[50px] w-[150px] items-center rounded-xl border-2 px-2"
          }
        >
          {result}
        </label>
      </div>
      <label className={"flex w-[7%]"}>{unit}</label>
    </div>
  );
};

export default CalculationResultCard;
