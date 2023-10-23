import { Route } from "react-router-dom";
import Layout from "./Layout";
import Form from "./node/Form";

const NotFound = () => {
  return <div>Not found</div>;
};

// define here all the routes of the app
export default [
  <Route path="smartflow" element={<Layout title="smartflow" />}>
    <Route path="node" element={<Form />} />,
    <Route path="action" element={<Layout title="action" />} />,
    <Route path="*" element={<NotFound />} />,
  </Route>,
];
