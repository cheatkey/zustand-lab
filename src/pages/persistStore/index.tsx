import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { Button, Input, Divider } from "@nextui-org/react";
import UserInfo from "./components/UserInfo";
import { toast } from "react-toastify";

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

  useEffect(() => {
    toast.info("페이지를 새로고침 했습니다");
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-zinc-800 tracking-tight">
            로그인 정보 로컬스토리지 저장 예제
          </h1>
          <h2 className="text-lg font-semibold text-zinc-700 tracking-tight">
            hello, {email}
          </h2>
          <p className="text-zinc-600">
            persist가 적용되어 새로고침을 해도 데이터가 사라지지 않습니다.
          </p>
          <Button
            className="w-32"
            color={"primary"}
            onClick={() => {
              reset();
            }}
          >
            로그아웃
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-zinc-800 tracking-tight">
            로그인 정보 로컬스토리지 저장 예제
          </h1>
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
            className="w-32"
            color={"primary"}
            onClick={() => {
              login(inputs.id, inputs.pw);
            }}
          >
            로그인
          </Button>
        </div>
      )}
      <Divider className="my-2" />
      <h1 className="text-3xl font-bold text-zinc-800 tracking-tight">
        유저 정보 Map,Set 데이터 로컬스토리지 저장 예시
      </h1>
      <UserInfo />
    </>
  );
};

export default PersistStorePage;
