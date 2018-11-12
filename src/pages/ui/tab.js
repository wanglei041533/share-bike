import React from 'react'
import { Card, Button, Tabs, message, Icon } from 'antd'
import './ui.less'

const TabPane = Tabs.TabPane

export default class TabsPage extends React.Component{
    newTabIndex = 0;
    constructor(){
        super();
        this.handleCallback = this.handleCallback.bind(this)
    }

    componentWillMount(){
        const panes = [
            {
                title:'Tab 1',
                content:'Tab1',
                key:'1'
            },
            {
                title:'Tab 2',
                content:'Tab2',
                key:'2'
            },
            {
                title:'Tab 3',
                content:'Tab3',
                key:'3'
            }
        ];
        this.setState({
            activeKey:panes[0].key,
            panes
        })
    }

    handleCallback(key){
        message.info('hi,您选择了页签:'+key)
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }

    render(){
        return(
            <div>
                <Card title="tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">content of tab pane 1</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>content of tab pane 2</TabPane>
                        <TabPane tab="Tab 3" key="3">content of tab pane 3</TabPane>
                    </Tabs>    
                </Card>
                <Card title="tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><Icon type="plus"/>Tab 1</span>} key="1">content of tab pane 1</TabPane>
                        <TabPane tab={<span><Icon type="edit"/>Tab 1</span>} key="2">content of tab pane 2</TabPane>
                        <TabPane tab={<span><Icon type="delete"/>Tab 1</span>} key="3">content of tab pane 3</TabPane>
                    </Tabs>    
                </Card>
                <Card title="tab带图的页签" className="card-wrap">
                    <Tabs
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        onEdit={this.onEdit}
                        type="editable-card"
                    >
                        {
                            this.state.panes.map((pane)=>{
                                return <TabPane 
                                    key={pane.key}
                                    tab={pane.title}
                                    >{pane.content}</TabPane>
                            })
                        }
                    </Tabs>    
                </Card>
            </div>
        )
    }
}