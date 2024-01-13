import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootPage from './pages/RootPage'
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NewDataPage from './pages/NewDataPage';
import MyAccountPage from './pages/MyAccountPage';
import store from './store/store';
import { Provider } from 'react-redux';
import PublicationPage from './pages/PublicationPage';
import ProfilePage from './pages/ProfilePage';
import LibraryPage from './pages/LibraryPage';
import { ProtectedComponent } from './components/auth/ProtectedComponent';
import { PublicComponents } from './components/auth/PublicComponents';
import { NoAuthComponent } from './components/auth/NoAuthComponent';

import AuthProvider, { useUserContext } from './hooks/AuthProvider';
import LoadinView from './components/view/LoadingView';
import AllView from './components/view/PublicationsView/AllView';
import Basket from './components/library/Basket';
import ExploreComponent from './components/home/ExploreComponent';
import FollowedResearchers from './components/home/FollowedResearchers';
import NotificationsComponent from './components/home/NotificationsComponent';

const theme = createTheme({
    palette: {
        primary: {
            main: '#091582',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#fff',
        },
        secondary: {
            main: '#101582',
            light: '#53fc33',
            dark: '#091582',
            contrastText: '#fff',
        },
        background: {
            default: '#FFFFFF'
        },
        error: {
            main: "#d32f2f",
            light: "#ef5350",
            dark: "#c622828",
            contrastText: "#fff"
        }
    },
    typography: {
        fontSize: 12,
    }
});
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <ProtectedComponent />,
                children: [
                    {
                        path: "/",
                        element: <HomePage />,
                        children:[
                            {
                                path:"/",
                                element:<ExploreComponent/>
                            },
                            {
                                path:"/followedResearchers",
                                element:<FollowedResearchers/>
                            },
                            {
                                path:"/notifications",
                                element:<NotificationsComponent/>
                            }
                        ]

                    },
                    {
                        path:"/myAccount",
                        element:<MyAccountPage/>
                    },

                    {
                        path: "/publications/:publicationId",
                        element: <PublicationPage />,
                    },
                    {
                        path: "/publications/create",
                        element: <NewDataPage />
                    },
                    {
                        path: "/:username",
                        element: <ProfilePage />,
                        children: [
                            {
                                path: "",
                                element: <AllView />
                            },
                            {
                                path: ":type",
                                element: <AllView />
                            },

                        ]
                    },
                    {
                        path: "/library",
                        element: <LibraryPage />,
                        children: [
                            {
                                path: "basket",
                                element: <Basket />
                            }
                        ]
                    }
                ]
            },

        ],

    },
    {
        path: '/test',
        element: <LoadinView />
    },
    {
        element: <PublicComponents />,
        children: [

        ]
    },
    {
        element: <NoAuthComponent />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/signup",
                element: <SignUpPage />
            },
        ]
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </ThemeProvider>
    </Provider>


);
