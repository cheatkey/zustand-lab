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

const router: (RouteObject & { title: string; postURL: string })[] = [
  {
    title: "simple store",
    postURL: "http://localhost:5173/todo-immer",
    path: "/simple-store",
    element: <SimpleStorePage />,
  },
  {
    title: "update store",
    postURL: "",
    path: "/todo",
    element: <UpdateStorePage />,
  },
  {
    title: "update store (immer)",
    postURL: "",
    path: "/todo-immer",
    element: <UpdateStoreImmer />,
  },
  {
    title: "persist login",
    postURL: "",
    path: "/persist-store",
    element: <PersistStorePage />,
  },
  {
    title: "recipe combine method get",
    postURL: "",
    path: "/combine-get",
    element: <CombineGetPage />,
  },
];

const NavigatePage = () => {
  return (
    <Table aria-label="example navigator">
      <TableHeader>
        <TableColumn>example</TableColumn>
        <TableColumn>post url</TableColumn>
      </TableHeader>
      <TableBody>
        {router.map((item) => (
          <TableRow key={item.path}>
            <TableCell>
              <Link href={item.path}>{item.title}</Link>
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
