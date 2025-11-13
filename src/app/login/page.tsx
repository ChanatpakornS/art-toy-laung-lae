'use client';

import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
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

const formSchema = z.object({
  userEmail: z.string(),
  password: z.string(),
});

export default function LoginPage() {
  const form = useForm({
    defaultValues: {
      userEmail: '',
      password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await signIn('credentials', {
        redirect: false,
        email: value.userEmail,
        password: value.password,
      });

      if (result?.error) {
        toast.error(result.error);
      }

      if (result?.ok) {
        window.location.href = '/';
      }
    },
  });

  return (
    <div className='max-w-2xl mx-auto my-20 space-y-6 px-4'>
      <h1 className='text-2xl font-bold text-center'>Login</h1>
      <form
        id='login-form'
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name='userEmail'>
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
                    placeholder='Enter your email'
                    autoComplete='on'
                    required
                  />
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
                    autoComplete='on'
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
      </form>
      <Field orientation='vertical'>
        <div className='flex justify-end gap-2'>
          <span className='text-sm text-end'>Don&apos;t have an account?</span>
          <Link
            href='/register'
            className='text-sm text-blue-500 hover:underline text-end'
          >
            Register here.
          </Link>
        </div>
        <div className='w-full flex justify-end gap-2 flex-col pt-12 hover:cursor-auto'>
          <Button
            className='w-full hover:cursor-pointer'
            type='submit'
            form='login-form'
          >
            Login
          </Button>
        </div>
      </Field>
    </div>
  );
}
