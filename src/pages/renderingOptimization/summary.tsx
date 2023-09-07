import { useTodoBase } from "./useOptimizationTodo";

interface ISummaryProps {}

const Summary = ({}: ISummaryProps) => {
  const computedValue = useTodoBase((state) => state.computedValue());

  return <p>{computedValue}</p>;
};

export default Summary;
