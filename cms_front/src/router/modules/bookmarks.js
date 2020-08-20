/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const bookmarkRouter = {
  path: '/bookmark',
  component: Layout,
  redirect: '/bookmark/list',
  children: [
    {
      path: 'list',
      component: () => import('@/views/bookmarks/index'),
      name: 'BookmarkList',
      meta: { title: '书签列表', icon: 'list', affix: true }
    }
  ]
}

export default bookmarkRouter
