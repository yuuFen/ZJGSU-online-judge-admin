import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Popconfirm } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';

import DetailForm from '@/components/List/DetailForm';
import ListFooter from '@/components/List/ListFooter';

import { query, remove } from './service.js';

const TableList = () => {
  const actionRef = useRef();
  const [detailModalVisible, handledetailModalVisible] = useState(false);
  const [selectedRowsState, setSelectedRows] = useState([]);

  const columns = [
    {
      title: '课程名称',
      dataIndex: 'nick',
    },
    {
      title: '题目类型',
      dataIndex: 'desc',
      sorter: true,
      valueEnum: {
        0: {
          text: '单选题',
          status: 'Da',
        },
        1: {
          text: '多选题',
          status: 'Do',
        },
        2: {
          text: '判断题',
          status: 'Pa',
        },
        3: {
          text: '填空题',
          status: 'Tn',
        },
        4: {
          text: '程序填空题',
          status: 'Ct',
        },
        5: {
          text: '程序改错题',
          status: 'Cg',
        },
        6: {
          text: '编程题',
          status: 'Bn',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '题目状态',
      dataIndex: 'status',
      sorter: true,
      valueEnum: {
        0: {
          text: '待审核',
          status: 'Da',
        },
        1: {
          text: '已通过',
          status: 'Do',
        },
        2: {
          text: '被驳回',
          status: 'Pa',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => handledetailModalVisible(true)}>审核</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle="查询课程"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button type="primary" onClick={() => history.push('/question/edit')}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => query({ ...params, sorter, filter })}
        columns={columns}
      />

      <DetailForm
        title="课程详情"
        onCancel={() => handledetailModalVisible(false)}
        modalVisible={detailModalVisible}
      ></DetailForm>
    </PageContainer>
  );
};

export default TableList;
