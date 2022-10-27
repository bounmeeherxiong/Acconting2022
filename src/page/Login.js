import React, { useEffect } from "react";

export default function Login({setLogin}) {
    useEffect(() => {       
        console.log('redirect to login page')
        //   window.location.assign('https://secure.phongsavanhgroup.com/');
          setLogin(false)
      });

    return (
        <div style={{
            textAlign: 'center',
            flex: 1, display: 'flex', paddingTop: 0,
            backgroundColor: '#f0f2f5', height: 800,
            flexDirection: 'column', alignItems: 'center',
            paddingTop: 100
        }}>
            {/* <div style={{ paddingBottom: 50 }}>
                <span style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', fontSize: 30, color: '#1877F2' }}>H Online Shop</span><br />
            </div>
            <div style={{
                padding: 20, backgroundColor: '#fff',
                width: 500, paddingBottom: 80,
                boxShadow: '0px 2px 5px 5px #E4E6E9',
                borderRadius: 10, paddingLeft: 90, paddingRight: 90
            }}>
                <span style={{ fontWeight: 'bold', fontSize: 20 }}>ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບ</span>


                <div style={{ height: 20 }} />
                <span style={{ fontWeight: 'bold' }}>ຊື່ຜູ້ໃຊ້</span>
                <input
                    style={{
                        width: '100%',
                        height: 45,
                        border: '1px solid #cccccc',
                        borderRadius: 5,
                        paddingLeft: 10, outline: 'none',
                        textAlign: 'center'
                    }}


                />
                <div style={{ height: 20 }} />
                <span style={{ fontWeight: 'bold' }}>ລະຫັດຜ່ານ</span>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <input
                        style={{
                            width: '100%',
                            height: 45,
                            border: '1px solid #cccccc',
                            borderTopLeftRadius: 5, borderBottomLeftRadius: 5,
                            paddingLeft: 10, outline: 'none',
                            textAlign: 'center', borderRight: 'none'
                        }}
                    />
                </div>
                <div style={{ height: 20 }} />

                <button style={{
                    width: '100%',
                    backgroundColor: '#ff4747', color: 'white',
                    fontFamily: 'Phetsarath OT'
                }}
                    
                >
                    ເຂົ້າສູ່ລະບົບ
                </button>
                <a href="https://secure.phongsavanhgroup.com" target="_blank" rel="noreferrer">
                    Google.com
                </a>
                <div style={{ height: 20 }} />
                <span style={{ color: 'red' }}></span>
            </div> */}
        </div>
    )

}