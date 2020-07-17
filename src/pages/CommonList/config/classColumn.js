const classColumns = [
  {
    title: '班级名称',
    dataIndex: 'nick',
    rules: [
      {
        required: true,
        message: '班级名称为必填项',
      },
    ],
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

export default classColumns;
