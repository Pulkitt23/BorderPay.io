"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"

enum AccountType {
  EMPLOYER = "employer",
  EMPLOYEE = "employee",
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  confirmPassword: z.string(),
  currency: z.enum(["dollar", "rupees"]),
  accountType: z.nativeEnum(AccountType).default(AccountType.EMPLOYEE),
  companyName: z.string().optional(),
  name: z.string().min(3).optional(),
})
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Password and Confirm Password do not match",
      path: ["confirmPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === AccountType.EMPLOYER) {
        return !!data.companyName;
      }
      return true;
    },
    {
      message: "Company name is required",
      path: ["companyName"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === AccountType.EMPLOYEE) {
        return !!data.name;
      }
      return true;
    },
    {
      message: "Full Name is required",
      path: ["name"],
    }
  )

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const accountType = form.watch("accountType");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="flex flex-col items-center justify-between p-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md w-full flex flex-col gap-4 p-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md"
        >

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email address"
                      type="email"
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
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dollar">Dollar</SelectItem>
                      <SelectItem value="rupees">Rupees</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Account type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={AccountType.EMPLOYEE}>Employee</SelectItem>
                      <SelectItem value={AccountType.EMPLOYER}>Employer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {accountType === AccountType.EMPLOYER && (
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Company Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}

          {accountType === AccountType.EMPLOYEE && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Full Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}

          <Button type="submit" className="w-full">
            SignUp
          </Button>

        </form>
      </Form>
      
      <div className="mt-4 text-blue-800">
        <Link href='/login'>Already have account: Login</Link>
      </div>

    </div>
  )
}

export default SignUp