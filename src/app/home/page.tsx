import RequireAuth from "@/components/require-auth";

export default function HomePage() {
  return (
    <RequireAuth>
      <section className="grid gap-4">
        <h1 className="text-2xl font-semibold">Welcome 👋</h1>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border bg-white p-4">
            <h2 className="mb-2 font-medium">Quick Links</h2>
            <ul className="list-inside list-disc text-sm text-gray-700">
              <li>
                Go to{" "}
                <a className="underline" href="/setting">
                  Settings
                </a>{" "}
                to manage Menu Groups & Menus.
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <h2 className="mb-2 font-medium">Status</h2>
            <p className="text-sm text-gray-700">
              You’re logged in. This is a simple dashboard placeholder.
            </p>
          </div>
        </div>
      </section>
    </RequireAuth>
  );
}
