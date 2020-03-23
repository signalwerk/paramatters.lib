import React, { Fragment, useEffect, useState } from "react";
import Handler from "./base";
import TextToSVG from "./base/text-ttf";
import { decode } from "./base/base64";

let Render = ({ data, fonts }) => {
  const [fontRenderer, setFontRenderer] = useState(false);

  useEffect(() => {
    let buffer = decode(fonts["WorkSans-Medium"]);
    setFontRenderer(TextToSVG.parse(buffer));
  }, [fonts]);

  return <Fragment>{Handler({ data }, fontRenderer)}</Fragment>;
};

export default Render;
