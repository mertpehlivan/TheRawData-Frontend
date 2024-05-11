import HomePage from "../../pages/HomePage";
import LibraryPage from "../../pages/LibraryPage";
import LoginPage from "../../pages/LoginPage";
import NewDataPage from "../../pages/NewDataPage";
import ProfilePage from "../../pages/ProfilePage";
import PublicationPage from "../../pages/PublicationPage";
import MainPage from '../../pages/MainPage'
import SignUpPage from "../../pages/SignUpPage";
import ExploreComponent from "../home/ExploreComponent";
import FollowedResearchers from "../home/FollowedResearchers";
import NotificationsComponent from "../home/NotificationsComponent";
import Basket from "../library/Basket";
import AllView from "../view/PublicationsView/AllView";
import MyAccountPage from "../../pages/MyAccountPage";
import LibraryBox from "../view/LibraryBox";
import SearchComponent from "../home/SearchComponent";

import PaymentPage from "../../pages/PaymentPage";
import ForgetPasswordPage from "../../pages/ForgetPasswordPage";
import AboutUs from "../../pages/AboutUs";
import WhatIs from "../../pages/WhatIs";
import Accuracy from "../../pages/Accuracy";
import TermsPage from "../../pages/TermsPage";
import FaqPage from "../../pages/FaqPage";
import PrivcyPage from "../../pages/PrivcyPage";

export const nav = [
    {
        path: "/privcy",
        element: <PrivcyPage />,
        isMenu: true,
        isPrivate: true
    },
    {
        path: "/privcy",
        element: <PrivcyPage />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/terms",
        element: <TermsPage />,
        isMenu: true,
        isPrivate: true
    },
    {
        path: "/terms",
        element: <TermsPage />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/faq",
        element: <FaqPage />,
        isMenu: true,
        isPrivate: true
    },
    {
        path: "/faq",
        element: <FaqPage />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/accuracy",
        element: <Accuracy />,
        isMenu: true,
        isPrivate: true
    },
    {
        path: "/accuracy",
        element: <Accuracy />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/",
        element: <MainPage />,
        isMenu: true,
        isPrivate: true
    },
    {
        path: "/",
        element: <MainPage />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/whatIs",
        element: <WhatIs />,
        isMenu: true,
        isPrivate: true
    },
    {
        path: "/whatIs",
        element: <WhatIs />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/aboutUs",
        element: <AboutUs />,
        isMenu: true,
        isPrivate: true
    },
    {
        path: "/aboutUs",
        element: <AboutUs />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/home",
        element: <HomePage />,
        isMenu: true,
        isPrivate: true,
        children: [
            {
                path: "",
                element: <ExploreComponent />,

            },
            {
                path: "followedResearchers",
                element: <FollowedResearchers />,

            },
            {
                path: "notifications",
                element: <NotificationsComponent />,

            },
            {
                path: "search",
                element: <SearchComponent />,
            },


        ]

    },
    {
        path: "/myAccount",
        element: <MyAccountPage />,
        isMenu: true,
        isPrivate: true,
        children: []
    },

    {
        path: "/publications/:publicationId",
        element: <PublicationPage />,
        isMenu: true,
        isPrivate: true,
        children: []
    },
    {
        path: "/publications/create",
        element: <NewDataPage />,
        isMenu: true,
        isPrivate: true,
        children: []
    },
    {
        path: "/users/:username",
        element: <ProfilePage />,
        isMenu: true,
        isPrivate: true,
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
        isMenu: true,
        isPrivate: true,
        children: [
            {
                path: "",
                element: <LibraryBox />
            },
            {
                path: "basket",
                element: <Basket />
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/signup",
        element: <SignUpPage />,
        isMenu: false,
        isPrivate: false
    },
    {

        path: "/payment",
        element: <PaymentPage />,
        isMenu: true,
        isPrivate: true

    },
    {

        path: "/forget",
        element: <ForgetPasswordPage />,
        isMenu: false,
        isPrivate: false

    }


]


