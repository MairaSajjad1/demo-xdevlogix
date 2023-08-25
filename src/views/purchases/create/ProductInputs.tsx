import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsQuery } from "@/store/services/productService";
import { Product, ProductVariation } from "@/views/products-list";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { UseFieldArrayRemove } from "react-hook-form";

interface ProductInputsProps {
  remove: UseFieldArrayRemove;
  index: number;
  form: any;
}

const ProductInputs: FC<ProductInputsProps> = ({ remove, index, form }) => {
  const { data: session } = useSession();
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

  const purchaseItem = form.watch(`purchase_lines`)[index];

  useEffect(() => {
    const purchaseLines = form.watch("purchase_lines");

    if (purchaseLines.length > 0) {
      const productToFind = productsList?.find(
        (product) => product.id === Number(purchaseItem.product_id)
      );

      if (productToFind) {
        const {
          product_variations,
        }: { product_variations: ProductVariation[] } = productToFind;
        const varitationTemplates = product_variations.map(
          ({ variation_template: { id, tem_name } }) => ({
            id,
            tem_name,
          })
        );
        setProductVariationList(varitationTemplates);
      }
    }
  }, [purchaseItem.product_id]);

  const handleRemove = (index: number) => {
    remove(index);
  };

  const loadingData = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="flex items-end gap-4 w-full">
      <div className="flex-1 grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name={`purchase_lines.${index}.product_id`}
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
                    productsList?.map((product: Product, index) => (
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
          name={`purchase_lines.${index}.product_variation_id`}
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
          name={`purchase_lines.${index}.quantity`}
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
      </div>
      {index > 0 && (
        <Button
          className="mt-2"
          variant={"destructive"}
          onClick={() => handleRemove(index)}
        >
          Remove
        </Button>
      )}
    </div>
  );
};

export default ProductInputs;
