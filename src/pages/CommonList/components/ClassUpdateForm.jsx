import React, { useState } from 'react';
import {
  Form,
  Button,
  Input,
  Modal,
  Select,
  Steps,
  Transfer,
  Table,
  Tag,
  Upload,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import difference from 'lodash/difference';

const mockTags = ['视传1801', '视传1802', '视传1803'];

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: (i + 100).toString(),
    title: `content${i + 1}`,
    description: `181103025${i + 1}`,
    tag: mockTags[i % 3],
  });
}
const originTargetKeys = mockData.filter((item) => +item.key % 3 > 1).map((item) => item.key);

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: (item) => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const leftTableColumns = [
  {
    dataIndex: 'title',
    title: '名字',
  },
  {
    dataIndex: 'description',
    title: '学号',
  },
  {
    dataIndex: 'tag',
    title: '班级',
    render: (tag) => <Tag>{tag}</Tag>,
  },
];
const rightTableColumns = [
  {
    dataIndex: 'title',
    title: '已选学生',
  },
];

const { Item: FormItem } = Form;
const { Step } = Steps;
const { Option } = Select;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const ClassUpdateForm = (props) => {
  const [formVals, setFormVals] = useState({
    nick: props.values.nick,
    introduction: props.values.introduction,
    id: props.values.id,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const [targetKeys, setTargetKeys] = useState(originTargetKeys);

  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const forward = () => setCurrentStep(currentStep + 1);
  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 1) {
      forward();
    } else {
      console.log(formVals, fieldsValue, targetKeys);
      // handleUpdate({ ...formVals, ...fieldsValue });
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <TableTransfer
            dataSource={mockData}
            targetKeys={targetKeys}
            showSearch
            onChange={onChange}
            filterOption={(inputValue, item) =>
              item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
            }
            leftColumns={leftTableColumns}
            rightColumns={rightTableColumns}
          />
        </>
      );
    }
    return (
      <>
        <FormItem
          name="nick"
          label="班级名称"
          // rules={[
          //   {
          //     required: true,
          //     message: '请输入课程名称！',
          //   },
          // ]}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          name="frequency"
          label="班主任"
          // rules={[
          //   {
          //     required: true,
          //     message: '请输入任课教师！',
          //   },
          // ]}
        >
          <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择">
            <Option value="month">月</Option>
            <Option value="week">周</Option>
          </Select>
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button
            style={{
              float: 'left',
            }}
            onClick={backward}
          >
            上一步
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button
            onClick={(e) => {
              console.log(e);
              if ('done' === 'done') {
                message.success(`file uploaded successfully`);
              } else if ('done' === 'error') {
                message.error(`file upload failed.`);
              }
            }}
          >
            <UploadOutlined /> 导入学生
          </Button>
          <Button type="primary" onClick={() => handleNext()}>
            完成
          </Button>
        </>
      );
    }

    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          下一步
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={800}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title="编辑班级"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Steps
        style={{
          marginBottom: 28,
        }}
        size="small"
        current={currentStep}
      >
        <Step title="基本信息" />
        <Step title="添加学生" />
      </Steps>

      <Form
        {...formLayout}
        form={form}
        initialValues={{
          nick: formVals.nick,
          introduction: formVals.introduction,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default ClassUpdateForm;
