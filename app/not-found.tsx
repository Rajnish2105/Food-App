import Link from "next/link";

export default function NotFound(): JSX.Element {
  return (
    <main className="not-found">
      <h1>Not Found</h1>
      <p>Unfortunatly, we couldn&apos;t find the requested page or resource.</p>
      <p>
        Try Visiting <Link href="/">Home</Link>
      </p>
    </main>
  );
}
