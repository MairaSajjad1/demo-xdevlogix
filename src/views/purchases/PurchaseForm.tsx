import { FC, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiLoaderAlt as Loader } from "react-icons/bi";
import toast from "react-hot-toast";
import { Purchase } from "./index";
import { useSession } from "next-auth/react";
import { useCreateRiderMutation } from "@/store/services/riderService";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().min(1, { message: "Email is required." }),
  mobile_no: z
    .string({ required_error: "Mobile is required." })
    .length(12, { message: "Mobile must be 12 digit long." }),
  business_id: z.coerce.number(),
});

interface PurchaseFormProps {
  setOpen: () => void;
  data?: Purchase | null;
}

const PurchaseForm: FC<PurchaseFormProps> = ({ setOpen, data }) => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_id: data?.business_id || Number(session?.user?.business_id),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    data
      ? toast.error("Update API is not implemented yet.")
      : create({ data: values });
  }

  const [create, createResponse] = useCreateRiderMutation();

  const {
    isLoading: createLoading,
    isError: createError,
    isSuccess: createSuccess,
  } = createResponse;

  useEffect(() => {
    if (createError) {
      toast.error("Something Wrong.");
    }
    if (createSuccess) {
      toast.success("Purchase Added Successfully.");
      setOpen();
    }
  }, [createError, createSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Ali" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!data && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="saad@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="mobile_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile</FormLabel>
              <FormControl>
                <Input placeholder="923411415567" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={createLoading} className="w-full" type="submit">
          {createLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {data ? "Update" : "Add"}
        </Button>
      </form>
    </Form>
  );
};

export default PurchaseForm;
