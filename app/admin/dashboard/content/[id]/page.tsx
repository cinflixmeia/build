import AdminContentDetailClient from "./client"

export default function AdminContentDetailPage(props: any) {
  const params = (props?.params ?? {}) as { id: string }
  // Server component wrapper to support static export params
  return <AdminContentDetailClient id={params.id} />
}

export function generateStaticParams() {
  // Pre-render a small set of known IDs for static export
  return [
    { id: 'c1' },
    { id: 'c2' },
    { id: 'c3' },
  ]
}

