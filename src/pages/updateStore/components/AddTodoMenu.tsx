import { Check, Cancel } from "iconoir-react";
import GroupButton from "../../../components/GroupButton";

const functionMapper = {
  "array-push": "array.push를 이용해서 추가",
  spread: "spread 연산자를 이용해서 추가",
  "spread-direct": "spread 연산자를 사용하지만, state를 직접 변경",
  "get-spread": "get으로 조회 후, spread 연산자를 통해 todo 변경",
} as const;

interface IAddTodoMenuProps {
  functions: Record<keyof typeof functionMapper, () => void>;
}

const AddTodoMenu = ({ functions }: IAddTodoMenuProps) => {
  return (
    <GroupButton
      menu={[
        {
          title: "array.push를 이용해서 추가",
          function: functions["array-push"],
          description: (
            <div className="flex flex-row gap-1 items-center">
              <Cancel color={"red"} />
              불변성이 지켜지지 않습니다.
            </div>
          ),
        },
        {
          title: "spread 연산자를 이용해서 추가",
          function: functions["spread"],
          description: (
            <div className="flex flex-row gap-1 items-center">
              <Check color={"green"} />
              불변성이 지켜집니다.
            </div>
          ),
        },
        {
          title: "spread 연산자를 사용하지만, state를 직접 변경",
          function: functions["spread-direct"],
          description: (
            <div className="flex flex-row gap-1 items-center">
              <Cancel color={"red"} />
              불변성이 지켜지지 않습니다.
            </div>
          ),
        },
        {
          title: "get으로 조회 후, spread 연산자를 통해 todo 변경",
          function: functions["get-spread"],
          description: (
            <div className="flex flex-row gap-1 items-center">
              <Check color={"green"} />
              불변성이 지켜집니다.
            </div>
          ),
        },
      ]}
    />
  );
};

export default AddTodoMenu;
