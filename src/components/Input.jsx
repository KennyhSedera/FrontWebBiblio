import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import '../index.css'

function Input({ Icon, bgcolor = '#ffffffe0', iconColor = 'black', error, onFocus = () => { }, password=false, ...props }) {
    const [showPassword, setShowPassword] = useState(true)
    return (
        <div style={{ marginBottom: 20, textAlign: 'left', position:'relative' }}>
            <div className='input' style={{
                display: 'flex', alignItems: 'center',
                gap: 5, background: bgcolor, boxShadow: '0 2px 2px #00000080',
                paddingInline: 10, height: 48, borderRadius: 5,
                borderColor: 'black',
                border: error ? '1px solid red' : '',                                                     
            }}>
                {Icon ? <Icon size={20} color={error ? 'red' : iconColor} /> : null}
                <input
                    onFocus={() => {
                        onFocus()
                    }}
                    type={password ? showPassword ? 'password' : 'text' : 'text'}
                    style={{
                        width: Icon ? password ? '80%' : '90%' : '100%', height: 30, border: 'none', outline: 'none',
                        fontSize: 14, background: 'transparent', paddingInline: 8, borderRadius: 3, color: error ? 'red' : iconColor,
                    }}
                    {...props}
                />
                {
                    password ?
                        showPassword ?
                            <FaEyeSlash size={20} color={error ? 'red' : iconColor} style={{ cursor: 'pointer' }} onClick={() => { setShowPassword(!showPassword) }} />
                            : <FaEye size={20} color={error ? 'red' : iconColor} style={{ cursor: 'pointer' }} onClick={() => { setShowPassword(!showPassword) }} />
                        : ''
                }
            </div>
            <span style={{ color: 'red', fontSize: 12, position:'absolute', marginLeft:5, bottom:-20 }}>{error}</span>
        </div>
    )
}

export default Input