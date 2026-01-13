import { Header, Sidebar } from "../..";
import "./Layout.css";
import { memo } from "react";
import type { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <Header />
      <div className="body">
        <Sidebar />

        <main className="content">{children}</main>
      </div>
    </div>
  );
}

export default memo(Layout);
