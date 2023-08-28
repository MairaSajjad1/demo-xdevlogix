"use client";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BiLoaderAlt as Loader } from "react-icons/bi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { useGetUnitsQuery } from "@/store/services/unitService";
import { useGetTaxratesQuery } from "@/store/services/taxrateService";
import { useGetLocationsQuery } from "@/store/services/locationService";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Unit } from "@/views/units";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Location } from "@/views/locations";
import FileInput from "@/components/ui/file-input";
import { Button } from "@/components/ui/button";
import { useCreateProductMutation } from "@/store/services/productService";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetCategoriesQuery } from "@/store/services/categoryService";
import { Category } from "@/views/categories";
import { useGetVariationsQuery } from "@/store/services/variationService";
import { Variation } from "@/views/variations";
import VariationsInput from "./VariationsInput";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  sku: z.string().min(1, { message: "SKU is required." }),
  type: z.string().min(1, { message: "Type is required." }),
  unit_id: z.string().min(1, { message: "Unit is required." }),
  product_images:
    typeof window === "undefined" ? z.any() : z.array(z.instanceof(File)),
  tax_type: z.string().min(1, { message: "Tax Type is required." }),
  location_id: z.string().min(1, { message: "Location is required." }),
  manage_stock_status: z.boolean(),
  selling_price: z.string().min(1, { message: "Selling Price is required." }),
  selling_price_inc_tax: z
    .string()
    .min(1, { message: "Selling Price Inc Tax is required." }),
  quantity: z.string().min(1, { message: "Quantity is required." }),

  variation_id: z
    .string()
    .min(1, { message: "Variation is required." })
    .optional(),
  variations_list: z.array(
    z.object({
      sku: z.string().min(1, { message: "SKU is required." }).optional(),
      value: z.string().min(1, { message: "Value is required." }),
      purchase_price: z.object({
        exc_tax: z.string().min(1, { message: "Exc tax is required." }),
        inc_tax: z.string().min(1, { message: "Inc tax is required." }),
      }),
      margin: z.string().min(1, { message: "Margin is required." }),
      selling_price: z.object({
        exc_tax: z.string().min(1, { message: "Exc tax is required." }),
      }),
      images:
        typeof window === "undefined" ? z.any() : z.array(z.instanceof(File)),
    })
  ),
  business_id: z.coerce.number(),
});

const CreateProduct = () => {
  const { data: session } = useSession();

  const router = useRouter();

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

  const {
    data: categoriesList,
    isLoading: categoriesLoading,
    isFetching: categoriesFetching,
  } = useGetCategoriesQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });

  const [create, createResponse] = useCreateProductMutation();

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
      toast.success("Location Added Successfully.");
      router.push("/products/products-list");
    }
  }, [createError, createSuccess]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formdata = new FormData();
    formdata.append("name", values.name);
    formdata.append("description", values.description);
    formdata.append("sku", values.sku);
    formdata.append("type", values.type);
    formdata.append("unit_id", values.unit_id);
    formdata.append("business_id", values.business_id?.toString());
    formdata.append(
      "manage_stock_status",
      values.manage_stock_status ? "1" : "0"
    );
    formdata.append(`product_price[tax_type]`, values.tax_type);
    formdata.append(
      `product_price[0][selling_price]`,
      String(values.selling_price)
    );
    formdata.append(
      `product_price[0][selling_price_inc_tax]`,
      String(values.selling_price_inc_tax)
    );
    formdata.append(`product_price[business_id]`, String(values.business_id));
    formdata.append(`product_locations[]`, values.location_id);
    formdata.append(`product_images[]`, values.product_images[0]);
    formdata.append(
      `opening_stock[${values.location_id}][quantity][0]`,
      values.quantity
    );
    create({ data: formdata });
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sku: "",
      type: "single",
      description: "",
      tax_type: "",
      location_id: "",
      unit_id: "",
      manage_stock_status: false,
      selling_price: "",
      selling_price_inc_tax: "",
      quantity: "",
      product_images: [],
      variations_list: [
        {
          sku: "",
          value: "",
          purchase_price: {
            exc_tax: "",
            inc_tax: "",
          },
          margin: "",
          selling_price: {
            exc_tax: "",
          },
          images: [],
        },
      ],
      business_id: Number(session?.user?.business_id),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variations_list",
  });

  const handleAppend = () => {
    append({
      sku: "",
      value: "",
      purchase_price: {
        exc_tax: "",
        inc_tax: "",
      },
      margin: "",
      selling_price: {
        exc_tax: "",
      },
      images: [],
    });
  };

  const handleFileSelect = (files: File[]) => {
    form.setValue("product_images", files);
  };

  const loadingData = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
      <h1 className="text-[#4741E1] font-semibold">Add New Product</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-4 grid grid-cols-3 justify-center items-center"
        >
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Single" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    <SelectItem value={"single"}>Single</SelectItem>
                    <SelectItem value={"variable"}>Variable</SelectItem>
                    <SelectItem value={"combo"}>Combo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="This is the description of the product."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tax_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax Type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Inclusive" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    <SelectItem value={"inclusive"}>Inclusive</SelectItem>
                    <SelectItem value={"Exclusive"}>Exclusive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="selling_price"
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
            name="selling_price_inc_tax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selling Price Inc Tax</FormLabel>
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
                <FormLabel>Unit</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="kg" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    {unitsLoading && (
                      <>
                        {loadingData?.map((i) => (
                          <SelectItem key={i} value={String(i)}>
                            <Skeleton className="w-20 h-4 bg-[#F5F5F5]" />
                          </SelectItem>
                        ))}
                      </>
                    )}
                    {unitsList &&
                      unitsList?.map((unit: Unit) => (
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
            name="location_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Food" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    {categoriesLoading && (
                      <>
                        {loadingData?.map((i) => (
                          <SelectItem key={i} value={String(i)}>
                            <Skeleton className="w-20 h-4 bg-[#F5F5F5]" />
                          </SelectItem>
                        ))}
                      </>
                    )}
                    {categoriesList &&
                      categoriesList?.map((category: Category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FileInput fileAllowed={1} onChange={handleFileSelect} />
          <FormField
            control={form.control}
            name="manage_stock_status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start gap-4 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="mt-0!">Manage Stock</FormLabel>
              </FormItem>
            )}
          />

          {form.watch("manage_stock_status") && (
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input placeholder="320" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* {form.watch("type") === "variable" && */}

          {/* ( */}
          {/* <> */}
          {fields?.map((field, index) => (
            <VariationsInput
              remove={remove}
              form={form}
              key={field.id}
              index={index}
            />
          ))}

          <div className="col-span-3 flex items-center justify-center">
            <Button type="button" onClick={handleAppend}>
              Add More Variations
            </Button>
          </div>
          {/* <FormField
              control={form.control}
              name="variation_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variation</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60">
                      {variationsLoading && (
                        <>
                          {loadingData?.map((i) => (
                            <SelectItem key={i} value={String(i)}>
                              <Skeleton className="w-20 h-4 bg-[#F5F5F5]" />
                            </SelectItem>
                          ))}
                        </>
                      )}
                      {variationsList &&
                        variationsList?.map((variation: Variation) => (
                          <SelectItem
                            key={variation.id}
                            value={String(variation.id)}
                          >
                            {variation.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </> */}
          {/* )} */}
          <div className="col-span-3 flex items-center justify-center">
            <Button disabled={createLoading} type="submit" className="w-full">
              {createLoading && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateProduct;
