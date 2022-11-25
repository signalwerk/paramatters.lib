const sideEffects = [
  "push",
  "unshift",
  "splice",
  "pop",
  "splice",
  "reverse",
  "sort",
  "remove",
];

const ProxyArray = (parent) => {
  return {
    set(target, prop, val) {
      // console.log({target, prop, val})
      // to intercept property writing
      // if (typeof prop === "number") {
      console.log("this is a array modification [i]");
      target[prop] = val;
      return true;
      // }
      // return false;
    },
    get(target, prop) {
      const val = target[prop];
      if (typeof val === "function") {
        if (["push"].includes(prop)) {
          return (item) => {
            const itemId = item.id;

            item.register(() => parent.emit());

            // console.log("push itemId!", itemId);
            parent.store.points.reducer(
              "POINT_ADD",
              item.store.points.get(itemId)
            );

            parent.store.contours.reducer("CONTOUR_PUSH_POINT", {
              id: parent.id,
              pointId: itemId,
            });

            item.setStore(parent.store);

            parent.update();

            return Array.prototype[prop].apply(target, [item]);
          };
        }
        // if (["pop"].includes(prop)) {
        //   return function() {
        //     const el = Array.prototype[prop].apply(target, arguments);
        //     console.log("this is a array modification");
        //     return el;
        //   };
        // }

        if (sideEffects.includes(prop)) {
          console.log("this is a array modification [func]");
        }
        return val.bind(target);
      }
      return val;
    },
  };
};

export default ProxyArray;
