import React from 'react';
import { Transfer, Table, Tag } from 'antd';
import difference from 'lodash/difference';

const leftColumns = [
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
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
  },
];
const rightColumns = [
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

export default function StudentsTableTransfer({ ...restProps }) {
  // const  handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   this.setState({
  //     searchText: selectedKeys[0],
  //     searchedColumn: dataIndex,
  //   });
  // };

  // const  handleReset = clearFilters => {
  //   clearFilters();
  //   this.setState({ searchText: '' });
  // };
  
  // const getColumnSearchProps = dataIndex => ({
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
  //     <div style={{ padding: 8 }}>
  //       <Input
  //         ref={node => {
  //           this.searchInput = node;
  //         }}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //         onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{ width: 188, marginBottom: 8, display: 'block' }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Search
  //         </Button>
  //         <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
  //           Reset
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  //   onFilter: (value, record) =>
  //     record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
  //   onFilterDropdownVisibleChange: visible => {
  //     if (visible) {
  //       setTimeout(() => this.searchInput.select());
  //     }
  //   },
  //   render: text =>
  //     this.state.searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
  //         searchWords={[this.state.searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ''}
  //       />
  //     ) : (
  //       text
  //     ),
  // });




  return (
    <Transfer {...restProps} showSelectAll={false} operations={['添加', '移除']}>
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
}
