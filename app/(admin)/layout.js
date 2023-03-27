import Nav from "./adminDashboard/nav";
export default function Layout({
  children, // will be a page or nested layout
}) {
  return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <Nav />
        {children}
      </section>
  );
}
