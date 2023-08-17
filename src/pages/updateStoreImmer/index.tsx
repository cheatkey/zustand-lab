import { Button } from "@nextui-org/react";
import AddTodoMenu from "../updateStore/components/AddTodoMenu";
import Reset from "../updateStore/components/Reset";
import TodoItem from "../updateStore/components/TodoItem";
import { useTodoImmer } from "./useTodoImmer";

interface IUpdateStoreImmerProps {}

const UpdateStoreImmer = ({}: IUpdateStoreImmerProps) => {
  const {
    todo,
    addItemFromJsonPlaceholder,
    addTodo,
    updateItem,
    deleteItem,
    isLoading,
    reset,
  } = useTodoImmer();

  return (
    <main className="flex flex-col gap-8 mt-8">
      <div className="flex flex-row gap-2 items-center">
        <Button
          color="primary"
          onClick={() => {
            addTodo();
          }}
        >
          새 todo 아이템 추가
        </Button>

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

export default UpdateStoreImmer;
