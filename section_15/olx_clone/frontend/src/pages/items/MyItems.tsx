import { useEffect, useState } from "react";

import api from "../../utils/api";
import useFlashMessage from "../../hooks/useFlashMessage";
import { AxiosError } from "axios";

import { Link } from "react-router";
import PageTitle from "../../components/PageTitle";
import type { ApiResponse, ItemFromApi } from "../../utils/types";
import Button from "../../components/Button";
import { imagePath } from "../../utils/images";

const MyItems = () => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken") || "{}");
  const [items, setItems] = useState<ItemFromApi[]>([]);

  const { setFlashMessage } = useFlashMessage();

  const handleItemDelete = async (itemId: string) => {
    if (!accessToken) return;

    try {
      await api.delete(`/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      setItems(items.filter(item => item._id !== itemId));
      setFlashMessage("Item deleted successfully!", "success");
    } catch (error) {
      let message = "Unknown error, try again.";
      if (error instanceof AxiosError) {
        message = error.response?.data.message || message;
      }

      setFlashMessage(message, "error");
    }
  }

  const handleConcludeTrade = async (id: string) => {
    if (!accessToken) return;

    try {
      const response = await api.patch(`/trades/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const data: ApiResponse = response.data;

      setFlashMessage(data.message, "success");
    } catch (error) {
      let message = "Unknown error, try again.";
      if (error instanceof AxiosError) {
        message = error.response?.data.message || message;
      }

      setFlashMessage(message, "error");
    }
  }

  useEffect(() => {
    if (!accessToken) return;

    try {
      api.get("/items/my-items", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(({ data }) => {
        setItems(data.data);
      })
    } catch (error) {
      let message = "Unknown error, try again.";
      if (error instanceof AxiosError) {
        message = error.response?.data.message || message;
      }

      setFlashMessage(message, "error");
    }
  }, [])

  return (
    <div>
      <PageTitle
        customButton={<Link to="/items/new" className="button secondary font-bold!">+ New Item</Link>}
      >
        My Items
      </PageTitle>

      {items.length > 0 ? (
        <div className="items-list">
          {items.map((item) => (
            <div className="item-row" key={item._id}>
              <img src={imagePath(item.imagesPaths.length ? item.imagesPaths[0] : "", "items")} alt={item.title} />
  
              <div className="item-row-content">
                <Link to={`/item/${item._id}`} className="item-title">{item.title}</Link>
              </div>
  
              <div className="item-row-content">
                <p>{item.condition}</p>
                <p>${item.price}</p>
              </div>

              <div className="item-row-content">
                {item.available ? (
                  item.buyer ? (
                    <button className="button primary" onClick={() => handleConcludeTrade(item._id)}>Finish Trade</button>
                  ) : (
                    <p>Available</p>
                  )
                ) : (
                  <p>Sold</p>
                )}
              </div>
  
              <div className="item-row-actions">
                <Link to={`/items/edit/${item._id}`} className="button secondary">Edit</Link>
                <Button onClick={() => handleItemDelete(item._id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-20">You don't have any items yet.</p>
      )}
    </div>
  )
}

export default MyItems;