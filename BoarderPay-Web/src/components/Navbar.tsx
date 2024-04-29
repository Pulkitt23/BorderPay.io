import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="mb-2 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link className="flex items-center" href="#">
            <div>BorderPay</div>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link className="font-medium flex items-center text-sm transition-colors hover:underline" href="/dashboard">
              Dashboard
            </Link>
            <Link className="font-medium flex items-center text-sm transition-colors hover:underline" href="/dashboard/create-contract">
              Create Contract
            </Link>
            <Link className="font-medium flex items-center text-sm transition-colors hover:underline" href="/dashboard/payout">
              Payout
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button size="sm">Logout</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
