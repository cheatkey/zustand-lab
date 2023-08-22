import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Link,
  CardHeader,
  Card,
  Image,
  Divider,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import SimpleStorePage from "./pages/simpleStore";
import UpdateStorePage from "./pages/updateStore";
import UpdateStoreImmer from "./pages/updateStoreImmer";
import PersistStorePage from "./pages/persistStore";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GitHub, Post } from "iconoir-react";
import CombineGetPage from "./pages/combineGetStore";
import RenderingOptimizationPage from "./pages/renderingOptimization";
import NonReactPage from "./pages/nonReact";
import DebugStorePage from "./pages/debugStore";

const router: (RouteObject & {
  title: string;
  exampleTitle: string;
  postURL: string;
})[] = [
  {
    title: "zustand store 선언 방법 소개",
    exampleTitle: "카운터",
    postURL: "http://localhost:5173/todo-immer",
    path: "/simple-store",
    element: <SimpleStorePage />,
  },
  {
    title: "update 상태 업데이트 하는 방법 예제",
    exampleTitle: "todo list",
    postURL: "",
    path: "/todo",
    element: <UpdateStorePage />,
  },
  {
    title: "immer를 사용하여 상태를 업데이트 하는 예제",
    exampleTitle: "todo list",
    postURL: "",
    path: "/todo-immer",
    element: <UpdateStoreImmer />,
  },
  {
    title: "persist를 사용하여 새로고침을 해도 데이터가 날라가지 않는 예제",
    exampleTitle: "로그인 & 유저 정보 업데이트",
    postURL: "",
    path: "/persist-store",
    element: <PersistStorePage />,
  },
  {
    title: "[레시피] combine의 get 함수에서 method를 타입 추론하는 예제",
    exampleTitle: "제품 검색",
    postURL: "",
    path: "/combine-get",
    element: <CombineGetPage />,
  },
  {
    title: "리렌더링 최적화",
    exampleTitle: "todo list",
    postURL: "",
    path: "/rerendering",
    element: <RenderingOptimizationPage />,
  },
  {
    title: "non-react 예제",
    exampleTitle: "유저 정보 유효성 검사",
    postURL: "",
    path: "/non-react",
    element: <NonReactPage />,
  },
  {
    title: "디버깅 예제",
    exampleTitle: "counter",
    postURL: "",
    path: "/debug-todo",
    element: <DebugStorePage />,
  },
];

const NavigatePage = () => {
  return (
    <Table aria-label="example navigator">
      <TableHeader>
        <TableColumn>예제</TableColumn>
        <TableColumn>제목</TableColumn>
        <TableColumn>url</TableColumn>
      </TableHeader>
      <TableBody>
        {router.map((item) => (
          <TableRow key={item.path}>
            <TableCell>
              <Link href={item.path}>{item.title}</Link>
            </TableCell>
            <TableCell>
              <Link href={item.path}>{item.exampleTitle}</Link>
            </TableCell>
            <TableCell>
              <Link href={item.postURL}>{item.postURL}</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const InfoCard = () => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">zustand lab</p>
          <p className="text-small text-default-500">https://cheatkey.dev</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>zustand 포스트에 있는 예시입니다.</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-1 items-center">
            <GitHub color="#0070F0" fontSize={12} />
            <Link isExternal href="https://github.com/nextui-org/nextui">
              Github
            </Link>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Post color="#0070F0" fontSize={12} />
            <Link isExternal href="https://github.com/nextui-org/nextui">
              블로그 포스트
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const App = () => {
  return (
    <>
      <main className="w-full min-h-full flex flex-col p-10 gap-8">
        <InfoCard />
        <RouterProvider
          router={createBrowserRouter([
            ...router,
            {
              path: "*",
              element: <NavigatePage />,
            },
          ])}
        />
      </main>
      <ToastContainer />
    </>
  );
};

export default App;
