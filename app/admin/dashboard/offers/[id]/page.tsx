import AdminOfferDetailClient from "./client"

export default function AdminOfferDetailPage(props: any) {
  const params = (props?.params ?? {}) as { id: string }
  return <AdminOfferDetailClient id={params.id} />
}

export function generateStaticParams() {
  return [
    { id: 'O-1' },
    { id: 'O-2' },
    { id: 'O-3' },
  ]
}

