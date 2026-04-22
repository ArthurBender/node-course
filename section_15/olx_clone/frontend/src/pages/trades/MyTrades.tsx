import { useEffect, useState } from "react";

import api from "../../utils/api";
import useFlashMessage from "../../hooks/useFlashMessage";
import { AxiosError } from "axios";

import { Link } from "react-router";
import PageTitle from "../../components/PageTitle";
import type { ItemFromApi } from "../../utils/types";
import { imagePath } from "../../utils/images";

const MyTrades = () => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken") || "{}");
  const [items, setItems] = useState<ItemFromApi[]>([]);

  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    if (!accessToken) return;

    try {
      api.get("/trades/my-trades", {
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
      <PageTitle backButton={false}>
        My Trades
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
                <p><b>Owner: </b>{item.owner?.name}</p>
                <p><b>Contact: </b>{item.owner?.phone}</p>
              </div>
  
              <div className="item-row-actions pr-10">
                <p className="text-secondary font-semibold">{item.available ? "Trade in progress." : "Trade concluded."}</p>
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

export default MyTrades;