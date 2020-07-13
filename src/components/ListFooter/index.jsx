import React from 'react';
import { FooterToolbar } from '@ant-design/pro-layout';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

export default function ListFooter(props) {
  const { selectedRowsState, actionRef, handleRemove, setSelectedRows } = props;
  return (
    <FooterToolbar
      extra={
        <div>
          已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项
        </div>
      }
    >
      <Button
        danger
        onClick={() => {
          confirm({
            title: '你确定要删除这些项目吗？',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            async onOk() {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest();
            },
          });
        }}
      >
        批量删除
      </Button>
      <Button
        onClick={async () => {
          setSelectedRows([]);
          actionRef.current?.reloadAndRest();
        }}
      >
        取消选择
      </Button>
    </FooterToolbar>
  );
}
