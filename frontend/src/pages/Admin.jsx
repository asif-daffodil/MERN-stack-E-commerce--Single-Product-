import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout, selectToken } from "../store/authSlice";

const Admin = () => {
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/v1.0.0/orders', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                if (err?.response?.status === 401) {
                    navigate('/signin?next=/admin', { replace: true });
                }
            });
    }, [token, navigate]);

    const csvFields = [
        { label: 'Order ID', key: '_id' },
        { label: 'Customer Name', key: 'name' },
        { label: 'Mobile', key: 'mobile' },
        { label: 'Order Note', key: 'orderNote' },
        { label: 'Area', key: 'area' },
        { label: 'Product Name', key: 'product_name' },
        { label: 'Product Price', key: 'product_price' },
        { label: 'Product Quantity', key: 'quantity' },
        { label: 'Total Product Price', key: 'total_product_price' },
        { label: 'Delivery Charge', key: 'delivery_charge' },
        { label: 'Total Price', key: 'total_price' },
        { label: 'Order Status', key: 'order_status' },
        { label: 'Order Date', key: 'createdAt' },
    ];

    const escapeCsvCell = (value) => {
        if (value === null || value === undefined) return '';

        const raw = value instanceof Date
            ? value.toISOString()
            : typeof value === 'object'
                ? JSON.stringify(value)
                : String(value);

        const needsQuotes = /[\n\r",]/.test(raw);
        const escaped = raw.replace(/"/g, '""');
        return needsQuotes ? `"${escaped}"` : escaped;
    };

    const downloadCsv = (rows) => {
        if (!rows || rows.length === 0) return;

        const header = csvFields.map(f => escapeCsvCell(f.label)).join(',');
        const body = rows
            .map(row => {
                return csvFields
                    .map(f => {
                        if (f.key === 'createdAt') {
                            const dt = row?.createdAt ? new Date(row.createdAt) : null;
                            return escapeCsvCell(dt ? dt.toLocaleString() : '');
                        }
                        return escapeCsvCell(row?.[f.key]);
                    })
                    .join(',');
            })
            .join('\n');

        // Add UTF-8 BOM so Excel opens Bengali/Unicode correctly.
        const csvContent = `\uFEFF${header}\n${body}`;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        const date = new Date().toISOString().slice(0, 10);
        a.download = `orders-${date}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const exportCsv = () => {
        // react-data-table-component hides `actions` when rows are selected,
        // so we keep the button outside and export selected rows if any.
        const rowsToExport = selectedRows?.length ? selectedRows : data;
        downloadCsv(rowsToExport);
    };

    const columns = [
        {
            name: 'Order ID',
            selector: row => <span className="font-semibold text-blue-600">{row._id}</span>,
        },
        {
            name: 'Customer Name',
            selector: row => <span className="font-medium text-gray-800">{row.name}</span>,
        },
        {
            name: 'Mobile',
            selector: row => <span className="text-gray-700">{row.mobile}</span>,
        },
        {
            name: 'Order Note',
            selector: row => <span className="text-gray-600 truncate">{row.orderNote}</span>,
        },
        {
            name: 'Area',
            selector: row => <span className="text-gray-700">{row.area}</span>,
        },
        {
            name: 'Product Name',
            selector: row => <span className="font-medium text-gray-800">{row.product_name}</span>,
            sortable: true,
        },
        {
            name: 'Product Price',
            selector: row => <span className="text-green-600 font-semibold">৳{row.product_price}</span>,
        },
        {
            name: 'Product Quantity',
            selector: row => <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">{row.quantity}</span>,
        },
        {
            name: 'Total Product Price',
            selector: row => <span className="text-green-600 font-semibold">৳{row.total_product_price}</span>,
        },
        {
            name: 'Delivery Charge',
            selector: row => <span className="text-orange-600 font-medium">৳{row.delivery_charge}</span>,
        },
        {
            name: 'Total Price',
            selector: row => <span className="text-lg font-bold text-green-700">৳{row.total_price}</span>,
        },
        {
            name: 'Order Status',
            selector: row => (
                <select className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                    <option value="Pending" selected={row.order_status === 'Pending'}>Pending</option>
                    <option value="Processing" selected={row.order_status === 'Processing'}>Processing</option>
                    <option value="Shipped" selected={row.order_status === 'Shipped'}>Shipped</option>
                    <option value="Delivered" selected={row.order_status === 'Delivered'}>Delivered</option>
                </select>
            ),
            sortable: true,
        },
        {
            name: 'Order Date',
            selector: row => <span className="text-gray-700">{new Date(row.createdAt).toLocaleDateString()}</span>,
            sortable: true,
        }
    ];

    const ExpandedComponent = ({ data }) => (
        <div style={{ padding: '10px', backgroundColor: '#f9f9f9' }}>
            <h4 className="font-bold">Order Details</h4>
            <p><strong>Customer Name:</strong> {data.name}</p>
            <p><strong>Mobile:</strong> {data.mobile}</p>
            <p><strong>Area:</strong> {data.area}</p>
            <p><strong>Order Note:</strong> {data.orderNote}</p>
            <p><strong>Product Name:</strong> {data.product_name}</p>
            <p><strong>Product Price:</strong> {data.product_price}</p>
            <p><strong>Quantity:</strong> {data.quantity}</p>
            <p><strong>Total Product Price:</strong> {data.total_product_price}</p>
            <p><strong>Delivery Charge:</strong> {data.delivery_charge}</p>
            <p><strong>Total Price:</strong> {data.total_price}</p>
            <p><strong>Order Status:</strong> {data.order_status}</p>
            <p><strong>Order Date:</strong> {new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
    );
    

    return (
        <div>
            <div className="flex items-center justify-end gap-2 mb-3">
                <button
                    type="button"
                    onClick={() => {
                        dispatch(logout());
                        navigate('/signin', { replace: true });
                    }}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
                >
                    Logout
                </button>
                <button
                    type="button"
                    onClick={exportCsv}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                    disabled={(!data || data.length === 0) && (!selectedRows || selectedRows.length === 0)}
                    title={
                        selectedRows?.length
                            ? `Export ${selectedRows.length} selected row(s) as CSV`
                            : 'Export orders as CSV'
                    }
                >
                    Export CSV
                </button>
            </div>
            <DataTable
                title="Order List"
                columns={columns}
                data={data}
                selectableRows
                onSelectedRowsChange={({ selectedRows }) => setSelectedRows(selectedRows)}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                pagination
                striped
                paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
        </div>
    );
};




export default Admin;