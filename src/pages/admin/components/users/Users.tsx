import { useState } from "react"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Product } from '@/types'
import { useGetProducts } from '@/apiServices/ProductApi'

const Users = () => {
  return (
    <div>
        <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Join Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Sarah Johnson</TableCell>
                    <TableCell>sarah.johnson@email.com</TableCell>
                    <TableCell>23</TableCell>
                    <TableCell>$4,567</TableCell>
                    <TableCell>Jan 15, 2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mike Chen</TableCell>
                    <TableCell>mike.chen@email.com</TableCell>
                    <TableCell>18</TableCell>
                    <TableCell>$3,245</TableCell>
                    <TableCell>Feb 3, 2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Emma Davis</TableCell>
                    <TableCell>emma.davis@email.com</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>$2,890</TableCell>
                    <TableCell>Mar 8, 2023</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
    </div>
  )
}

export default Users
