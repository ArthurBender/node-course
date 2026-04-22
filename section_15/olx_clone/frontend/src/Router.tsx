import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Profile from "./pages/users/Profile";

import MyItems from "./pages/items/MyItems";
import NewItem from "./pages/items/NewItem";
import EditItem from "./pages/items/EditItem";
import ItemDetails from "./pages/items/ItemDetails";

import MyTrades from "./pages/trades/MyTrades";

import MainLayout from "./layouts/MainLayout";

const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/my-items" element={<MyItems />} />
        <Route path="/items/new" element={<NewItem />} />
        <Route path="/items/edit/:id" element={<EditItem />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        
        <Route path="my-trades" element={<MyTrades />} />
      </Route>

      <Route element={<MainLayout fullscreen />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default Router;