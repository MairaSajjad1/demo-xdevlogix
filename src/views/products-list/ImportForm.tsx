import { FC, useEffect , useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { BiLoaderAlt as Loader } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useImportDataMutation } from "@/store/services/productService";

const formSchema = z.object({
  file: z.any(),
});

interface ImportProductFormProps {
  setOpen: () => void;
  data : () =>void;
}

const ImportProductForm: FC<ImportProductFormProps> = ({ setOpen , data}) => {
  // const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  
  const [create, importResponse] = useImportDataMutation();

  const { isLoading, isError, isSuccess } = importResponse;

  const {
    isLoading: importDataLoading,
    isError: importDataError,
    isSuccess: importDataSuccess,
  } = importResponse;

  useEffect(() => {
    if (importDataError) {
      toast.error("Something Wrong.");
    }
    if (importDataSuccess) {
      toast.success("Product Import Successfully.");
      setOpen();
    }
  }, [importDataError, importDataSuccess]);
  const handleFormSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      const { file } = formData;
      const formDataToSend = new FormData();
      formDataToSend.append("file", file[0]);

      create({data:formDataToSend})
    } catch (error) {
      console.error("Error importing products:", error);
      toast.error("Import failed. Please try again.");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <input
          type="file"
          id="file"
          accept=".xls, .xlsx"
          {...form.register("file", { required: "File is required" })}
        />
        <Button disabled={isLoading} className="w-24" type="submit">
          {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : "Import"}
        </Button>
      </div>
      {/* {form.formState.errors.file && (
        <p>{form.formState.errors.file.message.toString()}</p>
      )} */}
    </form>
  );
};

export default ImportProductForm;
