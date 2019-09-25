const menuConfig = [{
    key: "/home",
    icon: "home",
    title: "首页"
  },
  {
    title: "用户",
    key: "/user",
    icon: "team",
    children: [{
        key: "/manager",
        icon: "user",
        title: '管理员用户'
      },
      {
        key: "/normal",
        icon: "user",
        title: '普通用户'
      }
    ]
  },
  {
    title: "商品",
    key: "/products",
    icon: "home",
    children: [{
        key: "/product",
        icon: "home",
        title: "商品管理",
      },
      {
        key: "/category",
        icon: "home",
        title: "品类管理"
      }
    ]
  },
  {
    key: "/order",
    icon: "home",
    title: "订单管理"
  },
  {
    title: "系统管理",
    key: "/system",
    icon: "home",
    children: [{
      key: "/loop",
      icon: "home",
      title: "轮播图管理"
    }]
  }
]


export default menuConfig