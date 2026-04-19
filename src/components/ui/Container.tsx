import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
};

export default function Container({
  children,
  className = "",
  as: Tag = "div",
}: Props) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl px-4 md:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
