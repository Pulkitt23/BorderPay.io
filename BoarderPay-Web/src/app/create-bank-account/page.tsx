"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  bankName: z.string(),
  bankAccountNumber: z.number(),
})

const CreateBankAccount = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col items-center justify-between p-20">
      <h1 className="mb-4">Create Bank Account</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4 p-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md"
        >
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bank Name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="bankAccountNumber"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Bank Account Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="bankAccountNumber"
                      type="number"
                      {...field}
                      onChange={event => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </Form>
      
      <div className="mt-4 text-blue-800">
        <Link href='/contract'>Contract Page</Link>
      </div>

    </div>
  )
}

export default CreateBankAccount