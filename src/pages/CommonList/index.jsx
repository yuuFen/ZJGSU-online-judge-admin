import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Popconfirm } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';

import DetailForm from '@/components/List/DetailForm';
import CreateForm from '@/components/List/CreateForm';
import ListFooter from '@/components/List/ListFooter';

import requestResource from '@/services/resource';

import { ListConfig } from './config/config';

const TableList = ({ match }) => {
  const actionRef = useRef();
  const [detailModalVisible, handledetailModalVisible] = useState(false);
  const [createModalVisible, handleCreateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);

  const { resourceName } = match.params;

  const { query, add, update, remove } = requestResource(resourceName);
  const config = ListConfig[resourceName];
  const { UpdateForm } = config;

  const columns = [
    ...config.columns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="你确认要删除吗？"
            onConfirm={async () => {
              await handleRemove([record]);
              actionRef.current?.reloadAndRest();
            }}
            okText="确认"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  columns[0].render = (_, record) => {
    return <a onClick={() => handledetailModalVisible(true)}>{record.nick || record.name}</a>;
  };
  if (resourceName === 'organ') {
    columns[1].render = (_, record) =>
      record.parent &&
      record.parent.map((item, index) => {
        return (
          <>
            <span>
              {index !== 0 && ' < '}
              <a onClick={() => handledetailModalVisible(true)}>{item.nick}</a>
            </span>
          </>
        );
      });
  }

  useEffect(() => {
    // 存在 bug，需要先停止请求
    actionRef.current?.reloadAndRest();
  }, [resourceName]);

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
   *  删除节点
   * @param selectedRows
   */
  const handleRemove = async (selectedRows) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;

    try {
      await remove({
        key: selectedRows.map((row) => row.key),
      });
      hide();
      message.success('删除成功，即将刷新');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  return (
    <PageContainer>
      <ProTable
        headerTitle={'查询' + config.title}
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleCreateModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => query({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <ListFooter
          selectedRowsState={selectedRowsState}
          setSelectedRows={setSelectedRows}
          actionRef={actionRef}
          handleRemove={handleRemove}
        />
      )}
      <CreateForm
        title={'新建' + config.title}
        onCancel={() => handleCreateModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleCreateModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <DetailForm
        title={config.title + '详情'}
        onCancel={() => handledetailModalVisible(false)}
        modalVisible={detailModalVisible}
      ></DetailForm>
    </PageContainer>
  );
};

export default TableList;
