import { useEffect, useState } from "react";
import { AnnounceEntity } from "types";

interface Props {
  id: string;
}

export const SingleAnnounce = (props: Props) => {
  const [announcement, setAnnouncement] = useState<AnnounceEntity | null>(null);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3001/announcement/${props.id}`
      );
      const data = await response.json();

      setAnnouncement(data);
    })();
  }, []);

  if (announcement === null) {
    return <p>Loading ...</p>;
  }
  return (
    <>
      <h3>{announcement.name}</h3>
      <p>{announcement.description}</p>
      {!!announcement.price && (
        <p>
          <b>{announcement.price} zł</b>
        </p>
      )}
      <a href={announcement.url} target={"_blank"}>
        Open announcement
      </a>
    </>
  );
};
