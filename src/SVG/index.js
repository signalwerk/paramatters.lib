import React, { Fragment, useEffect, useState } from "react";
import Handler from "./base";
import TextToSVG from "./base/text-ttf";
import { decode } from "./base/base64";

let Render = ({ data, dispatch, fonts }) => {
  const [fontRenderer, setFontRenderer] = useState(false);

  useEffect(() => {
    if (fonts) {
      let buffer = decode(fonts["WorkSans-Medium"]);
      setFontRenderer(TextToSVG.parse(buffer));
    }
  }, [fonts]);

  return <Fragment>{Handler({ data, dispatch }, fontRenderer)}</Fragment>;
};

export default Render;
