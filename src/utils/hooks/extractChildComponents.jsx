import React from "react";

export const extractChildComponents = (children, markers = "__Childrens") => {
  const markerArray = Array.isArray(markers) ? markers : [markers];
  const matches = [];
  const rest = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      rest.push(child);
      return;
    }

    // Get the component type. If lazy-loaded, resolve it.
    let compType = child.type;
    if (compType.$$typeof === Symbol.for("react.lazy")) {
      compType = compType._init(compType._payload);
    }

    // Check if the component type has any of the marker properties
    const isMatch = markerArray.some((marker) => !!compType[marker]);
    if (isMatch) {
      matches.push(child);
    } else {
      rest.push(child);
    }
  });

  return { matches, rest };
};
