import { Popover } from 'antd';

const courseColumns = [
  {
    title: '课程名称',
    dataIndex: 'nick',
    rules: [
      {
        required: true,
        message: '规则名称为必填项',
      },
    ],
  },
  {
    title: '课程负责人',
    dataIndex: 'desc',
    sorter: true,
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
    rules: [
      {
        required: true,
        message: '负责人为必填项',
      },
    ],
  },

  {
    title: '课程简介',
    dataIndex: 'introduction',
    hideInTable: true,
  },
  {
    title: '课程目标',
    dataIndex: 'aim',
    hideInTable: true,
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

export default courseColumns;
