export const AttrRef = (attr, el) => {
  return {
    element: `${el.element}AttrRef`,
    data: { id: el.id, attr },
  };
};
export const Ref = (el) => {
  return {
    element: `${el.element}Ref`,
    data: { id: el.id },
  };
};
