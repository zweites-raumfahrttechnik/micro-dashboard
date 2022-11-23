const useUserModel = createGlobalState(() => {
  const user = useLocalStorage<{ token?: string; role?: string }>('user', {});

  const token = computed(() => user.value.token);
  const role = computed(() => user.value.role);

  const setUser = (token: string, role: string) => {
    user.value.token = token;
    user.value.role = role;
  };

  return { setUser, token, role };
});

export { useUserModel };
