"use client"

import { useState } from "react"
import Link from "next/link"

interface Publication {
  id: string
  title: string
  description: string
  region: string
  type: string
  file_url: string
    slug: string
}

export default function PublicationsList({
  publications,
  total,
  currentPage,
  sort,
}: {
  publications: Publication[]
  total: number
  currentPage: number
  sort: string
})
 {
  const [search, setSearch] = useState("")
  const [region, setRegion] = useState("All")

  const uniqueRegions = [
    "All",
    ...Array.from(new Set(publications.map((p) => p.region))),
  ]

  const filtered = publications.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())

    const matchesRegion =
      region === "All" || item.region === region

    return matchesSearch && matchesRegion
  })

  return (
    <>
      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
        />

        {/* REGION FILTER */}
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
        >
          {uniqueRegions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

      </div>

      {/* RESULTS */}
      <div className="grid md:grid-cols-3 gap-10">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white p-8 border rounded-xl hover:shadow-xl transition duration-300"
          >
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
              {item.region} • {item.type}
            </p>

            <Link href={`/publications/${item.slug}`}>
            <h4 className="text-xl font-semibold text-gray-900 mb-3 hover:underline cursor-pointer">
                {item.title}
            </h4>
            </Link>


            <p className="text-gray-600 text-sm mb-6">
              {item.description}
            </p>

            <a
              href={item.file_url}
              target="_blank"
              className="text-sm font-semibold text-[#0F172A] hover:underline"
            >
              Download Publication →
            </a>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 mt-8">
          No publications match your criteria.
        </p>
      )}
    </>
  )
}
