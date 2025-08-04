import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, Loader2 } from 'lucide-react'
import { useDeleteProducts } from '@/apiServices/ProductApi';

type DeleteProp = {
  id: string;
}

const DeleteProduct = ({ id }: DeleteProp) => {
  const { deleteProduct } = useDeleteProducts();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
 
  const handleDeleteProduct = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(id);
      // Only close dialog if deletion was successful
      setOpen(false);
    } catch (error) {
      console.error('Failed to delete product:', error);
      // You might want to show an error message to the user here
      // The dialog remains open so user can try again or cancel
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger className='flex items-center text-red-600 mt-1'>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your Product
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
            <button
              onClick={handleDeleteProduct}
              disabled={isDeleting}
              className="inline-flex h-10 items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Continue'
              )}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default DeleteProduct