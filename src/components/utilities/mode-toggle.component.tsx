import { useColorScheme, Button } from "@mui/joy";
import { FunctionComponent, useState, useEffect } from "react";

export const ModeToggle: FunctionComponent = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  } else {
    return (
      <Button
        size="sm"
        variant="plain"
        onClick={() => {
          setMode(mode === "dark" ? "light" : "dark");
        }}
      >
        {mode === "dark" ? <span>☀️</span> : <span>🌘</span>}
      </Button>
    );
  }
};
