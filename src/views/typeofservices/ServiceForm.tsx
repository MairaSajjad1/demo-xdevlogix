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
import { Textarea } from "@/components/ui/textarea";
// import {
//   useCreateTypeOfServiceMutation,
//   useGetTypeOfServiceQuery,
// } from "@/store/services/typeOfServiceService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { TypeOfService } from "./index";
import { RootState } from "@/store";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  charge_type: z.string().min(1, { message: "Charge type is required." }),
  charge: z.coerce.number().positive(),
  business_id: z.coerce.number(),
});

interface ServiceFormProps {
  setOpen: () => void;
  data?: TypeOfService | null;
}

const ServiceForm: FC<ServiceFormProps> = ({ setOpen, data }) => {
  // const { businessId } = useSelector((state: RootState) => state.authReducer);
  //   const { refetch } = useGetTypeOfServiceQuery({ businessId, perPage: -1 });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      charge_type: data?.charge_type || "fixed",
      charge: Number(data?.charge) || 0,
      business_id: data?.business_id || Number(5!),
    },
  });

  // const [create, response] = useCreateTypeOfServiceMutation();

  // const {
  //   isLoading: addLoading,
  //   isError: addError,
  //   isSuccess: addSuccess,
  // } = response;

  function onSubmit(values: z.infer<typeof formSchema>) {
    // data ? toast.error("Update Api is not ready Yet") : create(values);
  }

  // useEffect(() => {
  //   if (addError) {
  //     toast.error("Something Wrong.");
  //   }
  //   if (addSuccess) {
  //     // refetch();
  //     toast.success("Service Added Successfully.");
  //     setOpen();
  //   }
  // }, [addError, addSuccess]);
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
                <Input placeholder="Dine In" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="This service type is for the Dine in."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="charge_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Charge Type</FormLabel>
              <FormControl>
                <Input placeholder="Fixed" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="charge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Charges</FormLabel>
              <FormControl>
                <Input placeholder="10" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={false} className="w-full" type="submit">
          {false && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {data ? "Update" : "Add"}
        </Button>
      </form>
    </Form>
  );
};

export default ServiceForm;