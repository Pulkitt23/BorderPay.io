"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  employeeEmail: z.string().email(),
  salaryPerDay: z.number(),
  jobTitle: z.string(),
  startingDate: z.date({
    required_error: "Starting Date is required",
  }),
})

const CreateContract = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  };

  return (
    <div className="flex flex-col items-center justify-between p-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4 p-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md"
        >
          <FormField
            control={form.control}
            name="employeeEmail"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Employee Email</FormLabel>
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
            name="salaryPerDay"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Salary Per Day</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Salary Per Day"
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

          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Job Title"
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
            name="startingDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Starting Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Create Contract
          </Button>

        </form>
      </Form>
    </div>
  )
}

export default CreateContract