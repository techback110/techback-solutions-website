import { ChangePasswordForm, CreateUserForm } from "@/components/admin/forms";
import { Badge, Card, PageTitle, td, th } from "@/components/admin/shell";
import { DeleteButton } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { getAdminUsers } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { removeUser } from "../../actions";

export default async function UsersPage() {
  const session = await requireAdmin();
  const users = await getAdminUsers();
  const isSetupLogin = !users.some((u) => u.email === session.email);

  return (
    <>
      <PageTitle title="Users" description="Who can sign in to this admin panel." />

      {isSetupLogin && (
        <p className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
          You&apos;re signed in with the temporary setup login. Add your own account below — once any account exists,
          only accounts listed here can sign in.
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="overflow-x-auto lg:col-span-2">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="border-b border-line">
              <tr>
                <th className={th}>User</th>
                <th className={th}>Added</th>
                <th className={th} />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {users.length === 0 && (
                <tr>
                  <td className={`${td} text-mute`} colSpan={3}>
                    No accounts yet.
                  </td>
                </tr>
              )}
              {users.map((u) => (
                <tr key={u.id}>
                  <td className={td}>
                    <span className="block font-medium">
                      {u.name || u.email} {u.email === session.email && <Badge tone="accent">You</Badge>}
                    </span>
                    {u.name && <span className="block text-xs text-mute">{u.email}</span>}
                  </td>
                  <td className={`${td} text-mute`}>{formatDate(u.created_at)}</td>
                  <td className={td}>
                    <div className="flex justify-end">
                      {u.email !== session.email && users.length > 1 && (
                        <DeleteButton action={removeUser} id={u.id} label="Remove" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <div className="space-y-6">
          {!isSetupLogin && (
            <Card className="p-6">
              <h2 className="mb-5 font-medium">Change your password</h2>
              <ChangePasswordForm />
            </Card>
          )}
          <Card className="p-6">
            <h2 className="mb-5 font-medium">Add a user</h2>
            <CreateUserForm />
          </Card>
        </div>
      </div>
    </>
  );
}
