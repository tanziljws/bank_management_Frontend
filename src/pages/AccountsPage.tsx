import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AccountsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accounts</CardTitle>
        <CardDescription>Halaman ini siap dipakai untuk fitur list/create/deposit/withdraw/transfer.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-slate-600">
        <p>Next step:</p>
        <ul className="ml-5 list-disc space-y-1">
          <li>List account per customer</li>
          <li>Open account form</li>
          <li>Deposit & withdraw action</li>
          <li>Transfer form + transaction history</li>
        </ul>
      </CardContent>
    </Card>
  );
}

