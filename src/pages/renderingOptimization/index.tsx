import { Button } from "@nextui-org/react";
import Reset from "../updateStore/components/Reset";
import TodoItem from "../updateStore/components/TodoItem";
import { useTodoBase, useTodoIDList, useTodoItem } from "./useOptimizationTodo";

const RenderingOptimizationPage = () => {
  const idList = useTodoIDList();
  const addTodo = useTodoBase((state) => state.addTodo);

  const reset = useTodoBase((state) => state.reset);
  const isLoading = useTodoBase((state) => state.isLoading);
  const addItemFromJsonPlaceholder = useTodoBase(
    (state) => state.addItemFromJsonPlaceholder
  );

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
        {idList.map((id) => (
          <TodoItemContainer key={id} id={id} />
        ))}
      </div>
    </main>
  );
};

const TodoItemContainer = ({ id }: { id: string }) => {
  const item = useTodoItem(id);
  const updateItem = useTodoBase((state) => state.updateItem);
  const deleteItem = useTodoBase((state) => state.deleteItem);
  if (!item) return <></>;

  return (
    <TodoItem
      key={item.id}
      item={item}
      updateItem={updateItem}
      deleteItem={deleteItem}
    />
  );
};

export default RenderingOptimizationPage;
