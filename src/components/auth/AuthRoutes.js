import { Route, Routes } from "react-router-dom";
import { nav } from "./navigations";

import { useUserContext } from "../../hooks/AuthProvider";
import ErrorPage from "../../pages/ErrorPage";
import EmailVerficationPage from "../../pages/EmailVerficationPage";

export const AuthRoutes = () => {
  const { authenticated, user } = useUserContext();

  return (
    <Routes>
      {nav.map((r, i) => {
        if (r.isPrivate && authenticated && user.emailVerfiactionStatus === true) {
          return (
            <Route key={i} path={r.path} element={r.element}>
              {r.children && r.children.length > 0 &&
                r.children.map((child, index) => (
                  <Route key={index} path={child.path} element={child.element} />
                ))
              }
            </Route>
          );
        } else if (!r.isPrivate && !authenticated) {
          return <Route key={i} path={r.path} element={r.element}>
            {r.children && r.children.length > 0 &&
              r.children.map((child, index) => (
                <Route key={index} path={child.path} element={child.element} />
              ))
            }
          </Route>;
        } else return false;
      })}
     
       {user.emailVerfiactionStatus === false && authenticated && <Route path="/email-verification" element={<EmailVerficationPage />} />}
      
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
