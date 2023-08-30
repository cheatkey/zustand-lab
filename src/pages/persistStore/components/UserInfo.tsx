import { Button, Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import useAuth from "../useAuth";
import useMapSet, { UserInfoKey } from "../useMapSet";

const UserInfo = () => {
  const favoriteLanguages = useMapSet((state) => state.favoriteLanguages);
  const setFavoriteLanguages = useMapSet((state) => state.setFavoriteLanguages);
  const userInfo = useMapSet((state) => state.userInfo);
  const setUserInfo = useMapSet((state) => state.setUserInfo);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-zinc-600">
        좋아하는 프로그래밍 언어 선택 (persist 데이터로 Set을 저장)
      </p>
      <Select
        label="프로그래밍 언어 선택"
        selectionMode="multiple"
        placeholder="좋아하는 언어를 선택해주세요."
        selectedKeys={favoriteLanguages}
        className="max-w-xs"
        onSelectionChange={(keys) => {
          setFavoriteLanguages(keys as Set<string>);
        }}
      >
        {langs.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </Select>

      {(["email", "username"] as UserInfoKey[]).map((key) => (
        <div key={key} className="flex flex-row gap-2 items-center">
          <label>{key}</label>
          <Input
            value={userInfo.get(key)}
            onValueChange={(value) => {
              setUserInfo(key, value);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default UserInfo;

const langs = `Rust
Kotlin
TypeScript
Swift
Go
Julia
Dart
Elixir
Scala
Clojure
Groovy
Elm
Crystal
Haxe
Solidity
F#
Racket
ReasonML
Nim
Zig
`.split("\n");
