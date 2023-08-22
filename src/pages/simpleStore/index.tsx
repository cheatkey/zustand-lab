import { Button } from "@nextui-org/react";
import { useBearStore } from "./useBearStore";

interface ISimpleStorePageProps { }

const SimpleStorePage = ({ }: ISimpleStorePageProps) => {
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increase);

  return (
    <div className="flex flex-col gap-4 pt-14">
      <p className="text-2xl text-center">count: {bears}</p>
      <Button
        color="primary"
        variant="shadow"
        onClick={() => {
          increase(1);
        }}
      >
        increase
      </Button>
    </div>
  );
};

export default SimpleStorePage;
