import { useEffect, useState } from "react";

import api from "../utils/api";
import useFlashMessage from "../hooks/useFlashMessage";
import { AxiosError } from "axios";
import { Link } from "react-router";

import PageTitle from "../components/PageTitle";

import type { ApiResponse, ItemFromApi } from "../utils/types";
import Panel from "../components/Panel";
import { imagePath } from "../utils/images";

const Home = () => {
  const [items, setItems] = useState<ItemFromApi[]>([]);

  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    try {
      api.get("/items").then(response => {
        const data: ApiResponse = response.data;

        setItems(data.data as ItemFromApi[]);
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
      <PageTitle backButton={false}>Home</PageTitle>

      {items.length ?
        (
          <div className="items-grid">
            {items.map(item => (
              <Panel key={item._id} className="item-frame panel-shadowed">
                <>
                  <img src={imagePath(item.imagesPaths[0], "items")} alt={item.title} />
                  <p className="item-title">{item.title}</p>
                  <p>${item.price}</p>
                  {item.buyer ? 
                    (
                      <p className="item-unavailable">{item.available ? "Being traded" : "Traded"}</p>
                    ) : (
                      <Link to={`/item/${item._id}`} className="button primary">Details</Link>
                    )
                  }
                </>
              </Panel>
            ))}
          </div>
        ) : (
          <p className="text-center">No items available at the moment. Feel free to <Link to="/new-item" className="link">post one</Link>.</p>
        )
      }
    </>
  )
}

export default Home;