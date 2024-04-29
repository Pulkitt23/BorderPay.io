import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Dashboard = () => {
  return (
    <div className="w-[1200px] max-w-[90%] m-auto mt-8">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Employee Email</TableHead>
            <TableHead>Last Payed Date</TableHead>
            <TableHead>Amount Payed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>pulkit.com</TableCell>
            <TableCell>10 March 2024</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default Dashboard