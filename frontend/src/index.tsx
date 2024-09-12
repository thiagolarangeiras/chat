import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from "react-router-dom";
import './index.css'

import { getTeste } from './requests';

import Login from './screens/Login';
import Signin from './screens/Signin';

import Forum from './screens/Forum';
import ForumList from './screens/ForumList';

import Topico from './screens/Topico';
import TopicoList from './screens/TopicoList';

import Comentario from './screens/Comentario';
import ComentarioList from './screens/ComentarioList';



import TestScreen from './screens/TestScreen';
import Modal from './modal';

type PropsAuth = {
    children: React.ReactNode;
}

function Auth({ children }: PropsAuth) {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(true);
    
    useEffect(() => {
        getTeste().then((value) => {
            setAuth(value);
        }) 
    }, []);

    useEffect(() => {
        if(!auth) navigate("/login");
    }, [auth]);

    return children;
}

function Redirec() {
    return <Navigate to="/forum"/>;
}

const router = createBrowserRouter([
    {
        path: "/*",
        element: <Redirec />
    },
    {
        path: "/login",
        element: <Login />   
    },
    {
        path: "/signin",
        element: <Signin />   
    },
    {
        path: "/forum",
        element: <Auth> <ForumList /> </Auth>   
    },
    {
        path: "/forum/:id",
        element: <Auth> <Forum /> </Auth>   
    },
    {
        path: "/topico",
        element: <Auth> <TopicoList /> </Auth>   
    },
    {
        path: "/topico/:id",
        element: <Auth> <Topico /> </Auth>   
    },
    {
        path: "/comentario",
        element: <Auth> <ComentarioList /> </Auth>   
    },
    {
        path: "/comentario/:id",
        element: <Auth> <Comentario /> </Auth>   
    },
    {
        path: "/test",
        element: <Auth> <TestScreen /> </Auth>   
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)