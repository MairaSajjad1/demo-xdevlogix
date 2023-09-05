import { FC, useState ,  useEffect  } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImportDataMutation } from "@/store/services/importService";
import { BiLoaderAlt as Loader, BiUpload as Upload } from "react-icons/bi";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  file: z.any(),
});

interface ImportProductModalProps {
  open: boolean;
  setOpen: () => void;
  loading: boolean;
  data: any;
}

const ImportProductModal: FC<ImportProductModalProps> = ({ open, setOpen, loading }) => {
  const [showInputField, setShowInputField] = useState(true);

  const { handleSubmit, register, } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [create,importResponse] = useImportDataMutation();
  const handleFormSubmit = async (data) => {
    const formdata = new FormData();
    formdata.append("file", data.file);

    
    
create({data:formdata})
  };
  const {
    isLoading: createLoading,
    isError: createError,
    isSuccess: createSuccess,
  } = importResponse;

  useEffect(() => {
    if (createError) {
      toast.error("Something Wrong.");
    }
    if (createSuccess) {
      toast.success("Product Import Successfully.");
      setOpen();
    }
  }, [createError, createSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Products</DialogTitle>
          <DialogDescription>
            Upload a file to import products.
          </DialogDescription>
        </DialogHeader>

        {showInputField && (
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <input
                type="file"
                id="file"
                accept=".xls, .xlsx"
                {...register("file", { required: "File is required" })}
              />
              <Button
                disabled={loading}
                className="w-24"
                type="submit"
              >
                {loading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Import"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};


export default ImportProductModal;
