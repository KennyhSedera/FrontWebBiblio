import React, { useState } from 'react';
import './table.css';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import MainLayout from '../layout/MainLayout';

function DataTable({ 
    Data=[],
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 10;
    const lastIndex = currentPage * dataPerPage;
    const firstIndex = lastIndex - dataPerPage;
    // const data = Data.slice(firstIndex, lastIndex);
    const nbPage = Math.ceil(Data.length / dataPerPage);

    const dark = false;

    const prevPage = () => {
        if (currentPage !== firstIndex && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (currentPage !== lastIndex && currentPage < nbPage) {
            setCurrentPage(currentPage + 1);
        }
    }
    return (
        <MainLayout>
            <div className='datatable' style={{
                display: 'flex', flexDirection: 'column', fontSize: 14, color: dark ? 'white' : 'black',
                gap: 5, padding: 10, borderRadius: 20, marginTop: 5,
            }}>
                <table>
                <thead>
                    <tr>
                        <th> Id </th>
                        <th> Customer </th>
                        <th> Location </th>
                        <th> Order Date </th>
                        <th> Status </th>
                        <th> Amount </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> 1 </td>
                        <td> Zinzu Chan Lee</td>
                        <td> Seoul </td>
                        <td> 17 Dec, 2022 </td>
                        <td>
                            <p class="status delivered">Delivered</p>
                        </td>
                        <td> <strong> $128.90 </strong></td>
                    </tr>
                    <tr>
                        <td> 1 </td>
                        <td> Zinzu Chan Lee</td>
                        <td> Seoul </td>
                        <td> 17 Dec, 2022 </td>
                        <td>
                            <p class="status delivered">Delivered</p>
                        </td>
                        <td> <strong> $128.90 </strong></td>
                    </tr>
                    <tr>
                        <td> 1 </td>
                        <td> Zinzu Chan Lee</td>
                        <td> Seoul </td>
                        <td> 17 Dec, 2022 </td>
                        <td>
                            <p class="status delivered">Delivered</p>
                        </td>
                        <td> <strong> $128.90 </strong></td>
                    </tr>
                    <tr>
                        <td> 2 </td>
                        <td> Jeet Saru </td>
                        <td> Kathmandu </td>
                        <td> 27 Aug, 2023 </td>
                        <td>
                            <p class="status cancelled">Cancelled</p>
                        </td>
                        <td> <strong>$5350.50</strong> </td>
                    </tr>
                    <tr>
                        <td> 2 </td>
                        <td> Jeet Saru </td>
                        <td> Kathmandu </td>
                        <td> 27 Aug, 2023 </td>
                        <td>
                            <p class="status cancelled">Cancelled</p>
                        </td>
                        <td> <strong>$5350.50</strong> </td>
                    </tr>
                    <tr>
                        <td> 2 </td>
                        <td> Jeet Saru </td>
                        <td> Kathmandu </td>
                        <td> 27 Aug, 2023 </td>
                        <td>
                            <p class="status cancelled">Cancelled</p>
                        </td>
                        <td> <strong>$5350.50</strong> </td>
                    </tr>
                    <tr>
                        <td> 2 </td>
                        <td> Jeet Saru </td>
                        <td> Kathmandu </td>
                        <td> 27 Aug, 2023 </td>
                        <td>
                            <p class="status cancelled">Cancelled</p>
                        </td>
                        <td> <strong>$5350.50</strong> </td>
                    </tr>
                    <tr>
                        <td> 2 </td>
                        <td> Jeet Saru </td>
                        <td> Kathmandu </td>
                        <td> 27 Aug, 2023 </td>
                        <td>
                            <p class="status cancelled">Cancelled</p>
                        </td>
                        <td> <strong>$5350.50</strong> </td>
                    </tr>
                    <tr>
                        <td> 2 </td>
                        <td> Jeet Saru </td>
                        <td> Kathmandu </td>
                        <td> 27 Aug, 2023 </td>
                        <td>
                            <p class="status cancelled">Cancelled</p>
                        </td>
                        <td> <strong>$5350.50</strong> </td>
                    </tr>
                </tbody>
            </table>
                <div style={{
                    display: 'flex', flexDirection: 'row', padding: 5,
                    justifyContent: 'space-between', fontSize: 12, marginTop: 10, paddingInline: 20,
                }}>
                    <div></div>
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                        <span>Page {currentPage} sur {nbPage}</span>
                        <span style={{
                            color: currentPage === 1 ? 'grey' : dark ? 'white' : 'black', cursor: 'pointer', display: 'flex',
                            paddingBlock: 1, paddingRight: 15, borderRadius: 5, background: dark ? '#00000067' : '#ffffff67', alignItems: 'center',
                        }} onClick={prevPage}><MdArrowLeft size={25} /> Prev </span>
                        <span style={{
                            color: currentPage >= nbPage ? 'grey' : dark ? 'white' : 'black', cursor: 'pointer', display: 'flex',
                            paddingBlock: 1, paddingLeft: 15, borderRadius: 5, background: dark ? '#00000067' : '#ffffff67', alignItems: 'center',
                        }} onClick={nextPage}> Next <MdArrowRight size={25} /></span>
                    </div>
                </div >
            </div >
        </MainLayout>
    )
}

export default DataTable
