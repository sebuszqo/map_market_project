import "./add.form.css";
import { Btn } from "./common/Btn";
import { SyntheticEvent, useState } from "react";

export const AddForm = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    address: "",
    url: "",
  });

  const saveForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          form.address
        )}`
      );
      const geoData = await geoRes.json();

      const latitude = parseFloat(geoData[0].lat);
      const longitude = parseFloat(geoData[0].lon);

      const announcementResponse = await fetch(
        `http://localhost:3001/announcement/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            latitude,
            longitude,
          }),
        }
      );
      const data = await announcementResponse.json();
      setId(data.id);
    } catch (e) {
      new Error("Sorry, we had problem during adding your announcement");
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (key: string, value: any) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };

  if (loading) {
    return <h2>We are adding your announcement</h2>;
  }

  if (id) {
    return <h2>You announcement were added successfully with ID: {id}</h2>;
  }

  return (
    <form className={"add-form"} action="" onSubmit={saveForm}>
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
