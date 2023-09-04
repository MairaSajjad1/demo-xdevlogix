import { FC } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { BiLoaderAlt as Loader, BiUpload as Upload } from "react-icons/bi"; // Update the icon as per your design

interface ImportProductModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  handleImport: () => void;
}

const ImportProductModal: FC<ImportProductModalProps> = ({
  open,
  onClose,
  loading,
  handleImport,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Products</DialogTitle>
          <DialogDescription>
            Upload a file to import products.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-end gap-4">
          <Button disabled={loading} onClick={onClose} variant={"outline"}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={handleImport}

          >
            {loading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 w-4 h-4" />
            )}
            Import
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportProductModal;
