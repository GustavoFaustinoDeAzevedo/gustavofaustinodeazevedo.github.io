import React, { useRef } from "react";

const createRefs = (keys) =>
  keys.reduce((acc, key) => {
    acc[key] = useRef(null);
    return acc;
  }, {});

export default createRefs;