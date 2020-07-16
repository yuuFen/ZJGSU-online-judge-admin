const organColumns = [
  {
    title: '组织名称',
    dataIndex: 'nick',
    rules: [
      {
        required: true,
        message: '组织名称为必填项',
      },
    ],
  },
  {
    title: '上级组织',
    dataIndex: 'parent',
    valueEnum: {
      0: {
        text: '关闭',
        status: 'Default',
      },
      1: {
        text: '运行中',
        status: 'Processing',
      },
      2: {
        text: '已上线',
        status: 'Success',
      },
      3: {
        text: '异常',
        status: 'Error',
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
    sorter: true,
    valueType: 'dateTime',
    hideInForm: true,
    hideInSearch: true,
  },
];

export default organColumns;
