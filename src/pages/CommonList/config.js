import { Popover } from 'antd';

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
    render: (_, record) => {
      const content = (
        <div>
          <p>{record.introduction}</p>
          <p>目标：{record.aim}</p>
        </div>
      );
      return (
        <Popover content={content} title="课程详情">
          <a>{record.nick}</a>
        </Popover>
      );
    },
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
    render: (_, record) => (
      <a
        onClick={() => {
          console.log(record.id);
        }}
      >
        {record.nick}
      </a>
    ),
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
    render: (_, record) =>
      record.parent &&
      record.parent.map((item, index) => {
        return (
          <>
            <span>
              {index !== 0 && ' < '}
              <a
                onClick={() => {
                  console.log(item.id);
                }}
              >
                {item.nick}
              </a>
            </span>
          </>
        );
      }),
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

export const ListConfig = {
  rule: {
    columns: ruleColumns,
    title: '规则',
  },
  course: {
    columns: courseColumns,
    title: '课程',
  },
  organ: {
    columns: organColumns,
    title: '组织',
  },
};
