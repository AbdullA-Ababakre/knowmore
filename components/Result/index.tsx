import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import styles from './index.module.scss';
import { ConfigProvider } from 'antd';



interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
    },
    {
        title: 'Action',
        key: 'action',
        dataIndex: 'action'
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

export default function Result() {
    return (
        <div className={styles.wrapper}>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            rowHoverBg: 'none',
                            rowSelectedBg: 'none',
                            rowSelectedHoverBg: 'none',
                            borderColor: 'none'
                        },
                    },
                }}
            >
                <Table className={styles.table} columns={columns} dataSource={data}>
                </Table>
            </ConfigProvider>
            {/* <div className={styles.overlay}>
                <span className={styles.action}>subscribe</span> to continue
            </div> */}
        </div>

    );
}
