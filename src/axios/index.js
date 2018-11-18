import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd';
import Utils from '../utils/utils';

export default class Axios{
    static requestList(_this,url,params,isMock){
        var data = {
            params: params,
            isMock
        };
        this.ajax({
            url,
            data
        }).then((data)=>{
            if(data && data.result){
                let list = data.result.list.map((item, index) => {
                    item.key = index;
                    return item;
                });

                // res.result.page = this.params.page

                _this.setState({
                    list: list,
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList()
                    })
                })
            }
        });
    }

    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function(err,response){
                console.log(response)
                if(response.status === 'success'){
                    resolve(response);
                }else{
                    reject(response.message)
                }
            })
        })
    }

    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block'
        }
        let baseApi = '';
        if(options.data.isMock){
            baseApi = 'https://www.easy-mock.com/mock/5bec33519466046b368d2010/mockapi';
        }else{
            baseApi = 'https://www.easy-mock.com/mock/5bec33519466046b368d2010/mockapi';
        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL: baseApi,
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none'
                }
                if(response.status === 200){
                    let res = response.data;
                    if(res.code === 0){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:'提示',
                            content:res.message
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        });
    }
}