'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit, Loader2, Plus, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

import { ArtToyForm } from '@/components/arttoy/arttoy-form';
import { Container } from '@/components/container';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  createArtToy,
  deleteArtToy,
  getArtToys,
  updateArtToy,
} from '@/libs/arttoy';
import type { Arttoy, ArtToyFormData } from '@/types/arttoy.types';
import { formatISOToShort } from '@/utils/date';

export default function AdminArttoyManagementPage() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingArtToy, setEditingArtToy] = useState<Arttoy | null>(null);
  const [deletingArtToy, setDeletingArtToy] = useState<Arttoy | null>(null);

  // Fetch art toys
  const {
    data: artToysData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['arttoys'],
    queryFn: getArtToys,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: ArtToyFormData) =>
      createArtToy(data, session?.user?.token || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['arttoys'] });
      setIsCreateDialogOpen(false);
      toast.success('Art toy created successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create art toy: ${error.message}`);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ArtToyFormData }) =>
      updateArtToy(id, data, session?.user?.token || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['arttoys'] });
      setEditingArtToy(null);
      toast.success('Art toy updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update art toy: ${error.message}`);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteArtToy(id, session?.user?.token || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['arttoys'] });
      setDeletingArtToy(null);
      toast.success('Art toy deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete art toy: ${error.message}`);
    },
  });

  const handleCreate = (data: ArtToyFormData) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (data: ArtToyFormData) => {
    if (editingArtToy) {
      updateMutation.mutate({ id: editingArtToy.id, data });
    }
  };

  const handleDelete = () => {
    if (deletingArtToy) {
      deleteMutation.mutate(deletingArtToy.id);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <div className='flex items-center justify-center py-12'>
          <Loader2 className='h-8 w-8 animate-spin' />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className='space-y-4 text-center py-12'>
          <div className='text-red-500 text-lg font-semibold'>
            Error loading art toys
          </div>
          <div className='text-sm text-muted-foreground'>{error.message}</div>
          <Button
            onClick={() => window.location.reload()}
            variant='outline'
            size='sm'
          >
            Try Again
          </Button>
        </div>
      </Container>
    );
  }

  const artToys = artToysData?.data || [];

  return (
    <Container>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-3xl font-bold'>Art Toy Management</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className='mr-2 h-4 w-4' />
          Create New Art Toy
        </Button>
      </div>

      <Table>
        <TableCaption>
          {artToys.length === 0
            ? 'No art toys available. Create one to get started.'
            : `A list of ${artToys.length} art toy${artToys.length > 1 ? 's' : ''}.`}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Arrival Date</TableHead>
            <TableHead className='text-right'>Available Quota</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artToys.map((artToy) => (
            <TableRow key={artToy.id}>
              <TableCell className='font-medium'>{artToy.sku}</TableCell>
              <TableCell>{artToy.name}</TableCell>
              <TableCell>{formatISOToShort(artToy.arrivalDate)}</TableCell>
              <TableCell className='text-right'>
                {artToy.availableQuota}
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex justify-end gap-2'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => setEditingArtToy(artToy)}
                  >
                    <Edit className='h-4 w-4' />
                  </Button>
                  <Button
                    variant='destructive'
                    size='icon'
                    onClick={() => setDeletingArtToy(artToy)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Create New Art Toy</DialogTitle>
            <DialogDescription>
              Add a new art toy to the catalog. All fields are required.
            </DialogDescription>
          </DialogHeader>
          <ArtToyForm
            onSubmit={handleCreate}
            isSubmitting={createMutation.isPending}
            submitLabel='Create Art Toy'
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingArtToy}
        onOpenChange={(open) => !open && setEditingArtToy(null)}
      >
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Edit Art Toy</DialogTitle>
            <DialogDescription>
              Update the art toy information. All fields are required.
            </DialogDescription>
          </DialogHeader>
          {editingArtToy && (
            <ArtToyForm
              defaultValues={{
                sku: editingArtToy.sku,
                name: editingArtToy.name,
                description: editingArtToy.description,
                arrivalDate: editingArtToy.arrivalDate.split('T')[0],
                availableQuota: editingArtToy.availableQuota,
                posterPicture: editingArtToy.posterPicture,
              }}
              onSubmit={handleUpdate}
              isSubmitting={updateMutation.isPending}
              submitLabel='Update Art Toy'
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingArtToy}
        onOpenChange={(open) => !open && setDeletingArtToy(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the art
              toy &quot;{deletingArtToy?.name}&quot; from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Container>
  );
}
