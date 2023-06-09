import {Header, Content} from 'antd/es/layout/layout'
import React, {useEffect, useState} from 'react'
import "./style.css"
import {Layout, Typography} from 'antd'
import axios from 'axios';

export interface DataArticel {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface Source {
    id: null;
    name: string;
}

type HomeProps = {}

function Home({} : HomeProps) {

    const [data, setdata] = useState<DataArticel[]>()
    const url = process.env.REACT_APP_PUBLIC_URL

    // console.log({url});
    
    
    useEffect(() => {
        axios
            .get(`${url}`)
            .then((res) => {
                setdata(res.data.articles)

            })
            .catch((err) => {
                console.log(err);
            })
        }, [])

    return (
        <div>
            <Header className='header'>
                <div className='header-inner'>
                    <Typography.Title
                        level={2}
                        style={{
                            margin: 0
                        }}>
                        Article
                    </Typography.Title>
                </div>
            </Header>
            <Layout className='layout'>
                <Content className='content-wrap'>
                    {data?.map((item, i)=>{
                        return (
                            <a href={item.url} key={i}>
                                <div className='content' >
                                    <div className='image'>
                                        <img src={item.urlToImage} className='image-content'/>
                                    </div>
                                    <div className='title-desc'>
                                        <Typography.Title level={4}>{item.title}</Typography.Title>
                                        <Typography.Text style={{color:"grey"}} >{item.publishedAt}</Typography.Text>
                                        <Typography.Paragraph className='paragraph' >{item.description}</Typography.Paragraph>
                                    </div>
                                </div>
                            </a>
                        )
                    })}
                </Content>
            </Layout>
        </div>
    )
}

export default Home