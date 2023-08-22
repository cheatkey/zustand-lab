import { Input, Code, Divider } from "@nextui-org/react";
import { RecoilRoot, selector, useRecoilValue } from "recoil";
import { atom, useRecoilState } from "recoil";
import useUserName from "./useUserName";
import { Check, Cancel, Divide } from "iconoir-react";

const nameState = atom({
  key: "nameState",
  default: {
    id: "",
    email: "",
  },
});

const userInfoValidation = selector({
  key: "userInfoValidation",
  get: ({ get }) => {
    const { id, email } = get(nameState);

    return (
      id.length >= 1 &&
      email.includes("@") &&
      useUserName.getState().username.length >= 1
    );
  },
});

const NonReactPage = () => {
  const [atomState, setAtomState] = useRecoilState(nameState);
  const isUserInfoValid = useRecoilValue(userInfoValidation);
  const { username, setUserName } = useUserName();

  return (
    <div className="flex flex-col gap-2">
      <Input
        label="id (recoil)"
        value={atomState.id}
        onValueChange={(value) => {
          setAtomState((v) => ({
            ...v,
            id: value,
          }));
        }}
      />
      <Input
        label="email (recoil)"
        value={atomState.email}
        onValueChange={(value) => {
          setAtomState((v) => ({
            ...v,
            email: value,
          }));
        }}
      />

      <Input
        label="username (zustand)"
        value={username}
        onValueChange={(value) => {
          setUserName(value);
        }}
      />

      <div className="flex flex-row items-center gap-2">
        {isUserInfoValid ? (
          <>
            <Check color="green" /> 유저 정보가 유효합니다.
          </>
        ) : (
          <>
            <Cancel color="red" /> 유저 정보가 유효하지 않습니다.
          </>
        )}
      </div>
    </div>
  );
};

export default NonReactPage;
