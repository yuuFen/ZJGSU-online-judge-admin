import React, { useState } from 'react';
import { Form, Button, Input, Modal, Select, Steps, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import StudentsTableTransfer from './ChooseStudentsTable';
import { debounce } from 'lodash';

import { query } from '@/services/user';

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

const ClassUpdateForm = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [formVals, setFormVals] = useState({
    nick: props.values.nick,
    introduction: props.values.introduction,
    id: props.values.id,
  });

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const [targetKeys, setTargetKeys] = useState(originTargetKeys);
  const [pagination, setPagination] = useState({
    current: 0,
    pageSize: 10,
  });
  const [filter, setFilter] = useState({
    organ: undefined,
    search: '',
  });

  const fetchStudents = (params = {}) => {
    query(params);
  };

  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  // 防抖处理，延时 500ms
  const onSearch = debounce((dir, v) => {
    console.log(dir, v);
    fetchStudents({ ...pagination, ...filter });
  }, 300);

  const forward = () => setCurrentStep(currentStep + 1);
  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    if (currentStep < 1) {
      forward();
    } else {
      console.log(formVals, targetKeys);
      // handleUpdate({ ...formVals, ...fieldsValue });
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <StudentsTableTransfer
            dataSource={mockData}
            targetKeys={targetKeys}
            showSearch
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(inputValue, item) => true}
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
