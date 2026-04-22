import api from "../../utils/api";
import useFlashMessage from "../../hooks/useFlashMessage";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router";

import ItemForm from "../../components/partials/ItemForm";
import PageTitle from "../../components/PageTitle";
import Panel from "../../components/Panel";
import type { ApiResponse, ItemFromApi } from "../../utils/types";
import { useEffect, useState } from "react";

const EditItem = () => {
  const [item, setItem] = useState({})

  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  const { id } = useParams();

  const accessToken = JSON.parse(localStorage.getItem("accessToken") || "{}");

  const handleItemUpdate = async (itemData: FormData) => {
    if (!accessToken || !id) return;

    try {
      const response = await api.patch(`/items/${id}`, itemData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const data: ApiResponse = response.data;

      setFlashMessage(data.message, "success");
      navigate("/my-items");
    } catch (error) {
      let message = "Unknown error, try again.";
      if (error instanceof AxiosError) {
        message = error.response?.data.message || message;
      }

      setFlashMessage(message, "error");
    }
  }

  useEffect(() => {
    if (!accessToken || !id) return;

    try {
      api.get(`/items/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => {
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
      <PageTitle className="mx-auto">Edit Item</PageTitle>

      <Panel className="panel-shadowed px-20! max-w-[60%] mx-auto mt-10">
        <p className="text-center mb-10">Keep your item information up to date.</p>

        {item && <ItemForm submitText="Update" onSubmit={handleItemUpdate} itemData={item as ItemFromApi} />}
      </Panel>
    </>
  )
}

export default EditItem;