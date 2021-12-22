import { Tabs ,Table} from 'antd';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSearchParam } from 'react-use';
import { data } from './data';

const { TabPane } = Tabs;

const USER_COLUMNS = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city'
    }
  ];

const JOB_COLUMNS = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Job',
      dataIndex: 'job',
      key: 'job'
    }
  ];

export const TabsPage = () => {
    const history = useHistory();
    const {activeTab = 'users'} = useParams();//don't need useState to keep activeTab, fetch from URL instead.
    const searchingPage  = useSearchParam('page');
    const currentPage = useMemo(()=>(!isNaN(parseInt(searchingPage,10)) ? parseInt(searchingPage,10) : 1),[searchingPage])

    const onTabChange = useCallback((tabKey)=>{
        history.push(`/${tabKey}`)////don't need useState to update activeTab, set to URL instead.
    },[history])

    const pagination = useMemo(()=>({
        pageSize:4,
        current:currentPage,
        onChange(page){
            history.push(`/${activeTab}?page=${page}`)
        }
    }),[history,activeTab,currentPage])

    return (
        <Tabs activeKey={activeTab} onChange={onTabChange}>
          <TabPane tab="Users" key="users">
            <Table dataSource={data} columns={USER_COLUMNS} rowKey={record => record.id} pagination={pagination}/>;
          </TabPane>
          <TabPane tab="Jobs" key="jobs">
            <Table dataSource={data} columns={JOB_COLUMNS} rowKey={record => record.id} pagination={pagination}/>;
          </TabPane>
        </Tabs>
      )
};