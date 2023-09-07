import { Card, CardBody, Input } from "@nextui-org/react";
import { useUserInfo } from "../useUserInfo";

interface IAgeCardProps {}

const AgeCard = ({}: IAgeCardProps) => {
  const store = useUserInfo();

  return (
    <>
      <Card>
        <CardBody className="flex flex-col gap-4">
          <p>name: {store.age}</p>
          <Input
            value={store.age.toString()}
            onValueChange={(value) => {
              if (Number.isInteger(Number(value))) {
                store.setAge(Number(value));
              }
            }}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default AgeCard;
