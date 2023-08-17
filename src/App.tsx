import { Tab, Tabs } from "@nextui-org/react";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import SimpleStorePage from "./pages/simpleStore";
import UpdateStorePage from "./pages/updateStore";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-center">
        <Tabs
          onSelectionChange={(key) => {
            navigate(key as string);
          }}
        >
          {router.map((item) => (
            <Tab title={item.title} key={item.path}></Tab>
          ))}
        </Tabs>
      </div>
      {children}
    </>
  );
};

const router: (RouteObject & { title: string })[] = [
  {
    title: "simple store",
    path: "/",
    element: (
      <Layout>
        <SimpleStorePage />
      </Layout>
    ),
  },
  {
    title: "update store",
    path: "/about",
    element: (
      <Layout>
        <UpdateStorePage />
      </Layout>
    ),
  },
];

const App = () => {
  return (
    <main className="w-full min-h-full flex flex-col p-10">
      <RouterProvider router={createBrowserRouter(router)} />
    </main>
  );
};

export default App;
