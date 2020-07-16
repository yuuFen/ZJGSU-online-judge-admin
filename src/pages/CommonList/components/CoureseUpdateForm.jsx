import React, { useState, useEffect } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Item: FormItem, List: FormList } = Form;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 13, offset: 0 },
    sm: { span: 13, offset: 7 },
  },
};

const UpdateForm = (props) => {
  const [formVals, setFormVals] = useState({
    nick: props.values.nick,
    introduction: props.values.introduction,
    id: props.values.id,
  });

  const [units, setUnits] = useState(['']);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);
  const backward = () => setCurrentStep(currentStep - 1);
  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 1) {
      forward();
    } else {
      console.log(formVals, fieldsValue);
      // handleUpdate({ ...formVals, ...fieldsValue });
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          {units.map((_, index) => (
            <>
              <FormItem
                name={'unit' + index}
                label="课程章节"
                rules={[
                  {
                    required: true,
                    message: '请输入课程章节！',
                  },
                ]}
              >
                <Input placeholder="请输入" />
              </FormItem>
              <FormList name={'knows' + index}>
                {(fields, { add, remove }) => {
                  return (
                    <>
                      {fields.map((field, index) => (
                        <FormItem
                          {...(index !== 0 && formItemLayoutWithOutLabel)}
                          label={index === 0 ? '知识点' : ''}
                          required={true}
                          key={field.key}
                        >
                          <FormItem
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: '请输入相应知识点',
                              },
                            ]}
                            noStyle
                          >
                            <Input placeholder={'知识点 ' + (index + 1)} style={{ width: '90%' }} />
                          </FormItem>
                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              style={{ margin: '0 8px' }}
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          ) : null}
                        </FormItem>
                      ))}
                      <FormItem {...formItemLayoutWithOutLabel}>
                        <Button
                          type="dashed"
                          onClick={() => {
                            add();
                          }}
                        >
                          <PlusOutlined /> 添加知识点
                        </Button>
                      </FormItem>
                    </>
                  );
                }}
              </FormList>
            </>
          ))}
        </>
      );
    }
    return (
      <>
        <FormItem
          name="nick"
          label="课程名称"
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
          label="任课教师"
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
        <FormItem
          name="introduction"
          label="课程简介"
          // rules={[
          //   {
          //     required: true,
          //     message: '请输入至少五个字符的课程简介！',
          //     min: 5,
          //   },
          // ]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
        </FormItem>
        <FormItem
          name="desc"
          label="课程要求"
          // rules={[
          //   {
          //     required: true,
          //     message: '请输入至少五个字符的课程要求！',
          //     min: 5,
          //   },
          // ]}
        >
          <TextArea rows={4} placeholder="请输入至少五个字符" />
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
            type="primary"
            onClick={() => {
              setUnits([...units, '']);
            }}
          >
            <PlusOutlined /> 添加章节
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
      width={640}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title="编辑课程"
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
        <Step title="编辑知识点" />
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

export default UpdateForm;
