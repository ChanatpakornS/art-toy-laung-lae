'use client';

import { useForm } from '@tanstack/react-form';
import * as React from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  username: z.string(),
  email: z.email(),
  telephone: z
    .string()
    .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  role: z.enum(['member', 'admin']),
  password: z.string(),
});

export default function LoginPage() {
  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      telephone: '',
      role: 'member',
      password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: value.username,
            email: value.email,
            tel: value.telephone,
            role: value.role,
            password: value.password,
            createdAt: new Date().toISOString().split('T')[0],
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Registration failed');
        }

        toast.success('Registration successful!');
        window.location.href = '/login';
      } catch (error) {
        toast.error((error as Error).message);
      }
    },
  });

  return (
    <div className='max-w-2xl mx-auto my-20 space-y-6'>
      <h1 className='text-2xl font-bold text-center'>Registration</h1>
      <form
        id='registration-form'
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name='username'>
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder='Enter your Username'
                    autoComplete='on'
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name='email'>
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder='Enter your Email'
                    autoComplete='on'
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name='telephone'>
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder='Enter your Phone number'
                    autoComplete='on'
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name='role'>
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                  <Select
                    defaultValue='member'
                    onValueChange={field.handleChange}
                    required
                  >
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Select your role' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='member'>Member</SelectItem>
                        <SelectItem value='admin'>Admin</SelectItem>
                      </SelectGroup>{' '}
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name='password'>
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder='Enter your Password'
                    autoComplete='off'
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
      </form>
      <Field orientation='horizontal'>
        <div className='w-full flex justify-end gap-2 flex-col pt-12'>
          <Button
            className='w-full hover:cursor-pointer'
            type='submit'
            form='login-form'
            onClick={form.handleSubmit}
          >
            Register
          </Button>
        </div>
      </Field>
    </div>
  );
}
