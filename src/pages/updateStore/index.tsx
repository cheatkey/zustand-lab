import { useEffect } from "react";
import { useTodoStore } from "./useTodo";
import {
  Chip,
  Checkbox,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
} from "@nextui-org/react";
import GroupButton from "../../components/GroupButton";
import { Check, Cancel, Trash } from "iconoir-react";

interface IUpdateStorePageProps {}

const UpdateStorePage = ({}: IUpdateStorePageProps) => {
  const {
    todo,
    addTodoByPush,
    addTodoBySpread,
    addTodoBySpreadGet,
    addTodoBySpreadDirect,
    deleteItem,
    updateItem,
  } = useTodoStore();

  return (
    <main className="flex flex-col gap-8 mt-8">
      <GroupButton
        menu={[
          {
            title: "array.push를 이용해서 추가",
            function: addTodoByPush,
            description: (
              <div className="flex flex-row gap-1 items-center">
                <Cancel color={"red"} />
                불변성이 지켜지지 않습니다.
              </div>
            ),
          },
          {
            title: "spread 연산자를 이용해서 추가",
            function: addTodoBySpread,
            description: (
              <div className="flex flex-row gap-1 items-center">
                <Check color={"green"} />
                불변성이 지켜집니다.
              </div>
            ),
          },
          {
            title: "spread 연산자를 사용하지만, state를 직접 변경",
            function: addTodoBySpreadDirect,
            description: (
              <div className="flex flex-row gap-1 items-center">
                <Cancel color={"red"} />
                불변성이 지켜지지 않습니다.
              </div>
            ),
          },
          {
            title: "get으로 조회 후, spread 연산자를 통해 todo 변경",
            function: addTodoBySpreadGet,
            description: (
              <div className="flex flex-row gap-1 items-center">
                <Check color={"green"} />
                불변성이 지켜집니다.
              </div>
            ),
          },
        ]}
      />

      <div className="flex flex-col gap-3">
        {todo.map((item) => (
          <Card key={item.id}>
            <CardBody className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2 w-full">
                <Checkbox
                  onValueChange={(bool) => {
                    updateItem(item.id, {
                      status: bool === true ? "done" : "inprogress",
                    });
                  }}
                  isSelected={item.status === "done"}
                />

                <input
                  className="w-full outline-none border-none"
                  value={item.value}
                  onChange={(event) => {
                    const value = event.target.value;
                    console.log("value:", value);
                    updateItem(item.id, {
                      value: value,
                    });
                  }}
                />
              </div>

              <Trash
                width={17}
                color="red"
                className="cursor-pointer"
                onClick={() => {
                  deleteItem(item.id);
                }}
              />
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default UpdateStorePage;
