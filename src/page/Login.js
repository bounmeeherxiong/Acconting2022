import React, { useEffect } from "react";

export default function Login({setLogin}) {
    useEffect(() => {       
          window.location.assign('https://secure.phongsavanhgroup.com/');
          setLogin(false)
      });

    // return (
    //     <div style={{
            
    //         flex: 1, display: 'flex', 
    //         paddingTop: 0,
    //         backgroundColor: '#f0f2f5', 
    //         height: 800,
    //         flexDirection: 'column', 
    //         alignItems: 'center',
    //         paddingTop: 100
    //     }}>
   
    //         <div style={{
    //             padding: 20, 
    //             backgroundColor: '#fff',
    //             width: 500, 
    //             paddingBottom: 80,
    //             boxShadow: '0px 2px 5px 5px #E4E6E9',
    //             borderRadius: 10,
    //             paddingLeft: 90, 
    //             paddingRight: 90
    //         }}>
    //             <span style={{ fontWeight: 'bold', fontSize: 30,marginLeft:130 }}>Sign in</span>
    //             <div style={{ height: 20 }} />
    //             <span style={{ fontWeight: 'bold' }} >UserName</span>
    //             <input
    //                 style={{
    //                     width: '100%',
    //                     height: 45,
    //                     border: '1px solid #cccccc',
    //                     borderRadius: 5,
    //                     paddingLeft: 10, outline: 'none',
                    
    //                 }}

    //             />
    //             <div style={{ height: 20 }} />
    //             <span style={{ fontWeight: 'bold' }}>Password</span>
    //             <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
    //                 <input
    //                     style={{
    //                         width: '100%',
    //                         height: 45,
    //                         border: '1px solid #cccccc',
    //                         borderRadius: 5,
    //                         paddingLeft: 10, outline: 'none',
                        
    //                     }}
    //                 />
    //             </div>
    //             <div style={{ height: 20 }} />

    //             <button style={{
    //                 width: '100%',
    //                 backgroundColor: '#1877F2', 
    //                 color: 'white',
    //                 fontFamily: 'Phetsarath OT',
    //                 borderRadius:5,
    //                 border:'none'
    //             }}
                    
    //             >
    //                 <small style={{fontWeight:'bold',fontSize:20}}> Sign in</small>
                   
    //             </button>
               
    //             <div style={{ height: 20 }} />
    //             <span style={{ color: 'red' }}></span>
    //         </div>
    //     </div>
    // )

}