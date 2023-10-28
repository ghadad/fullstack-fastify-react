import { Route } from "react-router-dom";
import Layout from "./Layout";
import Flows from "./flow/Flows";
import Nodes from "./node/Nodes";
import NodeForm from "./node/Form";
import Flowform, { flowLoader } from "./flow/Form";
import Crons from "./scheduler/Crons";
const NotFound = () => {
  return <div>Not found</div>;
};

// define here all the routes of the app
export default [
  <Route path="smartflow" element={<Layout title="smartflow" />}>
    <Route path="flow" element={<Flows />} />
    <Route
      path="flow/edit/:id"
      element={<Flowform />}
      loader={async ({ params }: any): Promise<any> => await flowLoader(params)}
    />
    ,
    <Route path="flow/create" element={<Flowform />} />,
    <Route path="flow/edit/:flowId/add-node" element={<NodeForm />} />,
    <Route path="node" element={<Nodes />} />,
    <Route path="node/edit/:flowId" element={<NodeForm />} />,
    <Route path="node/create" element={<NodeForm />} />,
    <Route path="scheduler" element={<Crons />} />,
    <Route path="*" element={<NotFound />} />,
  </Route>,
];
