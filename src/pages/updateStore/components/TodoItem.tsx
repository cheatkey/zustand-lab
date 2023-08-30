import { Card, CardBody, Checkbox } from "@nextui-org/react";
import { Trash } from "iconoir-react";
import { ITodoState, UpdateItemPayload } from "../useTodo";

interface ITodoItemProps {
  item: ITodoState["todo"][number];
  updateItem: (id: string, props: UpdateItemPayload) => void;
  deleteItem: (id: string) => void;
}

const TodoItem = ({ item, updateItem, deleteItem }: ITodoItemProps) => {
  return (
    <Card>
      <CardBody className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2 w-full">
          <Checkbox
            onValueChange={(payload: boolean) => {
              updateItem(item.id, {
                status: payload === true ? "done" : "inprogress",
              });
            }}
            isSelected={item.status === "done"}
          />

          <input
            className="w-full outline-none border-none"
            value={item.value}
            onChange={(event) => {
              const value = event.target.value;
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
  );
};

export default TodoItem;
