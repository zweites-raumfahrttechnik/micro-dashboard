<script lang="tsx">
import { compile } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { Menu, SubMenu, MenuItem } from '@arco-design/web-vue';
import { useAppModel } from '@/model';

import { useMenuKeys, useMenuTree } from './menuHooks';

export default defineComponent({
  emits: ['collapse'],
  setup() {
    const router = useRouter();
    const { state, patch: appPatch } = useAppModel();
    const { menuTree } = useMenuTree();
    const { selectedKey, openKeys } = useMenuKeys(menuTree);

    const collapsed = computed({
      get() {
        if (state.device !== 'desktop') {
          return false;
        }

        return state.menuCollapse;
      },
      set(v: boolean) {
        appPatch({ menuCollapse: v });
      },
    });

    const onCollapse = (val: boolean) => {
      if (state.device === 'desktop') {
        appPatch({ menuCollapse: val });
      }
    };

    const goto = (item: RouteRecordRaw) => {
      router.push({ name: item.name });
    };

    const renderSubMenu = () => {
      const travel = (_route: RouteRecordRaw[]) => {
        if (!_route) {
          return [];
        }

        return _route.map(el => {
          const icon = el.meta?.icon ? () => h(compile(`<${el.meta?.icon} />`)) : null;

          return el.children && el.children?.length !== 0 ? (
            <SubMenu
              key={el.name as string}
              v-slots={{ icon, title: () => h(compile(el.meta?.locale || '')) }}
            >
              {travel(el.children)}
            </SubMenu>
          ) : (
            <MenuItem key={el.name as string} v-slots={{ icon }} onClick={() => goto(el)}>
              {el.meta?.locale || ''}
            </MenuItem>
          );
        });
      };

      return travel(menuTree.value);
    };

    return () => (
      <Menu
        v-model:collapsed={collapsed.value}
        v-model:open-keys={openKeys.value}
        show-collapse-button={state.device !== 'mobile'}
        selected-keys={selectedKey.value}
        auto-open={false}
        auto-open-selected={true}
        level-indent={34}
        style="height: 100%"
        onCollapse={onCollapse}
      >
        {renderSubMenu()}
      </Menu>
    );
  },
});
</script>

<style lang="less" scoped>
:deep(.arco-menu-item) {
  .arco-menu-inline-header {
    display: flex;
    align-items: center;
  }

  .arco-icon {
    &:not(.arco-icon-down) {
      font-size: 18px;
    }
  }
}
</style>
