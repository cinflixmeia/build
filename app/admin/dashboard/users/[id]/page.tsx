import AdminUserDetailClient from "./client"

export default function AdminUserDetailPage(props: any) {
  const params = (props?.params ?? {}) as { id: string }
  return <AdminUserDetailClient id={params.id} />
}

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ]
}

