import { useAppModel } from '@/model';

const useRouteTitle = () => {
  const route = useRoute();
  const { state } = useAppModel();

  const title = computed(() => {
    if (route.meta.locale && route.meta.locale.length !== 0) {
      return `${route.meta.locale} | ${state.title}`;
    }

    return state.title;
  });

  useTitle(title);
};

export default useRouteTitle;
