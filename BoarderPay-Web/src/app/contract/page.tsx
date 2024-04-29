import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

const Contract = () => {
  return (
    <div>
      <div className="m-10 flex gap-4">
        <Button>Logout</Button>
        <Link href='create-bank-account'><Button variant="secondary">Create Bank Account</Button></Link>
      </div>
      <div className="w-[750px] max-w-[90%] m-auto">
        <Card>
          <CardHeader>
            <CardTitle>Contract Details</CardTitle>
            <CardDescription>Please Accept the Contract</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Company Name: Uber</p>
            <p>Salary Per Day: $20</p>
            <p>Job Title: Software Engineer</p>
            <p>Starting Date: 10 Nov 2020</p>
          </CardContent>
          <CardFooter>
            <Button variant="destructive">Accept</Button>
          </CardFooter>
        </Card>
        <div className="my-5">
          Total Amount Received: <b>$500</b>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Bank Name: State Bank of India</p>
            <p>Bank Account Number: 398524582489498</p>
            <p>Bank Balance: $200</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Contract