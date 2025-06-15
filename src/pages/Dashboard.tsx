import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Footer from "@/components/Footer";

export default function Dashboard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Perform some side effect here, e.g. fetching data
    console.log("Dashboard mounted");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-center">Dashboard</h1>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-x-2 text-center">
            <Button variant="outline" onClick={() => setCount(count - 1)}>
              Decrement
            </Button>
            <span className="text-lg font-semibold">{count}</span>
            <Button variant="outline" onClick={() => setCount(count + 1)}>
              Increment
            </Button>
          </div>

          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV0001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV0002</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>PayPal</TableCell>
                <TableCell className="text-right">$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV0003</TableCell>
                <TableCell>Unpaid</TableCell>
                <TableCell>Bank Transfer</TableCell>
                <TableCell className="text-right">$300.00</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$700.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
