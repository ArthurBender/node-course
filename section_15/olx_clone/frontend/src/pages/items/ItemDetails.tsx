import { useEffect, useState } from "react";

import api from "../../utils/api";

import useFlashMessage from "../../hooks/useFlashMessage";
import { imagePath } from "../../utils/images";
import { useParams } from "react-router";
import { AxiosError } from "axios";
import type { ApiResponse, ItemFromApi } from "../../utils/types";
import PageTitle from "../../components/PageTitle";
import Panel from "../../components/Panel";
import Button from "../../components/Button";

import { IoCartOutline } from "react-icons/io5";

const ItemDetails = () => {
  const { id } = useParams();

  const [item, setItem] = useState<ItemFromApi>()

  const { setFlashMessage } = useFlashMessage();

  const accessToken = JSON.parse(localStorage.getItem("accessToken") || "{}");
  const handleBuy = async () => {
    if (!accessToken) {
      setFlashMessage("You must be logged in to buy an item.", "error");
      return;
    }

    try {
      const response = await api.patch(`/trades/schedule/${id}`, {
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
    if (!id) return;

    try {
      api.get(`/items/${id}`).then(response => {
        const data: ApiResponse = response.data;

        setItem(data.data as ItemFromApi);
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
    <>
      <PageTitle>Item Details</PageTitle>

      {item && (
        <div className="item-details-container">
          <div className="item-content">
            <div className="images-container">
              <div className="image-holder main-image">
                <img src={imagePath(item.imagesPaths[0], "items")} alt={item.title} />
              </div>

              {item.imagesPaths.length > 1 && <div className="secondary-images">
                {item.imagesPaths.slice(1).map((image, index) => (
                  <div className="image-holder" key={index}>
                    <img src={imagePath(image, "items")} alt={item.title} />
                  </div>
                ))}
              </div>}
            </div>

            <div className="item-info-container">
              <h2 className="item-title">{item.title}</h2>
              <p className="item-description">{item.description}</p>

              <hr />
              <p className="font-bold">Details</p>
              <div className="item-details">
                <p>Category: <b>{item.category}</b></p>
                <p>Condition: <b>{item.condition}</b></p>
              </div>
            </div>
          </div>
          
          <Panel className="panel-shadowed item-price-panel">
            <p className="item-price">${item.price}</p>
            <hr />

            <Button className="primary" onClick={handleBuy}><IoCartOutline /> Buy</Button>
          </Panel>
        </div>
      )}
    </>
  )
}

export default ItemDetails;