import { useQuery } from '@tanstack/react-query';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getMe } from '@/lib/auth-api';
import { getSession } from '@/lib/auth-storage';

export function DashboardPage() {
  const session = getSession();

  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
          <CardDescription>Informasi user yang sedang login</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm text-slate-700">
          <div>
            <span className="font-medium text-slate-900">Email:</span> {session?.user.email}
          </div>
          <div>
            <span className="font-medium text-slate-900">Role:</span> {session?.user.role}
          </div>
          <div>
            <span className="font-medium text-slate-900">Token type:</span> {session?.tokenType}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Auth Check</CardTitle>
          <CardDescription>Call endpoint GET /auth/me dari frontend</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          {meQuery.isPending && <p className="text-slate-500">Loading user profile...</p>}
          {meQuery.isError && <p className="text-red-600">Gagal ambil profile. Cek backend URL / token.</p>}
          {meQuery.data && (
            <pre className="overflow-x-auto rounded-md bg-slate-900 p-4 text-xs text-slate-100">
              {JSON.stringify(meQuery.data, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

