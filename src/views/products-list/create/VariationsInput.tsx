import FileInput from "@/components/ui/file-input";
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
import { useGetVariationsQuery } from "@/store/services/variationService";
import { Variation } from "@/views/variations";
import { useSession } from "next-auth/react";
import { FC, useMemo } from "react";
import { UseFieldArrayRemove } from "react-hook-form";
import VariationTemplate from "./VariationTemplate";

interface VariationsInputProps {
  index: number;
  remove: UseFieldArrayRemove;
  form: any;
}

const VariationsInput: FC<VariationsInputProps> = ({ index, form }) => {
  const { data: session } = useSession();
  const {
    data: variationsList,
    isLoading: variationsLoading,
    isFetching: variationsFetching,
  } = useGetVariationsQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });

  const variations = useMemo(() => {
    return variationsList?.find(
      (list) => String(list.id) === form.watch("variation_id")
    );
  }, [variationsList, form.watch("variation_id")]);

  const loadingData = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="col-span-3 grid grid-cols-3 gap-4">
      <FormField
        control={form.control}
        name="variation_id"
        render={({ field }) => (
          <FormItem className="col-span-3">
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
                    <SelectItem key={variation.id} value={String(variation.id)}>
                      {variation.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {form.watch("variation_id") && (
        <>
          {variations?.variation_template?.map((variationTemplate) => (
            <VariationTemplate
              variationTemplate={variationTemplate}
              key={variationTemplate.id}
              form={form}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default VariationsInput;
