export default function Layout(props) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full mx-auto">
        <div className="flex flex-col min-h-screen">{props.children}</div>
      </main>
    </div>
  );
}
