import { Restart } from "iconoir-react";

interface IResetProps {
  onClick: () => void;
}

const Reset = ({ onClick }: IResetProps) => {
  return (
    <Restart
      className="rounded-sm cursor-pointer"
      onClick={() => {
        onClick();
      }}
    />
  );
};

export default Reset;
