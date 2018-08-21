import React from 'react';
import { Route } from  'react-router-dom';

import Home from '../home/home';
import About from '../home/about';

import Login from '../user/login';
import Register from '../user/register';
import Logout from '../user/logout';

import Create from '../house/create';
import Details from '../house/datails';
import Edit from '../house/edit';
import Delete from '../house/delete';

import OrderCompleted from '../order/order-completed';
import ConfirmOrder from '../order/confirm-order';
import All from '../order/all';
import Profile from '../user/profile';
import MyOrders from '../order/my-orders';
import OrderDetails from '../order/order-details';



const Router = () => {

    return (<div>
        <Route path="/" exact component={Home}/>
        <Route path="/home" exact component={Home}/>
        <Route path="/about" exact component={About}/>

        <Route path="/user/login" exact component={Login}/>
        <Route path="/user/register" exact component={Register}/>
        <Route path="/user/logout" exact component={Logout}/>
        <Route path="/user/profile/:id" exact component={Profile}/>

        <Route path="/house/create" exact component={Create}/>
        <Route path="/house/details/:id" exact component={Details}/>
        <Route path="/house/edit/:id" exact component={Edit}/>
        <Route path="/house/delete/:id" exact component={Delete}/>
        <Route path="/house/confirm-order/:id" exact component={ConfirmOrder}/>

        <Route path="/order/completed/:id" exact component={OrderCompleted}/>
        <Route path="/order/all" exact component={All}/>
        <Route path="/order/my" exact component={MyOrders}/>
        <Route path="/order/details/:id" exact component={OrderDetails}/>
    </div>)
}


export default Router;
    