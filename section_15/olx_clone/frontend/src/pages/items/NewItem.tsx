import api from "../../utils/api";
import useFlashMessage from "../../hooks/useFlashMessage";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

import ItemForm from "../../components/partials/ItemForm";
import PageTitle from "../../components/PageTitle";
import Panel from "../../components/Panel";
import type { ApiResponse } from "../../utils/types";

const NewItem = () => {
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  const accessToken = JSON.parse(localStorage.getItem("accessToken") || "{}");

  const handleItemCreate = async (itemData: FormData) => {
    if (!accessToken) return;

    try {
      const response = await api.post("/items", itemData, {
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

  return (
    <>
      <PageTitle className="mx-auto">New Item</PageTitle>

      <Panel className="panel-shadowed px-20! max-w-[60%] mx-auto mt-10">
        <p className="text-center mb-10">Add a new item so other users can trade with you.</p>

        <ItemForm submitText="Create" onSubmit={handleItemCreate} />
      </Panel>
    </>
  )
}

export default NewItem;