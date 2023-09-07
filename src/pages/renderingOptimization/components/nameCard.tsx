import { Card, CardBody, Input } from "@nextui-org/react";
import { useUserInfo } from "../useUserInfo";
import { shallow } from "zustand/shallow";

interface INameCardProps {}

const NameCard = ({}: INameCardProps) => {
  // const store = useUserInfo();

  // const name = useUserInfo((state) => state.name);
  // const setName = useUserInfo((state) => state.setName);

  const { name, setName } = useUserInfo(
    (state) => ({
      name: state.name,
      setName: state.setName,
    })
    // shallow
  );

  return (
    <>
      <Card>
        <CardBody className="flex flex-col gap-4">
          <p>name: {name}</p>
          <Input
            value={name}
            onValueChange={(value) => {
              setName(value);
            }}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default NameCard;
