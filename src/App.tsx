import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WishBookPage from "pages/WishBookPage/WishBookPage";
import styled from "styled-components";
import Loader from "components/common/Load/Loader";
import DetailPage from "pages/DetailPage/DetailPage";

const MainPage = React.lazy(() => import("./pages/MainPage/MainPage"));

function App(): JSX.Element {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <MainPage />
              </Suspense>
            }
          />
          <Route
            path=":bookCode"
            element={
              <Suspense fallback={<Loader />}>
                <DetailPage />
              </Suspense>
            }
          />
          <Route
            path="/wishbook"
            element={
              <Suspense fallback={<Loader />}>
                <WishBookPage />
              </Suspense>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

const Layout = styled.div`
  width: 100%;
  max-width: 1048px;
  min-height: 100vh;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  background-color: var(--inner-bg-color);
  position: relative;
`;
