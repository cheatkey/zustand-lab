import { useState } from "react";
import useAuth from "./useAuth";
import { Button, Input } from "@nextui-org/react";

const PersistStorePage = () => {
  const login = useAuth((state) => state.login);
  const email = useAuth((state) => state.email);
  const token = useAuth((state) => state.token);
  const reset = useAuth((state) => state.reset);

  const isLoggedIn = !!token;

  const [inputs, setInputs] = useState<{
    id: string;
    pw: string;
  }>({
    id: "kminchelle",
    pw: "0lelplR",
  });

  return (
    <>
      {isLoggedIn ? (
        <>
          <p>hello, {email}</p>
          <Button
            color={"primary"}
            onClick={() => {
              reset();
            }}
          >
            로그아웃
          </Button>
        </>
      ) : (
        <>
          <Input
            value={inputs["id"]}
            onValueChange={(value) => {
              setInputs((v) => ({ ...v, id: value }));
            }}
          />
          <Input
            value={inputs["pw"]}
            onValueChange={(value) => {
              setInputs((v) => ({ ...v, pw: value }));
            }}
          />
          <Button
            color={"primary"}
            onClick={() => {
              login(inputs.id, inputs.pw);
            }}
          >
            로그인
          </Button>
        </>
      )}
    </>
  );
};

export default PersistStorePage;
