import { useAppModel } from '@/model';

const WIDTH = 992;

const queryDevice = () => {
  const rect = document.body.getBoundingClientRect();
  return rect.width - 1 < WIDTH;
};

const useResponsive = (immediate = true) => {
  const { patch } = useAppModel();

  const resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = queryDevice();

      patch({ hideMenu: isMobile, device: isMobile ? 'mobile' : 'desktop' });
    }
  };
  const debounceFn = useDebounceFn(resizeHandler, 100);

  onMounted(() => {
    if (immediate) {
      debounceFn();
    }
  });

  onBeforeMount(() => {
    window.addEventListener('resize', debounceFn, false);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('reset', debounceFn, false);
  });
};

export { useResponsive };
