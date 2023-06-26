import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Helmet } from "react-helmet";
import taskbaricon from "./assets/taskbaricon.ico";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Helmet>
      <title>Innovators</title>
      <meta name="description" content="My App Description" />
      <link rel="icon" href={taskbaricon} type="image/x-icon" />
    </Helmet>
    <App />
  </BrowserRouter>
);
