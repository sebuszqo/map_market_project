import "./add.form.css";
import { Btn } from "./common/Btn";
import { useState } from "react";

export const AddForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    address: "",
    url: "",
  });

  const updateForm = (key: string, value: any) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };

  return (
    <form className={"add-form"} action="">
      <h1>Add your new announce</h1>
      <p>
        <label>Name:</label> <br />
        <input
          placeholder={"Name of your product"}
          type="text"
          name={"name"}
          required
          maxLength={99}
          value={form.name}
          onChange={(e) => updateForm("name", e.target.value)}
        />
      </p>
      <p>
        <label>Description:</label> <br />
        <textarea
          placeholder={"Description of your product"}
          name={"description"}
          required
          maxLength={999999}
          value={form.description}
          onChange={(e) => updateForm("description", e.target.value)}
        />
      </p>
      <p>
        <label>Price:</label> <br />
        <input
          type="number"
          name={"price"}
          value={form.price}
          onChange={(e) => updateForm("price", Number(e.target.value))}
        />
        <small>Do not type anything if you don't want to show price</small>
      </p>
      <p>
        <label>Address:</label> <br />
        <input
          placeholder={"Address (country, city, street)"}
          type="text"
          name={"address"}
          value={form.address}
          onChange={(e) => updateForm("address", e.target.value)}
        />
      </p>
      <p>
        <label>Url Address:</label> <br />
        <input
          placeholder={"Link to your auction with product"}
          type="url"
          name={"url"}
          maxLength={99}
          value={form.url}
          onChange={(e) => updateForm("url", e.target.value)}
        />
      </p>
      <Btn text={"Save"}></Btn>
    </form>
  );
};
