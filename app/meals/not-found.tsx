import Link from "next/link";

export default function NotFound(): JSX.Element {
  return (
    <main className="not-found">
      <h1>Meal Not Found</h1>
      <p>
        Unfortunatly, we couldn&apos;t find the Requested Meal. We are working
        on that recipe...
      </p>
      <p>
        Untill then Try other recipes on <Link href="/">Home</Link>
      </p>
    </main>
  );
}
