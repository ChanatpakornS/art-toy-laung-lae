'use client';

import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
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
  username: z.string(),
  password: z.string(),
});

export default function LoginPage() {
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast('You submitted the following values:', {
        description: (
          <pre className='bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4'>
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: 'bottom-right',
        classNames: {
          content: 'flex flex-col gap-2',
        },
        style: {
          '--border-radius': 'calc(var(--radius)  + 4px)',
        } as React.CSSProperties,
      });
    },
  });

  return (
    <div className='max-w-2xl mx-auto my-20 space-y-6'>
      <h1 className='text-2xl font-bold text-center'>Login</h1>
      <form
        id='login-form'
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
                    placeholder='Login button not working on mobile'
                    autoComplete='off'
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
                    placeholder='Login button not working on mobile'
                    autoComplete='off'
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
      </form>
      <Field orientation='vertical'>
        <Link
          href='/register'
          className='text-sm text-blue-500 hover:underline text-end'
        >
          Don't have an account? Register here.
        </Link>
        <div>
          <Button type='button' variant='outline' onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type='submit' form='login-form'>
            Submit
          </Button>
        </div>
      </Field>
    </div>
  );
}
