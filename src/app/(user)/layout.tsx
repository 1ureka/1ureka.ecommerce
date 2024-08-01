import { Nav, NavLink } from "@/components/Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Nav>
      <div className="conatainer m-6">{children}</div>
    </>
  );
}
