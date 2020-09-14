import Mock from 'mockjs'

const Random = Mock.Random;

// 接口返回的格式
let returnData = {
    data: null,
    ok: true,
    respCode: 0,
    message: null,
};
// 登录
//Mock.mock()：根据数据模板生成模拟数据
Mock.mock('/api/login', 'post', (option) => {
    let { username, password } = JSON.parse(option.body);
    returnData.data = {
        userName: username,
        passWord: password,
        token: new Date(),
    };
    return returnData
});

// 用户数据
const userData = () => {
    let users = [];
    for (let i = 0; i < 10; i++) {
        let user = {
            'id': i + 1,
            'date': Random.date('yyyy-MM-dd'),
            'name': Random.cname(),
            'address': Mock.mock('@county(true)'),
            'phone': Mock.mock(/^1[0-9]{10}$/),
            'status': Random.integer(0, 1)
        };
        users.push(user)
    }
    return users
};
Mock.mock('/api/users', userData);


//导航菜单数据
const navData = [
    {
        "path": "/Home",
        "name": "Home",
        "label": "首页",
        "children": [],
        "meta": {
            "icon": "el-icon-s-home",
            "loginCheck": true
        }
    },
    {
        "path": "/table/tableList",
        "label": "父菜单",
        "children": [
            {
                "path": "/table/tableList",
                "name": "tableList",
                "label": "表格",
                "children": [],
                "meta": {
                    "loginCheck": true
                }
            }
        ],
        "meta": {
            "icon": "el-icon-view",
            "loginCheck": true
        }
    },

    {
        "path": "/charts",
        "name": "charts",
        "label": "统计图",
        "children": [],
        "meta": {
            "icon": "el-icon-s-home",
            "loginCheck": true
        }
    },
    {
        "path": '/common/details',
        "name": 'Vue_details',
        "label": "API全局变量",
        "children": [],
        "meta": {
            "icon": "el-icon-tickets",
            "loginCheck": true,  // 是否需要登录
        },
    },
    {
        "path": '/common/options',
        "name": 'Vue_options',
        "label": "Vue选项",
        "children": [],
        "meta": {
            "icon": "el-icon-tickets",
            "loginCheck": true,  // 是否需要登录
        },
    },
    {
        "path": '/common/introduction',
        "name": 'Vue_introduction',
        "label": "实例和内置组件",
        "children": [],
        "meta": {
            "icon": "el-icon-tickets",
            "loginCheck": true,  // 是否需要登录
        },
    },
    {
        "path": '/common/Vue-cli',
        "name": 'Vue-cli',
        "label": "Vue-cli",
        "children": [],
        "meta": {
            "icon": "el-icon-tickets",
            "loginCheck": true,  // 是否需要登录
        },
    },
    /*{
        "path": '/common/Vue-router',
        "name": 'Vue-router',
        "label": "Vue-router",
        "children": [],
        "meta": {
            "icon": "el-icon-tickets",
            "loginCheck": true,  // 是否需要登录
        },
    }*/
];
Mock.mock('/api/navList', 'post', () => {
    returnData.data = navData;
    return returnData
});
