"use client";
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
import { BiLoaderAlt as Loader } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsCalendarEvent as CalendarIcon } from "react-icons/bs";
import { useGetSuppliersQuery } from "@/store/services/supplierService";
import { Skeleton } from "@/components/ui/skeleton";
import { Supplier } from "@/views/suppliers";
import { Location } from "@/views/locations";
import { useGetLocationsQuery } from "@/store/services/locationService";
import { useGetTaxratesQuery } from "@/store/services/taxrateService";
import { Taxrate } from "@/views/taxrates";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useGetProductsQuery } from "@/store/services/productService";
import { Product, ProductVariation } from "@/views/products-list";
import { useEffect, useState } from "react";

const formSchema = z.object({
  supplier_id: z.string().min(1, { message: "Supplier is required." }),
  location_id: z.string().min(1, { message: "Location is required." }),
  tax_rate_id: z.string().min(1, { message: "Tax rate is required." }),
  tax_amount: z.string().min(1, { message: "Tax amount is required." }),
  discount_type: z.string().min(1, { message: "Discount type is required." }),
  discount_amount: z
    .string()
    .min(1, { message: "Discount amount is required." }),
  type: z.string().min(1, { message: "Type is required." }),
  purchase_status: z
    .string()
    .min(1, { message: "Purchase Status is required." }),
  payment_status: z
    .string()
    .min(1, { message: "Purchase Status is required." }),
  source: z.string().min(1, { message: "Source is required." }),
  payments: z.object({
    method: z.string().min(1, { message: "Method is required." }),
  }),
  purchase_date: z.date({
    required_error: "Purchase date is required.",
  }),
  product_id: z.string().min(1, { message: "Product is required." }),
  product_variation_id: z.string().min(1, { message: "Product is required." }),
  business_id: z.coerce.number(),
  created_by: z.coerce.number(),
});

const Create = () => {
  const { data: session } = useSession();

  const {
    data: suppliersList,
    isLoading: suppliersLoading,
    isFetching: suppliersFetching,
  } = useGetSuppliersQuery({
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

  // GET
  const {
    data: taxratesList,
    isLoading: taxratesLoading,
    isFetching: taxratesFetching,
  } = useGetTaxratesQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });

  const {
    data: productsList,
    isLoading: productsLoading,
    isFetching: productsFetching,
  } = useGetProductsQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });

  const [productVariationList, setProductVariationList] = useState<
    { id: number; tem_name: string }[]
  >([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplier_id: "",
      location_id: "",
      tax_rate_id: "",
      tax_amount: "",
      discount_type: "",
      discount_amount: "",
      type: "",
      purchase_status: "",
      payment_status: "",
      source: "",
      payments: {
        method: "",
      },
      product_id: "",
      business_id: Number(session?.user?.business_id),
      created_by: Number(session?.user?.customer_id),
    },
  });

  useEffect(() => {
    if (form.watch("product_id")) {
      // @ts-ignore
      const { product_variations }: { product_variations: ProductVariation[] } =
        productsList?.find(
          (product) => product.id === Number(form.watch("product_id"))
        );
      const varitationTemplates = product_variations.map(
        ({ variation_template: { id, tem_name } }) => ({
          id,
          tem_name,
        })
      );

      setProductVariationList(varitationTemplates);
    }
  }, [form.watch("product_id")]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const loadingData = Array.from({ length: 10 }, (_, index) => index + 1);
  return (
    <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
      <h1 className="text-[#4741E1] font-semibold">Add New Purchase</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-4 grid grid-cols-3 justify-center items-center"
        >
          <FormField
            control={form.control}
            name="product_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Products</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pizza" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    {productsLoading && (
                      <>
                        {loadingData?.map((i) => (
                          <SelectItem key={i} value={String(i)}>
                            <Skeleton className="w-20 h-4 bg-[#F5F5F5]" />
                          </SelectItem>
                        ))}
                      </>
                    )}
                    {productsList &&
                      productsList?.map((product: Product) => (
                        <SelectItem key={product.id} value={String(product.id)}>
                          {product.name}
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
            name="product_variation_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Variations</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Large" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    {productVariationList.length === 0 && (
                      <SelectItem value="" disabled={true}>
                        Please Select Product First
                      </SelectItem>
                    )}
                    {productVariationList &&
                      productVariationList?.map((productVariation) => (
                        <SelectItem
                          key={productVariation.id}
                          value={String(productVariation.id)}
                        >
                          {productVariation.tem_name}
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
            name="payment_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="2" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="supplier_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supplier</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Ali" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    {suppliersLoading && (
                      <>
                        {loadingData?.map((i) => (
                          <SelectItem key={i} value={String(i)}>
                            <Skeleton className="w-20 h-4 bg-[#F5F5F5]" />
                          </SelectItem>
                        ))}
                      </>
                    )}
                    {suppliersList &&
                      suppliersList?.map((supplier: Supplier) => (
                        <SelectItem
                          key={supplier.id}
                          value={String(supplier.id)}
                        >
                          {supplier.name}
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
            name="location_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Lahore" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    {locationsLoading && (
                      <>
                        {loadingData?.map((i) => (
                          <SelectItem key={i} value={String(i)}>
                            <Skeleton className="w-20 h-4 bg-[#F5F5F5]" />
                          </SelectItem>
                        ))}
                      </>
                    )}
                    {locationsList &&
                      locationsList?.map((location: Location) => (
                        <SelectItem
                          key={location.id}
                          value={String(location.id)}
                        >
                          {location.name}
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
            name="tax_rate_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax Rate</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="GST" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    {taxratesLoading && (
                      <>
                        {loadingData?.map((i) => (
                          <SelectItem key={i} value={String(i)}>
                            <Skeleton className="w-20 h-4 bg-[#F5F5F5]" />
                          </SelectItem>
                        ))}
                      </>
                    )}
                    {taxratesList &&
                      taxratesList?.map((taxrate: Taxrate) => (
                        <SelectItem key={taxrate.id} value={String(taxrate.id)}>
                          {taxrate.name}
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
            name="tax_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax Amount</FormLabel>
                <FormControl>
                  <Input placeholder="68" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Fixed" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    <SelectItem value={"fixed"}>Fixed</SelectItem>
                    <SelectItem value={"percentage"}>Percentage</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discount_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {!form.watch("discount_type")
                    ? "Discount Amount"
                    : form.watch("discount_type") === "fixed"
                    ? "Discount Amount"
                    : form.watch("discount_type") === "percentage" &&
                      "Discount Percentage"}
                </FormLabel>
                <FormControl>
                  <Input placeholder="30" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Open Stock" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    <SelectItem value={"opening_stock"}>Open Stock</SelectItem>
                    <SelectItem value={"closing_stock"}>
                      Closed Stock
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purchase_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purchase Status</FormLabel>
                <FormControl>
                  <Input placeholder="Done" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="payment_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Status</FormLabel>
                <FormControl>
                  <Input placeholder="Pending" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Web" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    <SelectItem value={"mobile"}>Mobile</SelectItem>
                    <SelectItem value={"web"}>Web</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="payments.method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Cash" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    <SelectItem value={"cash"}>Cash</SelectItem>
                    <SelectItem value={"online"}>Online</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purchase_date"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-between h-full">
                <FormLabel>Purchase Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          " text-left font-normal",
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
                      disabled={(date) =>
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
          <div className="col-span-3 flex items-center justify-center">
            <Button type="submit" className="w-full">
              {false && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Create;
