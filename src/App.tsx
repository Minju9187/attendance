import "./App.css";
import Router from "./routes/Router";
import BasicLayout from "./styles/BasicLayout";

const App = () => {
  return (
    <>
      <BasicLayout>
        <Router />
      </BasicLayout>
    </>
  );
};

export default App;
