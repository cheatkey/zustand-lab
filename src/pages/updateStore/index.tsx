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
  Button,
} from "@nextui-org/react";
import GroupButton from "../../components/GroupButton";
import { Trash, Restart } from "iconoir-react";
import AddTodoMenu from "./components/AddTodoMenu";
import Reset from "./components/Reset";
import TodoItem from "./components/TodoItem";

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
    reset,
    addItemFromJsonPlaceholder,
    isLoading,
  } = useTodoStore();

  return (
    <main className="flex flex-col gap-8 mt-8">
      <div className="flex flex-row gap-2 items-center">
        <AddTodoMenu
          functions={{
            "array-push": addTodoByPush,
            spread: addTodoBySpread,
            "spread-direct": addTodoBySpreadDirect,
            "get-spread": addTodoBySpreadGet,
          }}
        />

        <Reset
          onClick={() => {
            reset();
          }}
        />

        <Button
          color="primary"
          isLoading={isLoading}
          onClick={() => {
            addItemFromJsonPlaceholder();
          }}
        >
          JSON placeholder에서 추가
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {todo.map((item) => (
          <TodoItem
            item={item}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
        ))}
      </div>
    </main>
  );
};

export default UpdateStorePage;
