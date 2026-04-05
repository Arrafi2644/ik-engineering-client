/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useDataManager } from '@/hooks/useDataManager';
import DataTable from '@/components/dashboard/DataTable';

interface ServiceForm {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

const ServicesPage = () => {
  const dataManager: any = useDataManager();
  const [services, setServices] = useState(dataManager.getAllData().services);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState<ServiceForm>({
    name: '',
    description: '',
    price: 0,
    category: 'engineering',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenDialog = (service?: typeof services[0]) => {
    if (service) {
      setFormData(service);
      setIsEditing(true);
    } else {
      setFormData({ name: '', description: '', price: 0, category: 'engineering' });
      setIsEditing(false);
    }
    setShowDialog(true);
  };

  const handleSave = () => {
    if (isEditing && formData.id) {
      const updated = services.map(s => s.id === formData.id ? formData : s);
      setServices(updated);
      dataManager.updateData('services', updated);
    } else {
      const newService = {
        ...formData,
        id: Date.now().toString(),
      };
      const updated = [...services, newService];
      setServices(updated);
      dataManager.updateData('services', updated);
    }
    setShowDialog(false);
  };

  const handleDelete = (id: string) => {
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    dataManager.updateData('services', updated);
  };

  const columns = [
    {
      header: 'Service Name',
      accessorKey: 'name',
      cell: (value: string) => <span className="font-semibold">{value}</span>,
    },
    {
      header: 'Category',
      accessorKey: 'category',
      cell: (value: string) => (
        <Badge variant="outline" className="capitalize">{value}</Badge>
      ),
    },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: (value: number) => <span className="font-medium">${value.toLocaleString()}</span>,
    },
    {
      header: 'Description',
      accessorKey: 'description',
      cell: (value: string) => <span className="text-sm text-muted-foreground">{value}</span>,
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (id: string, row: any) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleOpenDialog(row)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground mt-1">Manage your professional services</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          Add Service
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
          <CardDescription>Total: {services.length} services</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={services} />
        </CardContent>
      </Card>

      {/* Service Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Service' : 'Add New Service'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update service details' : 'Create a new service offering'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Service Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Structural Engineering"
              />
            </div>
            <div>
              <Label>Category *</Label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="engineering">Engineering</option>
                <option value="consulting">Consulting</option>
                <option value="design">Design</option>
                <option value="planning">Planning</option>
              </select>
            </div>
            <div>
              <Label>Price ($) *</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Service description"
                rows={3}
              />
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {isEditing ? 'Update' : 'Create'} Service
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesPage;
