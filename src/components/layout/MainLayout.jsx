import React from 'react'
import './mainlayout.css'
import SubMenu from '../sidebar/SubMenu';
import { SidebarData } from '../sidebar/SidebarData';
import BtnTop from '../btnTopbar/BtnTop';
import Search from '../inputSearch/Search';
import Background from './Background';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';

function MainLayout({
    children, 
    title, search,
    handleOnChange = () => { },
    overflow,
    prevPage = () => { },
    nextPage = () => { },
    handleClickListItem = () => { },
    btnAdd,
    firstIndex,
    currentPage,
    nbPage,
}) {
    return (
        <Background>
            <div className="layoutcontainer">
                {/* Sidebar */}
                <div className="layoutsidebar">
                    
                    <div style={{
                        textAlign: 'center',
                        fontSize: 20, fontWeight: 300,
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', marginTop: 20,
                        color: 'black', marginBottom:10,
                    }}>
                        <img src="logo.png" alt="logo" 
                        style={{ 
                            width: '60%', 
                            height: 200,
                        }} />
                    </div>
                    <div className='sidebarscroll'>
                        <div className='sidebarscroll-inner' style={{paddingInline:10}}>
                            {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                            })}
                        </div>
                    </div>
                </div>
                <div className="layoutTopbarContent">
                    {/* Top Bar */}
                    <div className="layouttopbar">
                        {search ? <div style={{
                            height: 40,
                            display: 'flex',
                            justifyContent:'flex-start'
                        }}>
                            <Search
                                onChange={handleOnChange}
                                name="search"
                            />
                        </div>:<div />}
                        <div>
                            <span style={{ fontSize: 30, fontWeight: 'bold', }}>{title}</span>
                        </div>
                        <BtnTop />
                    </div>
                    { overflow ?
                        <div style={{
                            height: 'calc(100% - 95px)',
                            background: '#ffffffa3',
                            borderRadius: 10,
                            paddingBlock: 10,
                            zIndex:1,
                        }}>
                            <div className="layoutcontent">
                                <div className="layoutcontent-inner">
                                    {children}
                                </div>
                            </div>
                        </div> :
                        <div className='contentlayoutinner' style={{
                            height: 'calc(100% - 75px)',
                            background: '#ffffffa3',
                            borderRadius: 10,
                            zIndex: 1,
                            position:'relative',
                        }}>
                            {firstIndex === 0 ? null : <div className='btnfloat' style={{
                                marginRight: 20,
                                zIndex: 1,
                                width:60,
                                height:60,
                                borderRadius:50,
                                background:'#ffffffa1',
                                cursor:'pointer',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                position: 'absolute',
                                left: 10,
                                top:'calc(50% - 30px)',
                            }} 
                            onClick={prevPage}
                            >
                                <MdOutlineKeyboardArrowLeft size={25} />
                            </div>}
                            {currentPage === nbPage ? null : nbPage === 0 ? null : currentPage ? <div className='btnfloat' style={{
                                marginLeft: 20,
                                zIndex: 1,
                                width:60,
                                height:60,
                                borderRadius:50,
                                background:'#ffffffa1',
                                cursor:'pointer',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                position: 'absolute',
                                right: 10,
                                top:'calc(50% - 30px)',
                            }}
                                onClick={nextPage}
                            >
                                <MdOutlineKeyboardArrowRight size={25} />
                            </div>:null}
                            
                            {children}
                            
                            {btnAdd && <div style={{
                                position: 'absolute', top: '82.5%', left: '92%',
                                display: 'flex', width:60, height:60, borderRadius:50,
                                fontSize: 18, justifyContent:'center', alignItems:'center',
                                background:'#00b2fe', color:'white', cursor:'pointer',
                                boxShadow:' 0 5px 10px #00000080',
                            }}
                                onClick={handleClickListItem}
                            >
                                <FaPlus />
                            </div > }
                        </div>
                    }
                </div>
            </div>
        </Background>
    )
}

export default MainLayout
