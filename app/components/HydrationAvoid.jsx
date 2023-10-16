"use client";
import React, { useEffect, useState } from "react";

const HydrationAvoid = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  // Hooks
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Render
  if (!hasMounted) return null;

  return <>{children}</>;
};

export default HydrationAvoid;
