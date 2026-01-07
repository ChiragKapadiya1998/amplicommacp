import { Header, Sidebar } from "../..";
import "./Layout.css";

export default function Layout({ children }) {
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
