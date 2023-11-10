import { Button } from "@nextui-org/react";
import { useDebugStore } from "./useDebugStore";
import { useDebugStoreActionName } from "./useDebugStoreActionName";

const DebugStorePage = () => {
  const { increase, decrease, count } = useDebugStoreActionName();

  return (
    <div className="flex flex-col gap-4 pt-14">
      <p className="text-2xl text-center">count: {count}</p>
      <div className="flex flex-row gap-4">
        <Button
          className="w-32"
          color="primary"
          variant="shadow"
          onClick={() => {
            increase("dd", 3);
          }}
        >
          increase
        </Button>
        <Button
          className="w-32"
          color="primary"
          variant="shadow"
          onClick={() => {
            decrease();
          }}
        >
          decrease
        </Button>
      </div>
    </div>
  );
};

export default DebugStorePage;
