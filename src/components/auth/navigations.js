import HomePage from "../../pages/HomePage";
import LibraryPage from "../../pages/LibraryPage";
import LoginPage from "../../pages/LoginPage";
import NewDataPage from "../../pages/NewDataPage";
import ProfilePage from "../../pages/ProfilePage";
import PublicationPage from "../../pages/PublicationPage";
import SignUpPage from "../../pages/SignUpPage";
import ExploreComponent from "../home/ExploreComponent";
import FollowedResearchers from "../home/FollowedResearchers";
import NotificationsComponent from "../home/NotificationsComponent";
import Basket from "../library/Basket";
import AllView from "../view/PublicationsView/AllView";
import MyAccountPage from "../../pages/MyAccountPage";
import LibraryBox from "../view/LibraryBox";
import SearchComponent from "../home/SearchComponent";



export const nav = [

    {
        path: "/",
        element: <HomePage />,
        isMenu:true,
        isPrivate:true,
        children: [
            {
                path: "/",
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
            }
        ]

    },
    {
        path: "/myAccount",
        element: <MyAccountPage />,
        isMenu:true,
        isPrivate:true,
        children:[]
    },

    {
        path: "/publications/:publicationId",
        element: <PublicationPage />,
        isMenu:true,
        isPrivate:true,
        children:[]
    },
    {
        path: "/publications/create",
        element: <NewDataPage />,
        isMenu:true,
        isPrivate:true,
        children:[]
    },
    {
        path: "/users/:username",
        element: <ProfilePage />,
        isMenu:true,
        isPrivate:true,
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
        isMenu:true,
        isPrivate:true,
        children: [
            {
                path:"",
                element:<LibraryBox/>
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
        isMenu:false,
        isPrivate:false
    },
    {
        path: "/signup",
        element: <SignUpPage />,
        isMenu:false,
        isPrivate:false
    },
                  

]

  
