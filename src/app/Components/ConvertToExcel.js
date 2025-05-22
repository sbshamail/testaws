import React from 'react'
import * as XLSX from 'xlsx';
import { AiFillFileExcel } from "react-icons/ai";
const ConvertToExcel = ({data,filename}) => {
    function convertJsonToExcel() {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
        XLSX.writeFile(workbook, filename + '.xlsx');
    };
   
    return (
        <button onClick={convertJsonToExcel}>
            <AiFillFileExcel size={30} color='green'/>
        </button>
    );
};

export default ConvertToExcel