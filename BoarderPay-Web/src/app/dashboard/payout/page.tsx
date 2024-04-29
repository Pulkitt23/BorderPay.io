"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Payout = () => {
  const emails = ["shivambhadani@gmail.com", "pulkitt20@iitk.ac.in"];
  return (
    <div className="w-full flex items-center justify-center">
      <div className="mt-10 h-80 w-80 flex flex-col items-center justify-center text-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md">
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Emails" />
          </SelectTrigger>
          <SelectContent>
            {emails.map((email) => <SelectItem value={email}>{email}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="mt-8">
          <p>Last Payed Date: 30 March 2024</p>
          <p className="mt-2">Current Payout Amount: <b>300 Rs</b></p>
        </div>
        <div>
          <Button className="mt-8 w-40" variant="destructive">Pay</Button>
        </div>
      </div>
    </div>
  )
}

export default Payout