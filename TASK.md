# Task: Admin Art Toy Management

## Overview

Implement CRUD operations for Art Toys accessible only by admin users.

## Requirements

- [x] Admin users can view all art toys
- [x] Admin users can add new art toys
- [x] Admin users can update existing art toys
- [x] Admin users can delete art toys
- [x] Arrival date validation (must be >= current date)
- [x] Auto-generated ID for new art toys (handled by backend)

## Implementation Steps

### 1. Type Definitions & API Client

- [x] Define Art Toy types and schemas
- [x] Create API functions for CRUD operations (create, update, delete)

### 2. Form Component

- [x] Create reusable ArtToyForm component with validation
- [x] Support both create and edit modes
- [x] Implement arrival date validation
- [x] Handle image URL input

### 3. Admin Management Page

- [x] Create data table with art toy list
- [x] Add "Create New Art Toy" button
- [x] Implement edit action (opens dialog with form)
- [x] Implement delete action (with confirmation)
- [x] Show loading and error states

### 4. Integration

- [x] Connect forms to API endpoints
- [x] Implement React Query mutations
- [x] Add success/error notifications
- [x] Handle cache invalidation after mutations

### 5. Testing & Validation

- [ ] Test create operation
- [ ] Test update operation
- [ ] Test delete operation
- [ ] Verify arrival date validation
- [ ] Test error handling
- [ ] Verify admin-only access

## Technical Details

### API Endpoints (from SWAGGER.md)

- `GET /api/v1/arttoys` - Get all art toys
- `POST /api/v1/arttoys` - Create new art toy (admin only)
- `PUT /api/v1/arttoys/:id` - Update art toy (admin only)
- `DELETE /api/v1/arttoys/:id` - Delete art toy (admin only)

### Art Toy Schema

```typescript
{
  sku: string
  name: string
  description: string
  arrivalDate: string (ISO date, >= today)
  availableQuota: number
  posterPicture: string (URL)
}
```

### Files to Create/Modify

- [x] `TASK.md` - This file
- [x] `src/types/arttoy.types.ts` - Add create/update schemas
- [x] `src/libs/arttoy.ts` - API functions for CRUD
- [x] `src/components/arttoy/arttoy-form.tsx` - Form component
- [x] `src/app/(admin)/arttoy-management/page.tsx` - Admin page with table

## Notes

- Use Zod for validation schemas
- Use TanStack React Query for mutations
- Use ShadCN UI components (Dialog, Form, Table, etc.)
- Ensure proper error handling and user feedback
- Follow project conventions (see CONVENTION.md)

## Testing Guide

### Prerequisites

1. Ensure backend API is running
2. Have an admin account credentials ready
3. Clear browser cache/cookies if needed

### Test Scenarios

#### 1. View Art Toys

- [ ] Navigate to `/arttoy-management` as admin
- [ ] Verify table displays existing art toys
- [ ] Check all columns are displayed correctly (SKU, Name, Arrival Date,
      Available Quota, Actions)
- [ ] Verify loading state shows while fetching data
- [ ] Test error state by stopping backend

#### 2. Create Art Toy

- [ ] Click "Create New Art Toy" button
- [ ] Verify dialog opens with empty form
- [ ] Test form validation:
  - [ ] Submit empty form - should show validation errors
  - [ ] Enter invalid URL for poster - should show error
  - [ ] Enter past date for arrival - should show error
  - [ ] Enter negative quota - should show error
  - [ ] Enter non-integer quota - should show error
- [ ] Fill valid data and submit
- [ ] Verify success toast notification
- [ ] Verify new art toy appears in table
- [ ] Verify dialog closes automatically

**Test Data:**

```
SKU: ATT-001
Name: Cute Bear Figure
Description: Limited edition collectible bear figure with premium finish
Arrival Date: (select future date)
Available Quota: 100
Poster Picture: https://images.unsplash.com/photo-1563291074-2bf8677ac0e5
```

#### 3. Update Art Toy

- [ ] Click edit button on an existing art toy
- [ ] Verify dialog opens with pre-filled form data
- [ ] Verify all fields contain correct existing values
- [ ] Modify some fields:
  - [ ] Change name
  - [ ] Update quota
  - [ ] Change arrival date (must be >= today)
- [ ] Submit the form
- [ ] Verify success toast notification
- [ ] Verify table updates with new values
- [ ] Verify dialog closes automatically

#### 4. Delete Art Toy

- [ ] Click delete button on an art toy
- [ ] Verify confirmation dialog appears
- [ ] Verify art toy name is displayed in confirmation message
- [ ] Click "Cancel" - dialog should close without deleting
- [ ] Click delete button again
- [ ] Click "Delete" in confirmation
- [ ] Verify success toast notification
- [ ] Verify art toy is removed from table
- [ ] Verify confirmation dialog closes

#### 5. Error Handling

- [ ] Stop backend server
- [ ] Try to create art toy - should show error toast
- [ ] Try to update art toy - should show error toast
- [ ] Try to delete art toy - should show error toast
- [ ] Restart backend
- [ ] Verify operations work again

#### 6. Authorization (If middleware is enabled)

- [ ] Logout from admin account
- [ ] Try to access `/arttoy-management` - should redirect to login
- [ ] Login as member (non-admin)
- [ ] Try to access `/arttoy-management` - should be denied/redirected

### Expected Behaviors

- Forms should validate input before submission
- Success operations should show green toast notifications
- Error operations should show red toast notifications
- Table should auto-refresh after create/update/delete
- Dialogs should close after successful operations
- Loading states should be shown during API calls
- Buttons should be disabled during submission

### Known Limitations

- Image upload not implemented (using URLs only)
- No pagination for large datasets
- No search/filter functionality (future enhancement)

## Quick Reference

### Component Usage

#### ArtToyForm Component

```tsx
import { ArtToyForm } from '@/components/arttoy/arttoy-form';

<ArtToyForm
  defaultValues={{
    sku: 'ATT-001',
    name: 'Example',
    description: 'Description',
    arrivalDate: '2025-11-20',
    availableQuota: 100,
    posterPicture: 'https://example.com/image.jpg',
  }}
  onSubmit={(data) => console.log(data)}
  isSubmitting={false}
  submitLabel='Create Art Toy'
/>;
```

#### API Functions

```tsx
import {
  createArtToy,
  updateArtToy,
  deleteArtToy,
  getArtToys,
} from '@/libs/arttoy';

// Create
const result = await createArtToy(formData, token);

// Update
const result = await updateArtToy(id, formData, token);

// Delete
const result = await deleteArtToy(id, token);

// Get all
const result = await getArtToys();
```

### URL Routes

- Admin Management Page: `/arttoy-management`
- Art Toys Browse Page: `/arttoys`

### Environment Variables Required

```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```
