import Nav from "./adminDashboard/nav";
export default function Layout({
  children, // will be a page or nested layout
}) {
  return (
      <section>
        <Nav />
        {children}
      </section>
  );
}
