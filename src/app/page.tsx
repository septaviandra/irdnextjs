import { supabase } from "@/lib/supabase"
import PublicationsList from "./PublicationsList"

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string; sort?: string }
}) {
  const page = Number(searchParams?.page || 1)
  const sort = searchParams?.sort || "desc"

  const limit = 6
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await supabase
    .from("publications")
    .select("*", { count: "exact" })
    .order("publish_date", { ascending: sort === "asc" })
    .range(from, to)

  return (
    <main className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">
            Econdatalab
          </h1>
          <nav className="space-x-8 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900 transition">Publications</a>
            <a href="#" className="hover:text-gray-900 transition">Regions</a>
            <a href="#" className="hover:text-gray-900 transition">Insights</a>
            <a href="#" className="hover:text-gray-900 transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <p className="uppercase tracking-widest text-sm text-gray-400 mb-4">
            Research & Strategic Intelligence
          </p>

          <h2 className="text-5xl font-bold leading-tight max-w-4xl">
            Independent Economic Forecasts & Financial Analysis
          </h2>

          <p className="mt-6 text-lg text-gray-300 max-w-2xl">
            Delivering structured macroeconomic insights, company valuations,
            and regional data intelligence for institutional investors,
            analysts, and policy decision-makers.
          </p>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex justify-between items-center mb-12">
          <h3 className="text-2xl font-semibold text-gray-900">
            Latest Publications
          </h3>

          <span className="text-sm text-gray-500">
            {count || 0} Reports
          </span>
        </div>

        {error && (
          <p className="text-red-500">Error loading data</p>
        )}

        <PublicationsList
          publications={data || []}
          total={count || 0}
          currentPage={page}
          sort={sort}
        />
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F172A] text-gray-400 mt-20">
        <div className="max-w-7xl mx-auto px-8 py-12 flex justify-between text-sm">
          <p>
            © {new Date().getFullYear()} Econdatalab Financial Insights.
            All rights reserved.
          </p>

          <div className="space-x-8">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
          </div>
        </div>
      </footer>

    </main>
  )
}
