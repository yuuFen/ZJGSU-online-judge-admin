const ruleColumns = [
  {
    title: '规则名称',
    dataIndex: 'name',
    rules: [
      {
        required: true,
        message: '规则名称为必填项',
      },
    ],
  },
  {
    title: '描述',
    dataIndex: 'desc',
    valueType: 'textarea',
  },
  {
    title: '服务调用次数',
    dataIndex: 'callNo',
    sorter: true,
    hideInForm: true,
    hideInSearch: true,
    renderText: (val) => `${val} 万`,
  },
  {
    title: '状态',
    dataIndex: 'status',
    hideInForm: true,
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
    title: '上次调度时间',
    dataIndex: 'updatedAt',
    sorter: true,
    valueType: 'dateTime',
    hideInForm: true,
    renderFormItem: (item, { defaultRender, ...rest }, form) => {
      const status = form.getFieldValue('status');

      if (`${status}` === '0') {
        return false;
      }

      if (`${status}` === '3') {
        return <Input {...rest} placeholder="请输入异常原因！" />;
      }

      return defaultRender(item);
    },
  },
];
export default ruleColumns;
