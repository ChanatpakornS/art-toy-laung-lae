import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function setupApiBaseUrl() {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  return `${url}/api`;
}

// Generic fetch function
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = setupApiBaseUrl() + endpoint;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Generate query key from path
function createQueryKey(path: string, params?: Record<string, any>) {
  const key = [path];
  if (params) {
    key.push(JSON.stringify(params));
  }
  return key;
}

// Generic GET hook
export function useApiQuery<T>(
  path: string,
  params?: Record<string, any>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    refetchOnWindowFocus?: boolean;
  },
) {
  const queryKey = createQueryKey(path, params);
  const url = params ? `${path}?${new URLSearchParams(params)}` : path;

  return useQuery({
    queryKey,
    queryFn: () => apiFetch<T>(url),
    ...options,
  });
}

// Unified mutation hook with method switch
export function useApiMutation<TData, TVariables = any>(
  method: 'post' | 'patch' | 'delete',
  path: string,
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
  },
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables?: TVariables) => {
      let requestOptions: RequestInit;

      switch (method.toLowerCase()) {
        case 'post':
          requestOptions = {
            method: 'POST',
            body: JSON.stringify(variables),
          };
          break;
        case 'patch':
          requestOptions = {
            method: 'PATCH',
            body: JSON.stringify(variables),
          };
          break;
        case 'delete':
          requestOptions = {
            method: 'DELETE',
          };
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }

      return apiFetch<TData>(path, requestOptions);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [path] });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

// Export utility functions
export { createQueryKey, apiFetch };
