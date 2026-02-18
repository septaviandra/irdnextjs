import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"

export default async function PublicationDetail(props: any) {
  const params = await props.params
  const slug = params.slug

  const { data, error } = await supabase
    .from("publications")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (!data || error) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <section className="bg-[#0F172A] text-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="uppercase text-sm text-gray-400 mb-4">
            {data.region} • {data.type}
          </p>

          <h1 className="text-4xl font-bold mb-6">
            {data.title}
          </h1>

          <p className="text-gray-300 max-w-3xl">
            {data.description}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <a
          href={data.file_url}
          target="_blank"
          className="inline-block bg-[#0F172A] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
        >
          Download Full Report
        </a>
      </section>

    </main>
  )
}
