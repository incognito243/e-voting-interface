"use client";
import classNames from "classnames";
import { ReactNode, useMemo } from "react";

export function TypoTitle({ children, className, size = 0, onClick }: { children: ReactNode; className?: string; size?: number; onClick?: () => void }) {
  const sizeMap: {
    fontSize: string;
    lineHeight: string;
  } = useMemo(() => {
    switch (size) {
      case 0:
        return { fontSize: "20px", lineHeight: "24px" };
      case 1:
        return { fontSize: "18px", lineHeight: "24px" };
      case 2:
        return { fontSize: "16px", lineHeight: "20px" };
      case 3:
        return { fontSize: "14px", lineHeight: "16px" };
      case 4:
        return { fontSize: "12px", lineHeight: "16px" };
      default:
        return { fontSize: "20px", lineHeight: "24px" };
    }
  }, [size]);

  return (
    <>
      <span
        className={classNames(className, "font-medium")}
        style={{
          fontSize: sizeMap.fontSize,
          lineHeight: sizeMap.lineHeight,
        }}
        onClick={onClick}
      >
        {children}
      </span>
    </>
  );
}
