import { forwardRef } from "react";

interface NameElementProps {
  name: string;
  color: string;
}

const NameElement = forwardRef<HTMLDivElement, NameElementProps>(
  ({ name, color }, ref) => {
    return (
      <div className="name" ref={ref}>
        <h1 style={{ color }}>{name}</h1>
      </div>
    );
  }
);

export default NameElement;
