import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Modal, Radio, Select, Steps, Space, Card, Checkbox } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';

import { queryDetail, add } from './service.js';

const finalData = {};

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

          {
            {
              '0': <DanXuanItems />,
              '1': <DuoXuanItems />,
              '2': <PanDuanItems />,
              '3': <TianKongItems />,
              '4': <ChengXuTianKongItems />,
              '5': <GaiCuoItems />,
              '6': <BianChengItems />,
            }[type]
          }

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
const DanXuanItems = (props) => {
  const [answers, setAnswers] = useState(['', '', '']);

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
          {answers.map((item, index) => (
            <Radio style={radioStyle} value={index} key={index}>
              <Input
                value={item}
                onChange={(e) => {
                  const tmp = answers.slice();
                  tmp[index] = e.target.value;
                  setAnswers(tmp);
                }}
                placeholder="请输入选项"
                addonAfter={
                  index === 0 ? (
                    <Button onClick={() => setAnswers([...answers, ''])}>
                      <PlusOutlined /> 添加选项
                    </Button>
                  ) : (
                    <Button
                      danger
                      icon={<MinusOutlined />}
                      onClick={() => {
                        const tmp = answers.slice();
                        tmp.splice(index, 1);
                        setAnswers(tmp);
                      }}
                    />
                  )
                }
              />
            </Radio>
          ))}
        </Radio.Group>
      </FormItem>
    </>
  );
};

// 多选
const DuoXuanItems = (props) => {
  const [answers, setAnswers] = useState(['', '', '']);

  const checkboxStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    margin: '5px 0',
  };
  return (
    <>
      <FormItem name="answer" label="题目答案">
        {answers.map((item, index) => (
          <Checkbox style={checkboxStyle} onChange={() => {}} key={index}>
            <Input
              style={{ width: 'calc(100% - 33px)' }}
              value={item}
              onChange={(e) => {
                const tmp = answers.slice();
                tmp[index] = e.target.value;
                setAnswers(tmp);
              }}
              placeholder="请输入选项"
              addonAfter={
                index === 0 ? (
                  <Button onClick={() => setAnswers([...answers, ''])}>
                    <PlusOutlined /> 添加选项
                  </Button>
                ) : (
                  <Button
                    danger
                    icon={<MinusOutlined />}
                    onClick={() => {
                      const tmp = answers.slice();
                      tmp.splice(index, 1);
                      setAnswers(tmp);
                    }}
                  />
                )
              }
            />
          </Checkbox>
        ))}
      </FormItem>
    </>
  );
};

// 判断
const PanDuanItems = (props) => {
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

// 填空
const TianKongItems = (props) => {
  const [answers, setAnswers] = useState(['0', '1', '2']);

  return (
    <>
      {answers.map((item, index) => (
        <FormItem name={'answers' + item} label={'第' + (index + 1) + '空答案'}>
          <Input
            placeholder="请输入答案"
            addonAfter={
              index === 0 ? (
                // 防重
                <Button onClick={() => setAnswers([...answers, answers.length + Math.random()])}>
                  <PlusOutlined /> 添加选项
                </Button>
              ) : (
                <Button
                  danger
                  icon={<MinusOutlined />}
                  onClick={() => {
                    const tmp = answers.slice();
                    tmp.splice(index, 1);
                    setAnswers(tmp);
                  }}
                />
              )
            }
          />
        </FormItem>
      ))}
    </>
  );
};

// 程序填空
const ChengXuTianKongItems = (props) => {
  const [answers, setAnswers] = useState(['0', '1', '2']);

  return (
    <>
      <FormItem name="signStr" label="脚本替换字符串">
        <Input placeholder="请输入替换字符串" />
      </FormItem>

      {answers.map((item, index) => (
        <FormItem name={'answers' + item} label={'第' + (index + 1) + '空答案'}>
          <Input
            placeholder="请输入答案"
            addonAfter={
              index === 0 ? (
                // 防重
                <Button onClick={() => setAnswers([...answers, answers.length + Math.random()])}>
                  <PlusOutlined /> 添加选项
                </Button>
              ) : (
                <Button
                  danger
                  icon={<MinusOutlined />}
                  onClick={() => {
                    const tmp = answers.slice();
                    tmp.splice(index, 1);
                    setAnswers(tmp);
                  }}
                />
              )
            }
          />
        </FormItem>
      ))}
    </>
  );
};

// 程序改错
const GaiCuoItems = (props) => {
  return (
    <>
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

// 编程
const BianChengItems = (props) => {
  return (
    <>
      <FormItem name="inputFormat" label="输入格式">
        <TextArea rows={3} placeholder="请输入输入格式" />
      </FormItem>
      <FormItem name="outputFormat" label="输出格式">
        <TextArea rows={3} placeholder="请输入输出格式" />
      </FormItem>
      <FormItem name="inputExample1" label="输入样例1">
        <TextArea rows={2} placeholder="请输入输入样例1" />
      </FormItem>
      <FormItem name="outputExample1" label="输出样例1">
        <TextArea rows={2} placeholder="请输入输出样例1" />
      </FormItem>
      <FormItem name="inputExample2" label="输入样例2">
        <TextArea rows={2} placeholder="请输入输入样例2" />
      </FormItem>
      <FormItem name="outputExample2" label="输出样例2">
        <TextArea rows={2} placeholder="请输入输出样例2" />
      </FormItem>
    </>
  );
};
