import React from "react";

import "./Btn.css";

interface Props {
  text: string | React.ReactNode;
}

export const Btn = (props: Props) => <button>{props.text}</button>;
