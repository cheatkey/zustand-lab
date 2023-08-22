import {
  Button,
  Input,
  Image,
  Card,
  CardBody,
  Divider,
} from "@nextui-org/react";
import useLogger from "./useLogger";

const CombineGetPage = () => {
  const {
    searchInput,
    setSearchInput,
    isLoading,
    searchProduct,
    searchedProduct,
    log,
  } = useLogger((state) => state);

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardBody className="bg-zinc-200">
          검색 로그
          {log.map((item) => (
            <p key={item.id}>{item.value}</p>
          ))}
        </CardBody>
      </Card>

      <Divider className="mt-4" />

      <label>상품 이름</label>

      <div className="flex flex-row gap-2">
        <Input
          value={searchInput}
          onValueChange={(value) => {
            setSearchInput(value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchProduct();
            }
          }}
        />

        <Button color="primary" onClick={searchProduct} isLoading={isLoading}>
          검색
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold text-zinc-700 tracking-tight">
          검색 결과
        </h1>
        {searchedProduct.map((item) => (
          <Card key={item.title}>
            <CardBody className="flex flex-row items-center gap-3">
              <Image width={300} src={item.thumbnail} />
              <p>{item.title}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default CombineGetPage;
