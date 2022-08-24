import { createStyleImportPlugin } from 'vite-plugin-style-import';

function createArcoPlugin() {
  return [
    createStyleImportPlugin({
      libs: [
        {
          libraryName: '@arco-design/web-vue',
          esModule: true,
          resolveStyle: name => {
            // The use of this part of the component must depend on the parent, so it can be ignored directly.
            // 这部分组件的使用必须依赖父级，所以直接忽略即可。
            const ignoreList = [
              'config-provider',
              'anchor-link',
              'sub-menu',
              'menu-item',
              'menu-item-group',
              'breadcrumb-item',
              'form-item',
              'step',
              'card-grid',
              'card-meta',
              'collapse-panel',
              'collapse-item',
              'descriptions-item',
              'list-item',
              'list-item-meta',
              'table-column',
              'table-column-group',
              'tab-pane',
              'tab-content',
              'timeline-item',
              'tree-node',
              'skeleton-line',
              'skeleton-shape',
              'grid-item',
              'carousel-item',
              'doption',
              'option',
              'optgroup',
              'icon',
            ];
            // List of components that need to map imported styles
            // 需要映射引入样式的组件列表
            const replaceList = {
              'typography-text': 'typography',
              'typography-title': 'typography',
              'typography-paragraph': 'typography',
              'typography-link': 'typography',
              'dropdown-button': 'dropdown',
              'input-password': 'input',
              'input-search': 'input',
              'input-group': 'input',
              'radio-group': 'radio',
              'checkbox-group': 'checkbox',
              'layout-sider': 'layout',
              'layout-content': 'layout',
              'layout-footer': 'layout',
              'layout-header': 'layout',
              'month-picker': 'date-picker',
              'range-picker': 'date-picker',
              row: 'grid', // 'grid/row.less'
              col: 'grid', // 'grid/col.less'
              'avatar-group': 'avatar',
              'image-preview': 'image',
              'image-preview-group': 'image',
            };
            if (ignoreList.includes(name)) return '';

            return Object.prototype.hasOwnProperty.call(replaceList, name)
              ? `@arco-design/web-vue/es/${replaceList[name]}/style/index.js`
              : `@arco-design/web-vue/es/${name}/style/index.js`;
          },
        },
      ],
    }),
  ];
}

export default createArcoPlugin;
