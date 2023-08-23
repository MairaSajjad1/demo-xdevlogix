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
import { Product } from "./index";
import { useSession } from "next-auth/react";
import { useCreateRiderMutation } from "@/store/services/riderService";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUnitsQuery } from "@/store/services/unitService";
import { Unit } from "../units";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTaxratesQuery } from "@/store/services/taxrateService";
import { Taxrate } from "../taxrates";
import { useGetLocationsQuery } from "@/store/services/locationService";
import { Location } from "../locations";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  sku: z.string().min(1, { message: "SKU is required." }),
  type: z.string().min(1, { message: "Type is required." }),
  unit_id: z.coerce.number().positive(),
  tax_id: z.coerce.number().positive(),
  business_id: z.coerce.number(),
});

interface ProductFormProps {
  setOpen: () => void;
  data?: Product | null;
}

const ProductForm: FC<ProductFormProps> = ({ setOpen, data }) => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      sku: data?.sku || "",
      description: data?.description || "",
      unit_id: data?.unit_id || 0,
      tax_id: data?.tax_id || 0,
      business_id: data?.business_id || Number(session?.user?.business_id),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // data
    //   ? toast.error("Update API is not implemented yet.")
    //   : create({ data: values });
  }

  const {
    data: unitsList,
    isLoading: unitsLoading,
    isFetching: unitsFetching,
  } = useGetUnitsQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });

  const {
    data: taxratesList,
    isLoading: taxratesLoading,
    isFetching: taxratesFetching,
  } = useGetTaxratesQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });

  const {
    data: locationsList,
    isLoading: locationsLoading,
    isFetching: locationsFetching,
  } = useGetLocationsQuery({
    buisnessId: session?.user?.business_id,
  });

  const loadingData = Array.from({ length: 10 }, (_, index) => index + 1);

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
      toast.success("Product Added Successfully.");
      setOpen();
    }
  }, [createError, createSuccess]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-4 grid grid-cols-2"
      >
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="P324" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Pizza" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="This is the description for the pizza item."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selling Price</FormLabel>
              <FormControl>
                <Input placeholder="400" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selling Price Inc. Tax</FormLabel>
              <FormControl>
                <Input placeholder="468" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Units</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="kg" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  {unitsLoading || unitsFetching
                    ? loadingData?.map((index: any) => (
                        <SelectItem key={index} value={String(index)}>
                          <Skeleton className="w-full h-4 bg-[#F5F5F5]" />
                        </SelectItem>
                      ))
                    : unitsList?.map((unit: Unit) => (
                        <SelectItem key={unit.id} value={String(unit.id)}>
                          {unit.actual_name}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tax_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="GST" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  {taxratesLoading || taxratesFetching
                    ? loadingData?.map((index: any) => (
                        <SelectItem key={index} value={String(index)}>
                          <Skeleton className="w-full h-4 bg-[#F5F5F5]" />
                        </SelectItem>
                      ))
                    : taxratesList?.map((tax: Taxrate) => (
                        <SelectItem key={tax.id} value={String(tax.id)}>
                          {tax?.name}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Location</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="GST" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  {locationsLoading || locationsFetching
                    ? loadingData?.map((index: any) => (
                        <SelectItem key={index} value={String(index)}>
                          <Skeleton className="w-full h-4 bg-[#F5F5F5]" />
                        </SelectItem>
                      ))
                    : locationsList?.map((location: Location) => (
                        <SelectItem
                          key={location.id}
                          value={String(location.id)}
                        >
                          {location?.name}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Time</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="GST" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  {taxratesLoading || taxratesFetching
                    ? loadingData?.map((index: any) => (
                        <SelectItem key={index} value={String(index)}>
                          <Skeleton className="w-full h-4 bg-[#F5F5F5]" />
                        </SelectItem>
                      ))
                    : taxratesList?.map((tax: Taxrate) => (
                        <SelectItem key={tax.id} value={String(tax.id)}>
                          {tax?.name}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={createLoading} className="col-span-2" type="submit">
          {createLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {data ? "Update" : "Add"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
