'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ChangeEvent, useState } from 'react';

import { Customer } from '@/interfaces/customer';
import { Role, User, UserStatusEnum } from '@/interfaces/user';

import UserAction from './UserAction';

interface Props {
  hasSystemPermission: boolean;
  users: User[];
  customers: Customer[];
  roles: Role[];
}

interface Row {
  id: string;
  fullName: string;
  username: string;
  role: string | undefined;
  status: UserStatusEnum;
  customer: string | undefined;
  note: string | undefined;
  user: User;
}

export default function UserTableBody({ hasSystemPermission, users, customers, roles }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const columns: Array<{ id: Exclude<keyof Row, 'user'>; label: string; minWidth: number }> = [
    { id: 'fullName', label: 'Name', minWidth: 170 },
    { id: 'username', label: 'Username', minWidth: 150 },
    { id: 'role', label: 'Role', minWidth: 150 },
    { id: 'status', label: 'Status', minWidth: 150 },
    { id: 'note', label: 'Note', minWidth: 150 },
  ];

  const rows: Row[] = users.map((user) => ({
    user,
    id: user.id,
    fullName: user.fullName,
    username: user.username,
    role: user.role?.name,
    status: user.status,
    customer: user.customer?.name,
    note: user.note,
  }));

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent) => {
    setRowsPerPage((event.target as unknown as { value: number }).value);
    setPage(0);
  };

  if (customers.length) columns.push({ id: 'customer', label: 'Customer', minWidth: 150 });
  if (!rows.length) return <p>No user data</p>;

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 50 }}>No.</TableCell>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ width: 100 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell align="right" style={{ width: 50 }}>
                    {index + 1}
                  </TableCell>
                  {columns.map((column) => {
                    const value = row[column.id];

                    return (
                      <TableCell className="truncate" key={column.id} style={{ maxWidth: 300 }}>
                        {value || '--'}
                      </TableCell>
                    );
                  })}
                  <TableCell style={{ width: 100 }}>
                    <UserAction
                      hasSystemPermission={hasSystemPermission}
                      user={row.user}
                      customers={customers}
                      roles={roles}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        rowsPerPageOptions={[10, 25, 100]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ alignSelf: 'end', overflow: 'visible' }}
      />
    </>
  );
}
