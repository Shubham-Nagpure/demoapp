import InteractiveIcFlow from "./InteractiveIcFlow";

interface CanvasProps {
  onSideBySideChange?: (isSideBySide: boolean) => void;
}

export default function Canvas({ onSideBySideChange }: CanvasProps = {}) {
  return <InteractiveIcFlow onSideBySideChange={onSideBySideChange} />;
}