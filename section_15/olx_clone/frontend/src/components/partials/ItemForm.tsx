import { useEffect, useState } from "react";
import Input from "../Input";
import type { ItemFromApi } from "../../utils/types";
import { imagePath } from "../../utils/images";

interface ItemFormProps {
  submitText: string;
  onSubmit: (formData: FormData) => void;
  itemData?: ItemFromApi;
}

const ItemForm = ({ itemData, submitText, onSubmit }: ItemFormProps) => {
  const [item, setItem] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
    condition: "",
    images: new Array<string | File>()
  });

  const categories = ["Clothing", "Electronics", "Furniture", "Toys", "Books", "Sports", "Games", "Health", "Music", "Other"];
  const conditions = ["New", "Used", "Refurbished"];

  const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem({
      ...item,
      [event.target.name]: event.target.value
    })
  }

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem({
      ...item,
      [event.target.name]: event.target.files
    })
  }

  useEffect(() => {
    if (itemData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItem({
        title: itemData.title,
        description: itemData.description,
        price: itemData.price,
        category: itemData.category,
        condition: itemData.condition,
        images: itemData.imagesPaths
      });
    }
  }, [itemData])

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", item.title);
    formData.append("description", item.description);
    formData.append("price", item.price.toString());
    formData.append("category", item.category);
    formData.append("condition", item.condition);

    if (item.images) {
      for (let i = 0; i < item.images.length; i++) {
        formData.append("images", item.images[i]);
      }
    }

    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" name="title" label="Name" onChange={handleItemChange} value={item.title} required />
      <Input type="textarea" name="description" label="Description" onChange={handleItemChange} value={item.description} required />
      <Input type="number" name="price" label="Price" onChange={handleItemChange} value={item.price} required min={0} />
      <Input type="select" name="category" label="Category" onChange={handleItemChange} value={item.category} options={categories} required />
      <Input type="select" name="condition" label="Condition" onChange={handleItemChange} value={item.condition} options={conditions} required />

      <Input type="file" name="images" label="Images" onChange={handleFilesChange} multiple />
      {item.images?.length ? (
          <div className="flex justify-center gap-2">
            {Array.from(item.images as File[]).map((image: string | File, index: number) => (
              <img src={imagePath(image, "items") || ""} alt={`Image ${index}`} className="file-preview item-image" key={index} />
            ))}
          </div>
        ) : (
          <div className="file-preview item-image empty mx-auto!"></div>
        )
      }

      <button type="submit" className="button primary button-lg w-[80%] mx-auto mt-10">{submitText}</button>
    </form>
  )
}

export default ItemForm;