import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Modal, Radio, Select, Steps, Space, Card, Checkbox } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';

import { queryDetail, add } from './service.js';

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');

  try {
    await update({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await add({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const { Item: FormItem, List: FormList } = Form;
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

export default function UpdateForm({ match }) {
  const [formVals, setFormVals] = useState({});

  const {
    params: { questionId },
  } = match;

  const [type, setType] = useState('0');

  const [form] = Form.useForm();

  return (
    <PageContainer>
      <Card>
        <Form
          {...formLayout}
          form={form}
          initialValues={{}}
          onFinish={(e) => {
            console.log(e);
          }}
        >
          <FormItem
            name="type"
            label="题目类型"
            // rules={[
            //   {
            //     required: true,
            //     message: '请选择题目类型！',
            //   },
            // ]}
          >
            <Radio.Group onChange={(e) => setType(e.target.value)} defaultValue="0">
              <Radio.Button value="0">单选题</Radio.Button>
              <Radio.Button value="1">多选题</Radio.Button>
              <Radio.Button value="2">判断题</Radio.Button>
              <Radio.Button value="3">填空题</Radio.Button>
              <Radio.Button value="4">程序填空题</Radio.Button>
              <Radio.Button value="5">程序改错题</Radio.Button>
              <Radio.Button value="6">编程题</Radio.Button>
            </Radio.Group>
          </FormItem>
          <FormItem
            name="nick"
            label="题目名称"
            // rules={[
            //   {
            //     required: true,
            //     message: '请输入至少三个字符的题目名称！',
            //     min: 3,
            //   },
            // ]}
          >
            <Input placeholder="请输入至少三个字符" />
          </FormItem>
          <FormItem
            name="introduction"
            label="题目描述"
            // rules={[
            //   {
            //     required: true,
            //     message: '请输入至少五个字符的题目描述！',
            //     min: 5,
            //   },
            // ]}
          >
            <TextArea rows={3} placeholder="请输入至少五个字符" />
          </FormItem>
          <FormItem name="tip" label="提示说明">
            <TextArea rows={3} placeholder="请输入提示说明" />
          </FormItem>

          {{
            '0': danXuanItems,
            '1': duoXuanItems,
            '2': panDuanItems,
            '3': tianKongItems,
            '4': chengXuTianKongItems,
            '5': gaiCuoItems,
            '6': bianChengItems,
          }[type]()}

          <FormItem wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              完成
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageContainer>
  );
}

// 单选题
const danXuanItems = (props) => {
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    margin: '5px 0',
  };
  return (
    <>
      <FormItem name="answer" label="题目答案">
        <Radio.Group style={{ width: 'calc(100% - 25px)' }} onChange={() => {}}>
          <Radio style={radioStyle} value={1}>
            <Input
              placeholder="请输入选项"
              addonAfter={
                <Button onClick={() => {}}>
                  <PlusOutlined /> 添加选项
                </Button>
              }
            />
          </Radio>
          <Radio style={radioStyle} value={2}>
            <Input
              placeholder="请输入选项"
              addonAfter={<Button danger icon={<MinusOutlined />} onClick={() => {}} />}
            />
          </Radio>
          <Radio style={radioStyle} value={3}>
            <Input
              placeholder="请输入选项"
              addonAfter={<Button danger icon={<MinusOutlined />} onClick={() => {}} />}
            />
          </Radio>
        </Radio.Group>
      </FormItem>
    </>
  );
};

// 多选
const duoXuanItems = (props) => {
  const checkboxStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    margin: '5px 0',
  };
  return (
    <>
      <FormItem name="answer" label="题目答案">
        <Checkbox style={checkboxStyle} onChange={() => {}}>
          <Input
            style={{ width: 'calc(100% - 33px)' }}
            placeholder="请输入选项"
            addonAfter={
              <Button onClick={() => {}}>
                <PlusOutlined /> 添加选项
              </Button>
            }
          />
        </Checkbox>
        <Checkbox style={checkboxStyle} onChange={() => {}}>
          <Input
            style={{ width: 'calc(100% - 33px)' }}
            placeholder="请输入选项"
            addonAfter={<Button danger icon={<MinusOutlined />} onClick={() => {}} />}
          />
        </Checkbox>
        <Checkbox style={checkboxStyle} onChange={() => {}}>
          <Input
            style={{ width: 'calc(100% - 33px)' }}
            placeholder="请输入选项"
            addonAfter={<Button danger icon={<MinusOutlined />} onClick={() => {}} />}
          />
        </Checkbox>
      </FormItem>
    </>
  );
};

// 判断
const panDuanItems = (props) => {
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  return (
    <>
      <FormItem name="answer" label="题目答案">
        <Radio.Group style={{ width: 'calc(100% - 25px)' }} onChange={() => {}}>
          <Radio style={radioStyle} value={1}>
            ✔
          </Radio>
          <Radio style={radioStyle} value={2}>
            ❌
          </Radio>
        </Radio.Group>
      </FormItem>
    </>
  );
};

const tianKongItems = (props) => {
  return (
    <>
      {' '}
      <FormItem
        name="frequency"
        label="填空"
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
        <TextArea rows={3} placeholder="请输入至少五个字符" />
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
        <TextArea rows={3} placeholder="请输入至少五个字符" />
      </FormItem>
    </>
  );
};

const chengXuTianKongItems = (props) => {
  return (
    <>
      {' '}
      <FormItem
        name="frequency"
        label="chengXuTianKongItems"
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
        <TextArea rows={3} placeholder="请输入至少五个字符" />
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
        <TextArea rows={3} placeholder="请输入至少五个字符" />
      </FormItem>
    </>
  );
};

const gaiCuoItems = (props) => {
  return (
    <>
      {' '}
      <FormItem
        name="frequency"
        label="gaiCuoItems"
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
        <TextArea rows={3} placeholder="请输入至少五个字符" />
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
        <TextArea rows={3} placeholder="请输入至少五个字符" />
      </FormItem>
    </>
  );
};

const bianChengItems = (props) => {
  return (
    <>
      {' '}
      <FormItem
        name="frequency"
        label="bianChengItems"
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
        <TextArea rows={3} placeholder="请输入至少五个字符" />
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
        <TextArea rows={3} placeholder="请输入至少五个字符" />
      </FormItem>
    </>
  );
};
