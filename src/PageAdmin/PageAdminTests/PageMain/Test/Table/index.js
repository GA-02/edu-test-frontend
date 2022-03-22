import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';

function enterSearch(event, setItems) {
    if (event.charCode == 13)
        setItems(event.target.value.toLowerCase());
}

function Table({ columns, data }) {
    const [filteredData, setFilteredData] = useState('');
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    )


    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <th colSpan="100%" style={{
                            textAlign: 'left',
                        }}>Поиск:
                            <input type="search" placeholder='Введите значение'
                                onKeyPress={(event) => { enterSearch(event, setFilteredData) }}
                                onInput={(event) => { if (event.target.value == '') setFilteredData('') }}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>

                    {rows.filter(item => {
                        let isMeetTheCondition = false;
                        Object.values(item.original).map(itemValue =>{
                            if (itemValue.toLowerCase().indexOf(filteredData) != -1)
                                isMeetTheCondition = true;
                        })
                        return isMeetTheCondition;
                    }).map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell, index) => {
                                        if (index === 0) {
                                            return (<td {...cell.getCellProps()}>{i + 1}</td>)
                                        }
                                        return (

                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            <br />
        </>
    )
}


export default Table