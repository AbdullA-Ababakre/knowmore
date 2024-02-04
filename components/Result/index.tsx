import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import styles from './index.module.scss';
import { ConfigProvider, Button } from 'antd';



interface DataType {
    key: string;
    name: string;
    role: string;
    profile: string;
    company: string;
    CompanyDescription: string;
    location: string;
    email: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Full Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'LinkedIn Profile',
        dataIndex: 'profile',
        key: 'profile',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Company',
        key: 'company',
        dataIndex: 'company',
    },
    {
        title: 'Company Description',
        key: 'company description',
        dataIndex: 'CompanyDescription',
    },
    {
        title: 'Location',
        key: 'location',
        dataIndex: 'location',
    },
    {
        title: 'Custome Email',
        key: 'email',
        dataIndex: 'email',
        render: (text) => <div className={styles.emailColumn}>{text}</div>,
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record, index) => {
            return (
                <Button style={{ display: index === 0 ? 'block' : 'none' }}>
                    <a>Email to {record.name}</a>
                </Button>
            )
        },
    }
];

const data: DataType[] = [
    {
        key: '1',
        name: 'Omar',
        role: 'Building Founders inc',
        company: 'founders inc',
        CompanyDescription: 'Founders, Inc. focuses on enabling founders to build epic companies',
        profile: 'https://meet.google.com/',
        location: 'San Francisco Bay Area',
        email: `Hey Omar,
        I took a look at f.inc and your impressive journey from CMO at Fei Protocol to spearheading Founders, Inc. piqued my interest. If you're open to it, I'd love to connect over a quick call to learn more about your vision for Founders, Inc., and discuss how we might contribute to your next chapter.
        Best,`
    },
    {
        key: '2',
        name: 'Omar',
        role: 'Building Founders inc',
        company: 'founders inc',
        CompanyDescription: 'Founders, Inc. focuses on enabling founders to build epic companies',
        profile: '22222',
        location: 'San Francisco Bay Area',
        email: `Hey Omar,
        I took a look at f.inc and your impressive journey from CMO at Fei Protocol to spearheading Founders, Inc. piqued my interest. If you're open to it, I'd love to connect over a quick call to learn more about your vision for Founders, Inc., and discuss how we might contribute to your next chapter.
        Best,`
    },
    {
        key: '3',
        name: 'Omar',
        role: 'Building Founders inc',
        company: 'founders inc',
        CompanyDescription: 'Founders, Inc. focuses on enabling founders to build epic companies',
        profile: '22222',
        location: 'San Francisco Bay Area',
        email: `Hey Omar,
        I took a look at f.inc and your impressive journey from CMO at Fei Protocol to spearheading Founders, Inc. piqued my interest. If you're open to it, I'd love to connect over a quick call to learn more about your vision for Founders, Inc., and discuss how we might contribute to your next chapter.
        Best,`
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
                <Table className={styles.table} columns={columns} dataSource={data}
                >
                </Table>
                <div className={styles.overlay}>
                    <span className={styles.action}>subscribe</span> to continue
                </div>
            </ConfigProvider>
        </div>
    );
}
