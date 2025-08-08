import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useGetAllOrders, useUpdateOrder } from '@/apiServices/orderServices'
import { Edit, Loader2 } from 'lucide-react'

type updateOrderProps = {
    id: string;
    initialStatus: string;
}
const UpdateOrder = ({ id, initialStatus }: updateOrderProps) => {
  const { updateUserOrder, isPending } = useUpdateOrder();
  const { refetch } = useGetAllOrders();
    const [status, setStatus] = useState(initialStatus);
    const [open, setOpen] = useState(false);
     
      const handleUpdateOrder = async () => {
        try {
          await updateUserOrder({ id, status: status });
          await refetch
          setOpen(false);
        } catch (error) {
          console.error('Failed to delete product:', error);

        }
      }
  
  const handleStatusChange = (value: string) => {
    setStatus(value);
  }
  
  console.log(status)
  
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className='flex items-center text-green-600 mt-1'>
                                                                              <Edit className="mr-2 h-4 w-4" />
                  Update Order</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status of this order. This action will update the order in the system.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Order Status</SelectLabel>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Paid</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  {/* <SelectItem value="cancelled">Cancelled</SelectItem> */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleUpdateOrder}
                          disabled={isPending} type="submit">
                                        {isPending ? (
                                          <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Updating...
                                          </>
                                        ) : (
                                          'Update Order'
                          )}
                          </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateOrder
